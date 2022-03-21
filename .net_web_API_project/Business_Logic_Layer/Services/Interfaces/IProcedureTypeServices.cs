using Business_Logic_Layer.DBO.ProcedureTypes;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services.Interfaces
{
    public interface IProcedureTypeServices
    {
        public IEnumerable<ProcedureTypeViewModel> GetProcedureTypes();
        public ProcedureTypeViewModel GetProcedureTypeById(int id);
        public void CreateProcedureType(ProcedureTypeViewModel procedureType);
        public void UpdateProcedureType(ProcedureTypeViewModel procedureType);
        public void DeleteProcedureType(int id);
        public SelectList GetProcedureTypesSelectList();
    }
}
