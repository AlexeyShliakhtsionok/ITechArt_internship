using Business_Logic_Layer.DBO.Orders;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IOrderServices
    {
        public IEnumerable<OrdersInformationViewModel> GetAllOrders();
        public OrderViewModel GetOrderById(int id);
        public void CreateOrder(OrderViewModel order);
        public void UpdateOrder(OrderViewModel order);
        public void UpdateOrderStatus(int id);
        public void ConfirmOrder(int id);
        public void DeleteOrder(int id);
        public List<DateTime> GetAvaliableServiceTimeOfEmployee(int id, DateTime chosenDate, int procedureId, double open, double close);
    }
}
