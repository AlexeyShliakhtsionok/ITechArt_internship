using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Qualifications
{
    public enum QualificationViewModel
    {
        [Description("First class")]
        FirstClass = 0,
        [Description("SecondClass")]
        SecondClass = 1,
        [Description("ThirdClass")]
        ThirdClass = 2,
    }
}
