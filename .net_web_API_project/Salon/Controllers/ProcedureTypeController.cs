using Business_Logic_Layer.DBO.ProcedureTypes;
using Business_Logic_Layer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProcedureTypeController : ControllerBase
    {
        private readonly IProcedureTypeServices _procedureTypeServices;

        public ProcedureTypeController(IProcedureTypeServices procedureTypeServices)
        {
            _procedureTypeServices = procedureTypeServices;
        }


        [HttpGet]
        [Route("GetProcedureTypeById")]
        public ActionResult GetProcedureTypeById(int id)
        {
            var procedureType = _procedureTypeServices.GetProcedureTypeById(id);
            return Ok(procedureType);
        }


        [HttpPost]
        [Route("DeleteProcedureTypeById")]
        public void DeleteProcedure(int id)
        {
            _procedureTypeServices.DeleteProcedureType(id);
        }

        [HttpPost]
        [Route("CreateProcedureType")]
        public void CreateProcedureType([FromBody]ProcedureTypeViewModel procedureType)
        {
            _procedureTypeServices.CreateProcedureType(procedureType);
        }

        [HttpGet]
        [Route("GetAllProcedureTypes")]
        public ActionResult<IEnumerable<ProcedureTypeViewModel>> GetAllProcedureTypes()
        {
            var procedures = _procedureTypeServices.GetProcedureTypes();
            return Ok(procedures);
        }

        [HttpPost, Route("UpdateProcedureType")]
        public void UpdateProcedureType(ProcedureTypeViewModel procedureType)
        {
            _procedureTypeServices.UpdateProcedureType(procedureType);
        }
    }
}

