using Business_Logic_Layer.DBO.Feedbacks;
using Business_Logic_Layer.DBO.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Clients
{
    public class ClientViewModel
    {
        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public ICollection<FeedbackViewModel>? Feedbacks { get; set; }
        public ICollection<OrdersInformationViewModel>? Orders { get; set; }
    }
}
