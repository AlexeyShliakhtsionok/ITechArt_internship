using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class EmployeeRepository : GenericRepository<Employee>,  IEmployeeRepository
    {
        public EmployeeRepository(SalonDBContext context) : base(context)
        {
        }
    }
}

