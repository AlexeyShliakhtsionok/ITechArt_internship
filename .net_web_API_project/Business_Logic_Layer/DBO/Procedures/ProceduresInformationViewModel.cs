using Business_Logic_Layer.DBO.Materials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Procedures
{
    public class ProceduresInformationViewModel
    {
        public int ProcedureId { get; set; }
        public string ProcedureName { get; set; }
        public string ProcedureDescription { get; set; }
        public TimeSpan TimeAmount { get; set; }
        public float ProcedurePrice { get; set; }
        public string ProcedureType { get; set; }
    }
}
