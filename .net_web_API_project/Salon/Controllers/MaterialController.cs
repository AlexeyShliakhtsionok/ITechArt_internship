using Business_Logic_Layer.DBO.Materials;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialServices _materialServices;
        private readonly IMaterialManufacturerServices _materialManufacturerServices;
        public MaterialController(IMaterialServices materialServices, IMaterialManufacturerServices materialManufacturerServices)
        {
            _materialManufacturerServices = materialManufacturerServices;
            _materialServices = materialServices;
        }

        [HttpPost]
        [Route("CreateMaterial")]
        public void CreateMaterial([FromBody] MaterialViewModel materialInput)
        {
            _materialServices.CreateMaterial(materialInput);
        }

        [HttpPost]
        [Route("DeleteMaterialById")]
        public void DeleteMaterial(int id)
        {
            _materialServices.DeleteMaterial(id);
        }

        [HttpPost]
        [Route("UpdateMaterialAmount")]
        public void UpdateMaterialAmount([FromBody] string[][] materialsAmount)
        {

            for (int i = 0; i < materialsAmount.Length; i++)
            {
                _materialServices.UpdateMaterialAmount(Convert.ToInt32(materialsAmount[i][0]), Convert.ToInt32(materialsAmount[i][1]));
            }
        }



        [HttpPost]
        [Route("UpdateMaterial")]
        public void UpdateMaterial([FromBody] MaterialViewModel materialInput)
        {
            _materialServices.UpdateMaterial(materialInput);
        }

        [HttpGet]
        [Route("GetMaterialById")]
        public ActionResult<MaterialViewModel> GetMaterialById(int id)
        {
            var material = _materialServices.GetMaterialById(id);
            if (material == null)
            {
                return NotFound("InvalidId");
            }
            return Ok(material);
        }

        [HttpGet]
        [Route("GetAllMaterials")]
        public ActionResult<IEnumerable<MaterialsInformationViewModel>> GetMaterials(int elementsPerPage, int pageNumber, string sortBy)
        {
            var allMaterials = _materialServices.GetAllMaterials().OrderByDescending(d => d.ProductionDate).ToList();
            var materialManufacturersSelectList = _materialManufacturerServices.GetManufacturersSelectList();
            double pagesCount = (double)allMaterials.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<MaterialsInformationViewModel>[] pagedMaterials = new List<MaterialsInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedMaterials.Length; j++)
            {
                pagedMaterials[j] = new List<MaterialsInformationViewModel>();
            }

            for (int i = 0; i < pagedMaterials.Length; i++)
            {
                for (int j = 0; j < allMaterials.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedMaterials[i].Add(allMaterials[j]);
                }
            }
            var materials = pagedMaterials[pageNumber - 1];
            return Ok(new { materials, materialManufacturersSelectList,  pagesCount, elementsPerPage, pageNumber });
        }
    }
}
