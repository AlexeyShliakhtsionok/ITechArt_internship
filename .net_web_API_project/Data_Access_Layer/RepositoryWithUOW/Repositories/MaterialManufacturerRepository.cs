using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class MaterialManufacturerRepository : GenericRepository<MaterialManufacturer>, IMaterialManufacturerRepository
    {
        public MaterialManufacturerRepository(SalonDBContext context) : base(context)
        {
        }
    }
}
