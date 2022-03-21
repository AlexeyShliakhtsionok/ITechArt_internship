using Business_Logic_Layer.DBO.Procedures;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProcedureController : ControllerBase
    {
        private readonly IProcedureServices _procesureServices;
        private readonly IMaterialServices _materialServices;
        private readonly IProcedureTypeServices _procedureTypeServices;

        public ProcedureController(IProcedureTypeServices procedureTypeServices, IProcedureServices procesureServices, IMaterialServices materialServices)
        {
            _procesureServices = procesureServices;
            _materialServices = materialServices;
            _procedureTypeServices = procedureTypeServices;
        }

        [HttpPost]
        [Route("DeleteServiceById")]
        public void DeleteProcedure(int id)
        {
            _procesureServices.DeleteProcedure(id);
        }

        [HttpPost, Route("CreateProcedure")]
        public void CreateProcedure([FromBody] ProcedureViewModel procedure)
        {
            _procesureServices.CreateProcedure(procedure);
        }

        [HttpGet]
        [Route("GetAllProcedures")]
        public ActionResult<IEnumerable<ProceduresInformationViewModel>> GetAllProcedures(int elementsPerPage, int pageNumber, string sortBy)
        {
            var allProcedures = _procesureServices.GetAllProcedures().ToList();
            var procedureTypesSelectList = _procedureTypeServices.GetProcedureTypesSelectList();
            var materialsSelectList = _materialServices.GetMaterialsSelectList();
            double pagesCount = (double)allProcedures.Count() / elementsPerPage;
            pagesCount = Math.Ceiling(pagesCount);

            List<ProceduresInformationViewModel>[] pagedProcedures = new List<ProceduresInformationViewModel>[(int)pagesCount];
            for (int j = 0; j < pagedProcedures.Length; j++)
            {
                pagedProcedures[j] = new List<ProceduresInformationViewModel>();
            }

            for (int i = 0; i < pagedProcedures.Length; i++)
            {
                for (int j = 0; j < allProcedures.Count(); j++)
                {
                    if (j != 0 && j % elementsPerPage == 0)
                    {
                        i++;
                    };
                    pagedProcedures[i].Add(allProcedures[j]);
                }
            }
            var procedures = pagedProcedures[pageNumber - 1];
            return Ok(new { procedures, procedureTypesSelectList, materialsSelectList, pagesCount, elementsPerPage, pageNumber });
        }

        [HttpGet]
        [Route("GetAllProceduresByType")]
        public ActionResult<IEnumerable<ProcedureViewModel>> GetAllProceduresByType(int id)
        {
            var procedures = _procesureServices.GetAllProceduresByType(id);
            return Ok(procedures);
        }

        [HttpGet]
        [Route("GetServiceById")]
        public ActionResult<ProcedureViewModel> GetServiceById(int id)
        {
            var procedure = _procesureServices.GetProcedureById( id);
            if (procedure == null)
            {
                return NotFound("InvalidId");
            }
            return Ok(procedure);
        }

        [HttpPost, Route("UpdateService")]
        public void UpdateService([FromBody] ProcedureViewModel service)
        {
            _procesureServices.UpdateProcedure(service);
        }
    }
}
