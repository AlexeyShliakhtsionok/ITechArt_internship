using Business_Logic_Layer.DBO.MaterialManufacturers;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Data_Access_Layer.Entities;
using Data_Access_Layer.RepositoryWithUOW;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Business_Logic_Layer.Services
{
    public class MaterialManufacturerServices : IMaterialManufacturerServices
    {
        private readonly IUnitOfWork _UnitOfWork;
        public MaterialManufacturerServices(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork;
        }

        public void CreateMaterialManufacturer(MaterialManufacturerViewModel materialManufacturer)
        {
            MaterialManufacturer materialManufacturerEntity = AutoMappers<MaterialManufacturerViewModel, MaterialManufacturer>
                .Map(materialManufacturer);
            _UnitOfWork.MaterialManufacturer.Add(materialManufacturerEntity);
            _UnitOfWork.Complete();
        }

        public void DeleteMaterialManufacturer(int id)
        {
            var materialManufacturerToDelete =  _UnitOfWork.MaterialManufacturer.GetById(id);
            _UnitOfWork.MaterialManufacturer.Delete(materialManufacturerToDelete);
            _UnitOfWork.Complete();
        }

        public IEnumerable<MaterialManufacturerViewModel> GetAllMaterialManufacturers()
        {
            var materialManufacturers = _UnitOfWork.MaterialManufacturer.GetAll();
            IEnumerable<MaterialManufacturerViewModel> materialManufacturersModel =
                AutoMappers<MaterialManufacturer, MaterialManufacturerViewModel>
                .MapIQueryable(materialManufacturers);
            return materialManufacturersModel;
        }

        public SelectList GetManufacturersSelectList()
        {
           List<MaterialManufacturer> list = _UnitOfWork.MaterialManufacturer.GetAll().ToList();
           List <SelectListItem> items = new List<SelectListItem>(list.Count);
            foreach (var item in list)
            {
                items.Add(new SelectListItem
                {   
                    Text =  item.ManufacturerName,
                    Value = item.ManufacturerId.ToString()
                });
            }
            return new SelectList(items, "Value", "Text");
        }
    }
}
