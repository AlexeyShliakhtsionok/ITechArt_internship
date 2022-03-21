using Business_Logic_Layer.DBO.Feedbacks;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IFeedbackServices
    {
        /// <summary>
        /// Method to get collection of all <c>FeedbackInformationViewModel</c>
        /// </summary>
        /// <returns>Returns collection of <c>FeedbackInformationViewModel</c></returns>
        public IEnumerable<FeedbackInformationViewModel> GetAllFeedbacks();

        /// <summary>
        /// Method gets the <c>Feedback</c> object by its identifier
        /// </summary>
        /// <param name="id">Identifier of <c>Feedback</c> object.</param>
        /// <returns>Returns <c>FeedbackViewModel</c> object</returns>
        public FeedbackViewModel GetFeedbackById(int id);

        /// <summary>
        /// Create the <c>Feedback</c> object.
        /// </summary>
        /// <param name="feedback"><c>Feedback</c> object</param>
        public void CreateFeedback(FeedbackViewModel feedback);

        /// <summary>
        /// Updates <c>Feedback</c> object by setting the "aproved" flag.
        /// </summary>
        /// <param name="feedback"></param>
        public void UpdateFeedbackAproveState(FeedbackInformationViewModel feedback);

        /// <summary>
        /// Delete cretain <c>Feedback</c> object from database.
        /// </summary>
        /// <param name="id"></param>
        public void DeleteFeedback(int id);
    }
}
