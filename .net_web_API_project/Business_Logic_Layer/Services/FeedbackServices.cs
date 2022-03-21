using Business_Logic_Layer.DBO.Feedbacks;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;

namespace Business_Logic_Layer.Services
{
    public class FeedbackServices : IFeedbackServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public FeedbackServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateFeedback(FeedbackViewModel feedback)
        {
            Feedback feedbackEntity = AutoMappers<FeedbackViewModel, Feedback>.Map(feedback);
            feedbackEntity.Client = _UnitOfWork.Client.GetById(feedback.Client.ClientId);
             _UnitOfWork.Feedback.Add(feedbackEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteFeedback(int id)
        {
            var feedbackToDelete = _UnitOfWork.Feedback.GetById(id);
             _UnitOfWork.Feedback.Delete(feedbackToDelete);
            _UnitOfWork.Complete();
        }

        public IEnumerable<FeedbackInformationViewModel> GetAllFeedbacks()
        {
            var feedbacks = _UnitOfWork.Feedback.GetAll();
            IEnumerable<FeedbackInformationViewModel> feedbacksModel =
                AutoMappers<Feedback, FeedbackInformationViewModel>.MapIQueryable(feedbacks);
            return feedbacksModel;
        }

        public FeedbackViewModel GetFeedbackById(int id)
        {
            var feedback = _UnitOfWork.Feedback.GetById(id);
              
            FeedbackViewModel feedbackModel = AutoMappers<Feedback, FeedbackViewModel>.Map(feedback);
            return feedbackModel;
        }

        public void UpdateFeedbackAproveState(FeedbackInformationViewModel feedback)
        {
            var feedbackToApprove = _UnitOfWork.Feedback.GetById(feedback.FeedbackId);
            feedbackToApprove.IsVerify = true;
            _UnitOfWork.Feedback.Update(feedbackToApprove);
            _UnitOfWork.Complete();
        }
    }
}
