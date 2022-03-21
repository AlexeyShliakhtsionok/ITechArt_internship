using Business_Logic_Layer.DBO.Procedures;

namespace Business_Logic_Layer.DBO.Materials
{
    public class MaterialsInformationViewModel
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public double MaterialAmount { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime BestBeforeDate { get; set; }
        public string MaterialManufacturer { get; set; }
        public ICollection<ProcedureViewModel>? Procedures { get; set; }
    }
}
