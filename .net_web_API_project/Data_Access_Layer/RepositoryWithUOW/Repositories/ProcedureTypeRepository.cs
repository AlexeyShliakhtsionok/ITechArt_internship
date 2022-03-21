using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.RepositoryWithUOW.Repositories
{
    public class ProcedureTypeRepository : GenericRepository<ProcedureType>, IProcedureTypeRepository
    {
        public ProcedureTypeRepository(SalonDBContext context) : base(context)
        {
        }
    }
}
