using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Feedbacks
{
    public class FeedbackInformationViewModel
    {
        public int FeedbackId { get; set; }
        public string FeedbackTitle { get; set; }
        public string FeedbackText { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsVerify { get; set; }
        public string ClientFullName { get; set; }
        public string ClientPhoneNumber { get; set; }
        public string ClientEmail { get; set; }
    }
}
