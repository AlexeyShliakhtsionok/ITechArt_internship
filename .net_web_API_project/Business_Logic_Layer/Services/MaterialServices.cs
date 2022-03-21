using Business_Logic_Layer.DBO.Materials;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services
{
    public class MaterialServices : IMaterialServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public MaterialServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateMaterial(MaterialViewModel material)
        {
            Material materialEntity = AutoMappers<MaterialViewModel, Material>.Map(material);
            materialEntity.MaterialManufacturer = _UnitOfWork.MaterialManufacturer
                .GetById(material.MaterialManufacturer);
           
            _UnitOfWork.Material.Add(materialEntity);
            _UnitOfWork.Complete();
        }

        public IEnumerable<MaterialsInformationViewModel> GetAllMaterials()
        {
            var materials = _UnitOfWork.Material.GetAll();
            IEnumerable<MaterialsInformationViewModel> materialModels =
                AutoMappers<Material, MaterialsInformationViewModel>.MapIQueryable(materials);
            return materialModels;
        }

        public void DeleteMaterial(int id)
        {
            var materialToDelete = _UnitOfWork.Material.GetById(id);
             _UnitOfWork.Material.Delete(materialToDelete);
            _UnitOfWork.Complete();
        }

        public MaterialViewModel GetMaterialById(int id)
        {
            var materialEntity = _UnitOfWork.Material.GetById(id);
              
            MaterialViewModel materialModel =
                AutoMappers<Material, MaterialViewModel>.Map(materialEntity);
            return materialModel;
        }

        public void UpdateMaterialAmount(int id, int amount)
        {
            var material = _UnitOfWork.Material.GetAll()
                .FirstOrDefault(n => n.MaterialId == id);
            material.MaterialAmount = material.MaterialAmount - amount;
            _UnitOfWork.Material.Update(material);
            _UnitOfWork.Complete();
        }

        public void UpdateMaterial(MaterialViewModel material)
        {
            Material materialEntity = AutoMappers<MaterialViewModel, Material>.Map(material);
            materialEntity.MaterialManufacturer = _UnitOfWork.MaterialManufacturer
                .GetById(material.MaterialManufacturer);
           
            _UnitOfWork.Material.Update(materialEntity);
            _UnitOfWork.Complete();
        }

        public SelectList GetMaterialsSelectList()
        {
            List<Material> list = _UnitOfWork.Material.GetAll().ToList();
            List<SelectListItem> items = new List<SelectListItem>(list.Count);
            foreach (var item in list)
            {
                items.Add(new SelectListItem
                {
                    Text = item.MaterialName,
                    Value = item.MaterialId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
