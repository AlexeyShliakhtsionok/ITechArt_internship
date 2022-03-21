namespace Business_Logic_Layer.DBO.Orders
{
    public class OrdersInformationViewModel
    {
        public int OrderId { get; set; }
        public DateTime DateOfService { get; set; }
        public bool IsCompleted { get; set; }
        public bool ProcessedByAdmimistrator { get; set; }
        public bool? CreatedByClient { get; set; }
        public string ClientFullName { get; set; }
        public int ProcedureId { get; set; }
        public string ProcedureName { get; set; }
        public double ProcedureCost { get; set; }
        public string EmployeeFullName { get; set; }
        public int EmployeeId { get; set; }
        public string ClientPhoneNumber { get; set; }
        public string ClientEmail { get; set; }
       
    }
}
