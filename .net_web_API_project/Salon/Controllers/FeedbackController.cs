using Business_Logic_Layer.DBO.Feedbacks;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackServices _feedbackServices;
        private readonly IClientServices _clientServices;

        public FeedbackController(IFeedbackServices feedbackServices, IClientServices clientServices)
        {
            _feedbackServices = feedbackServices;
            _clientServices = clientServices;
        }

        [HttpGet]
        [Route("GetFeedbackById")]
        public ActionResult<FeedbackViewModel> GetFeedbackById(int id)
        {
            var feedback = _feedbackServices.GetFeedbackById(id);
            return Ok(feedback);
        }

        [HttpGet]
        [Route("GetAllFeedbacks")]
        public ActionResult<IEnumerable<FeedbackInformationViewModel>> GetAllFeedbacks(int elementsPerPage, int pageNumber) {
            var allFeedbacks = _feedbackServices.GetAllFeedbacks().OrderByDescending(f => f.CreatedOn).ToList();
            double pagesCount = (double)allFeedbacks.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<FeedbackInformationViewModel>[] pagedOrders = new List<FeedbackInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedOrders.Length; j++)
            {
                pagedOrders[j] = new List<FeedbackInformationViewModel>();
            }

            for (int i = 0; i < pagedOrders.Length; i++)
            {
                for (int j = 0; j < allFeedbacks.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedOrders[i].Add(allFeedbacks[j]);
                }
            }
            var feedbacks = pagedOrders[pageNumber - 1];
            return Ok(new { feedbacks, pagesCount, elementsPerPage, pageNumber });
        }

        [HttpGet]
        [Route("GetAllApprovedFeedbacks")]
        public ActionResult<IEnumerable<FeedbackInformationViewModel>> GetAllApprovedFeedbacks(int elementsPerPage, int pageNumber)
        {
            var allFeedbacks = _feedbackServices.GetAllFeedbacks().Where(f => f.IsVerify == true).ToList();
            double pagesCount = (double)allFeedbacks.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);
            var clients = _clientServices.GetAllClients();

            List<FeedbackInformationViewModel>[] pagedOrders = new List<FeedbackInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedOrders.Length; j++)
            {
                pagedOrders[j] = new List<FeedbackInformationViewModel>();
            }

            for (int i = 0; i < pagedOrders.Length; i++)
            {
                for (int j = 0; j < allFeedbacks.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedOrders[i].Add(allFeedbacks[j]);
                }
            }
            var feedbacks = pagedOrders[pageNumber - 1];
            return Ok(new { feedbacks, clients, pagesCount, elementsPerPage, pageNumber });
        }

        [HttpPost, Route("CreateFeedback")]
        public void CreateFeedback(FeedbackViewModel feedback)
        {
            _feedbackServices.CreateFeedback(feedback);
        }

        [HttpPost, Route("UpdateFeedback")]
        public void UpdateFeedbackStatus([FromBody] FeedbackInformationViewModel feedback)
        {
            _feedbackServices.UpdateFeedbackAproveState(feedback);
        }

        [HttpPost, Route("DeleteFeedbackById")]
        public void DeleteFeedbackById(int id)
        {
            _feedbackServices.DeleteFeedback(id);
        }

        [HttpGet, Route("CheckUnwachedFeedbacks")]
        public ActionResult CheckUnwachedFeedbacks()
        {
            var allFeedbacks = _feedbackServices.GetAllFeedbacks();
            bool check = allFeedbacks.Any(v => v.IsVerify == false);
            
            return Ok(check);
        }
    }
}
