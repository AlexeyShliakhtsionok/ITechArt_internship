using Business_Logic_Layer.DBO.Materials;
using Business_Logic_Layer.DBO.ProcedureTypes;

namespace Business_Logic_Layer.DBO.Procedures
{
    public class ProcedureViewModel
    {
        public int ProcedureId { get; set; }
        public string ProcedureName { get; set; }
        public string ProcedureDescription { get; set; }
        public TimeSpan TimeAmount { get; set; }
        public float ProcedurePrice { get; set; }
        public int? ProcedureType { get; set; }
        public int[]? Materials { get; set; }
    }
}
