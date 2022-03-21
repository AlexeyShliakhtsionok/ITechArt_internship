using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.DBO.Orders;

namespace Business_Logic_Layer.DBO.Employees
{
    public class EmployeeInformationViewModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Guid Password { get; set; }
        public DateTime HireDate { get; set; }
        public string Role { get; set; }
        public string Qualification { get; set; }
        public string ProcedureType { get; set; }
        public ICollection<MediafileViewModel>? MediaFiles { get; set; }
        public ICollection<OrdersInformationViewModel>? Orders { get; set; }
    }
}
