using Business_Logic_Layer.DBO.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Employees
{
    public class EmployeesAuthenticationModel
    {
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public Guid Password { get; set; }
        public RoleViewModel Role { get; set; } 
    }
}
