using Business_Logic_Layer.DBO.ProcedureTypes;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services
{
    public class ProcedureTypeServices : IProcedureTypeServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public ProcedureTypeServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateProcedureType(ProcedureTypeViewModel procedureTypeModel)
        {
            ProcedureType procedureTypeEntity = AutoMappers<ProcedureTypeViewModel, ProcedureType>.Map(procedureTypeModel);
            _UnitOfWork.ProcedureType.Add(procedureTypeEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteProcedureType(int id)
        {
            var procedureTypeToDelete = _UnitOfWork.ProcedureType.GetById(id);
            _UnitOfWork.ProcedureType.Delete(procedureTypeToDelete);
            _UnitOfWork.Complete();
        }

        public ProcedureTypeViewModel GetProcedureTypeById(int id)
        {
            var procedureType = _UnitOfWork.ProcedureType.GetById(id);
            ProcedureTypeViewModel procedureTypeModel = AutoMappers<ProcedureType, ProcedureTypeViewModel>.Map(procedureType);
            return procedureTypeModel;
        }

        public IEnumerable<ProcedureTypeViewModel> GetProcedureTypes()
        {
            var proceduresTypes = _UnitOfWork.ProcedureType.GetAll();

            IEnumerable<ProcedureTypeViewModel> procedureTypeModels =
                AutoMappers<ProcedureType, ProcedureTypeViewModel>.MapIQueryable(proceduresTypes);
            return procedureTypeModels;
        }

        public void UpdateProcedureType(ProcedureTypeViewModel procedureTypeModel)
        {
            var procedureTypeEntity = AutoMappers<ProcedureTypeViewModel, ProcedureType>.Map(procedureTypeModel);
            _UnitOfWork.ProcedureType.Update(procedureTypeEntity);
            _UnitOfWork.Complete();
        }

        public SelectList GetProcedureTypesSelectList()
        {
            var procedureTypes = _UnitOfWork.ProcedureType.GetAll();
            List<ProcedureTypeViewModel> procedureTypesModel = AutoMappers<ProcedureType, ProcedureTypeViewModel>.MapIQueryable(procedureTypes).ToList();

            List<SelectListItem> items = new List<SelectListItem>(procedureTypesModel.Count);
            foreach (var item in procedureTypesModel)
            {
                items.Add(new SelectListItem
                {
                    Text = item.ProcedureTypeName,
                    Value = item.ProcedureTypeId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
