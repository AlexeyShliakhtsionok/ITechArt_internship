using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.DBO.Orders;

namespace Business_Logic_Layer.DBO.Employees
{
    public class EmployeesInformationViewModel
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public ICollection<MediafileViewModel>? MediaFiles { get; set; }
    }
}
