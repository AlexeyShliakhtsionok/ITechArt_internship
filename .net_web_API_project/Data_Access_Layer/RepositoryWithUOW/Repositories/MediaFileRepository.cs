using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class MediaFileRepository : GenericRepository<MediaFile>, IMediaFileRepository
    {
        public MediaFileRepository(SalonDBContext context) : base(context)
        {
        }
    }
}
