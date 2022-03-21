using Business_Logic_Layer.DBO.Mediafiles;
using Business_Logic_Layer.DBO.Procedures;

namespace Business_Logic_Layer.DBO.ProcedureTypes
{
    public class ProcedureTypeViewModel
    {
        public int ProcedureTypeId { get; set; }
        public string ProcedureTypeName { get; set; }
        public MediafileViewModel? MediaFile { get; set; }
        public ICollection<ProcedureViewModel>? Procedures { get; set; }
    }
}
