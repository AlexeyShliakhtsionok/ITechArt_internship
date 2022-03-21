using Business_Logic_Layer.DBO.Mediafiles;


namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IMediaFileServices
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<MediafileViewModel> GetMediaFiles();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        /// <returns></returns>
        public MediafileViewModel GetMediaFileById(int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediaFile"><c>Mediafile</c> object</param>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        /// <param name="type"><c>Mediafile</c> object type</param>
        public void AddMediaFile(MediafileViewModel mediaFile, int id, string type);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediaFile"><c>Mediafile</c> object</param>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        public void AddProfilePhoto(MediafileViewModel mediaFile, int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediaFile"><c>Mediafile</c> object</param>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        public void UpdateProfilePhoto(MediafileViewModel mediaFile, int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediaFile"><c>Mediafile</c> object</param>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        public void AddProcedureTypePhoto(MediafileViewModel mediaFile, int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediaFileModel"><c>Mediafile</c> object</param>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        public void UpdateProcedureTypePhoto(MediafileViewModel mediaFileModel, int id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"><c>Mediafile</c> object identifier</param>
        public void DeleteMediaFile(int id);
    }
}
