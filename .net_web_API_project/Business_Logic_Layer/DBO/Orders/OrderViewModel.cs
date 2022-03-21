using Business_Logic_Layer.DBO.Clients;
using Business_Logic_Layer.DBO.Employees;
using Business_Logic_Layer.DBO.Procedures;

namespace Business_Logic_Layer.DBO.Orders
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public DateTime DateOfService { get; set; }
        public bool IsCompleted { get; set; }
        public bool CreatedByClient { get; set; }
        public bool ProcessedByAdmimistrator { get; set; }
        public ClientViewModel Client { get; set; }
        public ProcedureViewModel Procedure { get; set; }
        public EmployeeViewModel Employee { get; set; }
    }
}
