using Business_Logic_Layer.DBO.Materials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.MaterialManufacturers
{
    public class MaterialManufacturerViewModel
    {
        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }
        public string MadeIn { get; set; }
        //public ICollection<MaterialViewModel>? Materials { get; set; }
    }
}
