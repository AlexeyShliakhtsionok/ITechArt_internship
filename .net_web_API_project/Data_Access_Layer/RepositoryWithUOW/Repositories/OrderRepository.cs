using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(SalonDBContext context) : base(context)
        {
        }
    }
}
