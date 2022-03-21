using Business_Logic_Layer.DBO.Procedures;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Business_Logic_Layer.Services
{
    public class ProcedureServices : IProcedureServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public ProcedureServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateProcedure(ProcedureViewModel procedure)
        {
            Procedure procedureEntity = AutoMappers<ProcedureViewModel, Procedure>.Map(procedure);
            procedureEntity.ProcedureType = _UnitOfWork.ProcedureType.GetById(Convert.ToInt32(procedure.ProcedureType));
            List<Material> materials = new List<Material>();
            foreach (var item in procedure.Materials)
            {
                materials.Add(_UnitOfWork.Material.GetById(item));
            }
            procedureEntity.Materials = materials;
            _UnitOfWork.Procedure.Add(procedureEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteProcedure(int id)
        {
            var procedureToDelete = _UnitOfWork.Procedure.GetById(id);
            _UnitOfWork.Procedure.Delete(procedureToDelete);
            _UnitOfWork.Complete();
        }

        public ProcedureViewModel GetProcedureById(int id)
        {
            var procedure = _UnitOfWork.Procedure.GetById(id);

            ProcedureViewModel procedureModel = AutoMappers<Procedure, ProcedureViewModel>.Map(procedure);
            return procedureModel;
        }

        public IEnumerable<ProceduresInformationViewModel> GetAllProcedures()
        {
            var procedures = _UnitOfWork.Procedure.GetAll();

            IEnumerable<ProceduresInformationViewModel> procedureModels
                = AutoMappers<Procedure, ProceduresInformationViewModel>.MapIQueryable(procedures);
            return procedureModels;
        }

        public void UpdateProcedure(ProcedureViewModel procedure)
        {
          var procedureEntity = _UnitOfWork.Procedure.GetById(procedure.ProcedureId);

          procedureEntity.ProcedureType = _UnitOfWork.ProcedureType.GetById(Convert.ToInt32(procedure.ProcedureType));
          procedureEntity.ProcedureDescription = procedure.ProcedureDescription;
          procedureEntity.ProcedureName = procedure.ProcedureName;
          procedureEntity.ProcedurePrice = procedure.ProcedurePrice;
          procedureEntity.TimeAmount = procedure.TimeAmount;

          List<Material> newMaterials = new List<Material>();
            foreach (var itemToAdd in procedure.Materials)
            {
                newMaterials.Add(_UnitOfWork.Material.GetById(itemToAdd));
            }

            foreach (var selected in newMaterials)
            {
                if (!procedureEntity.Materials.Any(o => o.MaterialId == selected.MaterialId))
                {
                    procedureEntity.Materials.Add(selected);
                }
            }

            List<int> materialToRemove = new List<int>();
            foreach (var existed in procedureEntity.Materials)
            {
                if (!newMaterials.Any(o => o.MaterialId == existed.MaterialId))
                {
                    materialToRemove.Add(existed.MaterialId);
                }
            }

            for (int i = 0; materialToRemove != null && i < materialToRemove.Count; i++)
            {
                procedureEntity.Materials.Remove(_UnitOfWork.Material.GetById(materialToRemove[i]));
            }

            _UnitOfWork.Procedure.Update(procedureEntity);
            _UnitOfWork.Complete();
        }

        public IEnumerable<ProcedureViewModel> GetAllProceduresByType(int id)
        {
            var procedures = _UnitOfWork.Procedure.GetAll().Where(i => i.ProcedureType.ProcedureTypeId == id);
            IEnumerable<ProcedureViewModel> procedureModels = AutoMappers<Procedure, ProcedureViewModel>.MapIQueryable(procedures);
            return procedureModels;
        }

        public SelectList GetProceduresSelectList()
        {
            var procedures = _UnitOfWork.Procedure.GetAll();
            List<ProcedureViewModel> proceduresModel = AutoMappers<Procedure, ProcedureViewModel>.MapIQueryable(procedures).ToList();
            List<SelectListItem> items = new List<SelectListItem>(proceduresModel.Count);
            foreach (var item in proceduresModel)
            {
                items.Add(new SelectListItem
                {
                    Text = item.ProcedureName,
                    Value = item.ProcedureId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
