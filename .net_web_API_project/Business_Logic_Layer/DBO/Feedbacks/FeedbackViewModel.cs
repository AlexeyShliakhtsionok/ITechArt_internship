using Business_Logic_Layer.DBO.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Feedbacks
{
    public class FeedbackViewModel
    {
        public int FeedbackId { get; set; }
        public string FeedbackTitle { get; set; }
        public string FeedbackText { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsVerify { get; set; }
        public ClientToFeedbackCreationViewModel? Client { get; set; }
    }
}
