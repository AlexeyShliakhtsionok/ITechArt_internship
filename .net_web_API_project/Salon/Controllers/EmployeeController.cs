using Business_Logic_Layer.DBO.Employees;
using Business_Logic_Layer.DBO.Qualifications;
using Business_Logic_Layer.DBO.Roles;
using Business_Logic_Layer.Services.Interfaces;
using Business_Logic_Layer.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Salon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _employeeServices;
        private readonly IProcedureTypeServices _procedureTypeServices;

        public EmployeeController(IEmployeeServices employeeServices, IProcedureTypeServices procedureTypeServices)
        {
            _employeeServices = employeeServices;
            _procedureTypeServices = procedureTypeServices;
        }

        [HttpPost]
        [Route("DeleteEmployeeById")]
        public void DeleteEmoloyee(int id)
        {
            _employeeServices.DeleteEmoloyee(id);
        }


        [HttpGet]
        [Route("GetEmployeeById")]
        public ActionResult<EmployeeInformationViewModel> GetEmployeeById(int id)
        {
            var employee = _employeeServices.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound("InvalidId");
            }
            return Ok(employee);
        }

        [HttpGet, Route("GetEmployeeViewModelById")]
        public ActionResult<EmployeeViewModel> GetEmployeeViewModelById(int id)
        {
            return Ok(_employeeServices.GetEmployeeViewModelById(id));
        }

        [HttpGet]
        [Route("GetAllEmployees")]
        public ActionResult<IEnumerable<EmployeeViewModel>> GetEmployees()
        {
           var employees = _employeeServices.GetAllEmployees();

            var roles = EnumExtensions.GetValues<RoleViewModel>();

            var qualification = EnumExtensions.GetValues<QualificationViewModel>();

            var procedureTypesSelectList = _procedureTypeServices.GetProcedureTypesSelectList();

            return Ok(new { employees, roles, qualification, procedureTypesSelectList });
        }
       
        [HttpPost]
        [Route("GetToken")]
        public IActionResult Token(string employeeEmail, string password)
        {
            var identity = GetIdentity(employeeEmail, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.AuthOptions.ISSUER,
                    audience: AuthOptions.AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var role = _employeeServices.GetEmployeeByEmail(employeeEmail).Role;

            var response = new
            {
                access_token = encodedJwt,
                employeeEmail = identity.Name,
                employeeRole = role,
                employeeId = _employeeServices.GetEmployeeByEmail(employeeEmail).EmployeeId
            };
            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            IEnumerable<EmployeesAuthenticationModel> employees = _employeeServices.GetEmployeesCredentials();

            var employee = employees.FirstOrDefault(e => e.Email == email && e.Password == PasswordProcessing.GetPasswordGuid(password));

            if (employee != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, employee.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, employee.Role.ToString())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }

        [HttpPost]
        [Route("CreateEmployee")]
        public void CreateEmployee([FromBody] EmployeeViewModel employeeInput)
        {
          _employeeServices.CreateEmoloyee(employeeInput);
        }

        [HttpPost]
        [Route("UpdateEmployee")]
        public void UpdateEmployee([FromBody] EmployeeInformationViewModel employeeInput)
        {
            _employeeServices.UpdateEmoloyee(employeeInput);
        }

        [HttpGet]
        [Route("GetAllByProcedureType")]
        public ActionResult<IEnumerable<EmployeeViewModel>> GetAllByProcedureType(int id)
        {
            var employees = _employeeServices.GetAllEmployeesByProcedureType(id);
            return Ok(employees);
        }
    }
}
