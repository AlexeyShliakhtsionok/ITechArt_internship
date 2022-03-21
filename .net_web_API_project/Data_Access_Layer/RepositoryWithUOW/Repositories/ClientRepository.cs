using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class ClientRepository : GenericRepository<Client>, IClientRepository
    {
        public ClientRepository(SalonDBContext context) : base(context)
        {}
    }
}

