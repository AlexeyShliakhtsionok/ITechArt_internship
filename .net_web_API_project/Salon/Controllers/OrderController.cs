using Business_Logic_Layer.DBO.Clients;
using Business_Logic_Layer.DBO.Orders;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices _orderServices;
        private readonly IClientServices _clientServices;
        private readonly IProcedureTypeServices _procedureTypeServices;
        private readonly IMaterialServices _materialServices;

        public OrderController(IOrderServices orderServices, IClientServices clientServices,
            IProcedureTypeServices procedureTypeServices, IMaterialServices materialServices)
        {
            _orderServices = orderServices;
            _clientServices = clientServices;
            _procedureTypeServices = procedureTypeServices;
            _materialServices = materialServices;
        }

        [HttpPost]
        [Route("DeleteOrderById")]
        public void DeleteOrder(int id)
        {
            _orderServices.DeleteOrder(id);
        }

        [HttpGet]
        [Route("GetOrderById")]
        public ActionResult<OrderViewModel> GetOrderById(int id)
        {
            var order = _orderServices.GetOrderById(id);
            if (order == null)
            {
                return NotFound("InvalidId");
            }
            return Ok(order);
        }

        [HttpPost, Route("UpdateOrder")]
        public void UpdateOrder([FromBody]OrderViewModel order)
        {
            _orderServices.UpdateOrder(order);
        }

        [HttpPost, Route("UpdateOrderStatus")]
        public void UpdateOrderStatus([FromBody] int orderId)
        {
            _orderServices.UpdateOrderStatus(orderId);
        }

        [HttpPost, Route("ConfirmOrder")]
        public void ConfirmOrder([FromBody] int orderId)
        {
            _orderServices.ConfirmOrder(orderId);
        }



        [HttpPost, Route("CreateOrder")]
        public void CreateOrder([FromBody]OrderViewModel order)
        {
            _orderServices.CreateOrder(order);
        }

        [HttpGet, Route("GetScheduleOfEmployee")]
        public ActionResult GetSchedule(int id, DateTime chosenDate, int procedureId, double open, double close)
        {
            var avaliableSchedule = _orderServices
                .GetAvaliableServiceTimeOfEmployee( id, chosenDate, procedureId, open,  close); 
            return Ok( avaliableSchedule);
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public ActionResult<IEnumerable<OrdersInformationViewModel>> GetPagedOrders(int elementsPerPage, int pageNumber, string sortBy)
        {
            var allOrders = _orderServices.GetAllOrders().Where(d => d.DateOfService > DateTime.Now).OrderByDescending(d => d.DateOfService).ToList();
            var clientsSelectList = _clientServices.GetClientsSelectList();
            var procedureTypesSelectList = _procedureTypeServices.GetProcedureTypesSelectList();
            double pagesCount = (double)allOrders.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<OrdersInformationViewModel>[] pagedOrders = new List<OrdersInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedOrders.Length; j++)
            {
                pagedOrders[j] = new List<OrdersInformationViewModel>();
            }

            for (int i = 0; i < pagedOrders.Length; i++)
            {
                for (int j = 0; j < allOrders.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedOrders[i].Add(allOrders[j]);
                }
            }

            if(pagedOrders.Length == 0)
            {
                return Ok(new { pagedOrders, clientsSelectList, procedureTypesSelectList, pagesCount, elementsPerPage, pageNumber });
            }
            else
            {
                var orders = pagedOrders[pageNumber - 1];
                return Ok(new { orders, clientsSelectList, procedureTypesSelectList, pagesCount, elementsPerPage, pageNumber });
            }
        }

        [HttpGet]
        [Route("GetAllStagedOrders")]
        public ActionResult<IEnumerable<OrdersInformationViewModel>> GetStagedPagedOrders(int elementsPerPage, int pageNumber, string sortBy)
        {
            var materials = _materialServices.GetAllMaterials();
            var allOrders = _orderServices.GetAllOrders().Where(c => c.IsCompleted == false).Where(d => d.DateOfService < DateTime.Now).Where(p => p.ProcessedByAdmimistrator == false).OrderByDescending(d => d.DateOfService).ToList();
            double pagesCount = (double)allOrders.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<OrdersInformationViewModel>[] pagedOrders = new List<OrdersInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedOrders.Length; j++)
            {
                pagedOrders[j] = new List<OrdersInformationViewModel>();
            }

            for (int i = 0; i < pagedOrders.Length; i++)
            {
                for (int j = 0; j < allOrders.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedOrders[i].Add(allOrders[j]);
                }
            }

            if (pagedOrders.Length == 0)
            {
                var orders = pagedOrders;
                return Ok(new { orders, pagesCount, elementsPerPage, pageNumber });
            }
            else
            {
                var orders = pagedOrders[pageNumber - 1];
                return Ok(new { orders, materials, pagesCount, elementsPerPage, pageNumber });
            }
            
        }

        [HttpGet]
        [Route("GetAllDonedOrders")]
        public ActionResult<IEnumerable<OrdersInformationViewModel>> GetDonedPagedOrders(int elementsPerPage, int pageNumber, string sortBy)
        {
            var materials = _materialServices.GetAllMaterials();
            var allOrders = _orderServices.GetAllOrders().Where(c => c.IsCompleted == true).OrderByDescending(d => d.DateOfService).ToList();
            double pagesCount = (double)allOrders.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<OrdersInformationViewModel>[] pagedOrders = new List<OrdersInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedOrders.Length; j++)
            {
                pagedOrders[j] = new List<OrdersInformationViewModel>();
            }

            for (int i = 0; i < pagedOrders.Length; i++)
            {
                for (int j = 0; j < allOrders.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedOrders[i].Add(allOrders[j]);
                }
            }

            if (pagedOrders.Length == 0)
            {
                var orders = pagedOrders;
                return Ok(new { orders, pagesCount, elementsPerPage, pageNumber });
            }
            else
            {
                var orders = pagedOrders[pageNumber - 1];
                return Ok(new { orders, pagesCount, elementsPerPage, pageNumber });
            }
        }

        [HttpGet, Route("CheckUnprocessedOrders")]
        public ActionResult CheckUnwachedFeedbacks()
        {
            var allOrders = _orderServices.GetAllOrders().Where(d => d.DateOfService > DateTime.Now);
            bool check = allOrders.Any(v => v.ProcessedByAdmimistrator == false);

            return Ok(check);
        }


    }
}
