using Business_Logic_Layer.DBO.MaterialManufacturers;
using Business_Logic_Layer.DBO.Procedures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Materials
{
    public class MaterialViewModel
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public double MaterialAmount { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime BestBeforeDate { get; set; }

        public int MaterialManufacturer { get; set; }
        public int[]? Procedures { get; set; }
    }
}
