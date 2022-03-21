using Business_Logic_Layer.DBO.Procedures;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IProcedureServices
    {
        public IEnumerable<ProceduresInformationViewModel> GetAllProcedures();
        public ProcedureViewModel GetProcedureById(int id);
        public void CreateProcedure(ProcedureViewModel procedure);
        public void UpdateProcedure(ProcedureViewModel procedure);
        public void DeleteProcedure(int id);
        public IEnumerable<ProcedureViewModel> GetAllProceduresByType(int id);
        public SelectList GetProceduresSelectList();
    }
}
