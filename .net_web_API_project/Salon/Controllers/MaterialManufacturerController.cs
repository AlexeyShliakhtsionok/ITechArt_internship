using Business_Logic_Layer.DBO.MaterialManufacturers;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MaterialManufacturerController : ControllerBase
    {
        private readonly IMaterialManufacturerServices _materialManufacturerServices;

        public MaterialManufacturerController(IMaterialManufacturerServices materialManufacturerServices)
        {
            _materialManufacturerServices = materialManufacturerServices;
        }

        [HttpPost]
        [Route("DeleteManufacturerById")]
        public void DeleteManufacturer(int id)
        {
            _materialManufacturerServices.DeleteMaterialManufacturer(id);
        }

        [HttpPost]
        [Route("CreateMaterialManufacturer")]
        public void CreateMaterialManufacturer(MaterialManufacturerViewModel manufacturer)
        {
            _materialManufacturerServices.CreateMaterialManufacturer(manufacturer);
        }

        [HttpGet]
        [Route("GetAllManufacturers")]
        public ActionResult<IEnumerable<MaterialManufacturerViewModel>> GetAllManufacturers()
        {
            var manufacrurers = _materialManufacturerServices.GetAllMaterialManufacturers();
            return Ok(manufacrurers);
        }
    }
}
