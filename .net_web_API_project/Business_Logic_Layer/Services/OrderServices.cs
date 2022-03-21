using Business_Logic_Layer.DBO.Orders;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;

namespace Business_Logic_Layer.Services
{
    public class OrderServices : IOrderServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public OrderServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateOrder(OrderViewModel order) //!!!!!!!!!!!!!!!!!!!IsChecked by Administrator
        {
            Order orderEntity = AutoMappers<OrderViewModel, Order>.Map(order);
            orderEntity.Client = _UnitOfWork.Client.GetById(order.Client.ClientId);
            orderEntity.Procedure = _UnitOfWork.Procedure.GetById(order.Procedure.ProcedureId);
            orderEntity.Employee = _UnitOfWork.Employee.GetById(order.Employee.EmployeeId);
             _UnitOfWork.Order.Add(orderEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteOrder(int id)
        {
            var orderToDelete = _UnitOfWork.Order.GetById(id);
            var employee = _UnitOfWork.Employee.GetAll().FirstOrDefault(o => o.Orders.Contains(orderToDelete));
            employee.Orders.Remove(orderToDelete);
            var client = _UnitOfWork.Client.GetAll().FirstOrDefault(o => o.Orders.Contains(orderToDelete));
            client.Orders.Remove(orderToDelete);
             _UnitOfWork.Order.Delete(orderToDelete);
            _UnitOfWork.Complete();
        }

        public IEnumerable<OrdersInformationViewModel> GetAllOrders()
        {
            var orders = _UnitOfWork.Order.GetAll();

            IEnumerable<OrdersInformationViewModel> orderModels =
                AutoMappers<Order, OrdersInformationViewModel>.MapIQueryable(orders);
            return orderModels;
        }

        public OrderViewModel GetOrderById(int id)
        {
            var orderEntity = _UnitOfWork.Order.GetById(id);
            OrderViewModel orderModel = AutoMappers<Order, OrderViewModel>.Map(orderEntity);
            return orderModel;
        }

        public void UpdateOrder(OrderViewModel order)
        {
            Order orderEntity = AutoMappers<OrderViewModel, Order>.Map(order);
            orderEntity.Client = _UnitOfWork.Client.GetById(order.Client.ClientId);
            orderEntity.Procedure = _UnitOfWork.Procedure.GetById(order.Procedure.ProcedureId);
            orderEntity.Employee = _UnitOfWork.Employee.GetById(order.Employee.EmployeeId);
            _UnitOfWork.Order.Update(orderEntity);
            _UnitOfWork.Complete();
        }

        public List<DateTime> GetAvaliableServiceTimeOfEmployee(int id, DateTime chosenDate, int procedureId, double open, double close)
        {
            List<DateTime> dailySchedule = new List<DateTime>();
            List<DateTime> resultSchedule = new List<DateTime>();

            List<Order>orders = _UnitOfWork.Order.GetAll().Where(o => o.Employee.EmployeeId == id).ToList();

            var openTime = chosenDate.AddHours(open);
            var closeTime = chosenDate.AddHours(close);
            var currentTime = openTime;
            dailySchedule.Add(openTime);

            do{
                dailySchedule.Add(currentTime.AddMinutes(30));
                currentTime = currentTime.AddMinutes(30);
            } while (currentTime.AddMinutes(30) <= closeTime);

            if (orders != null)
            {
                for (int i = dailySchedule.Count-1; i >= 0; i--)
                { 
                    for (int j = 0; j < orders.Count; j++)
                    {
                        if (dailySchedule[i] >= orders[j].DateOfService &&
                            dailySchedule[i] < orders[j].DateOfService.AddMinutes(orders[j].Procedure.TimeAmount.TotalMinutes))
                        {
                             dailySchedule.Remove(dailySchedule[i]);
                        }
                    }
                }

                var bookingProcedure = _UnitOfWork.Procedure.GetById(procedureId);
                var bookingProcedureTimeAmount = bookingProcedure.TimeAmount.TotalMinutes;
                var coefficient = Math.Ceiling(bookingProcedureTimeAmount / 30);
                
                for (int i = 0; i < dailySchedule.Count; i++)
                {
                    if ((i + (int)coefficient <= dailySchedule.Count - 1)
                        && (dailySchedule[i].AddMinutes(bookingProcedureTimeAmount) > dailySchedule[i + (int)coefficient -1]))
                    {
                        resultSchedule.Add(dailySchedule[i]);
                    }
                }
            }
            return resultSchedule;
        }

        public void ConfirmOrder(int id)
        {
            var order = _UnitOfWork.Order.GetById(id);
            order.ProcessedByAdmimistrator = true;
            _UnitOfWork.Order.Update(order);
            _UnitOfWork.Complete();
        }


        public void UpdateOrderStatus(int id)
        {
            var order = _UnitOfWork.Order.GetById(id);
            order.IsCompleted = true;
            _UnitOfWork.Order.Update(order);
            _UnitOfWork.Complete();
        }
    }
}

