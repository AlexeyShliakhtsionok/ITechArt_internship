using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.DBO.Orders;
using Business_Logic_Layer.DBO.ProcedureTypes;
using Business_Logic_Layer.DBO.Qualifications;
using Business_Logic_Layer.DBO.Roles;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Employees
{
    public class EmployeeViewModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime HireDate { get; set; }
        public int Role { get; set; }
        public int ProcedureTypeId { get; set; }
        public QualificationViewModel Qualification { get; set; }
        public ProcedureTypeViewModel? ProcedureType { get; set; }
        public ICollection<MediafileViewModel>? MediaFiles { get; set; }
        public ICollection<OrdersInformationViewModel>? Orders { get; set; }
    }
}
