using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Text.Json.Serialization;

namespace Data_Access_Layer.Entities
{
    public enum Qualification
    {
        [Description("First class")]
        FirstClass = 0,
        [Description("SecondClass")]
        SecondClass = 1,
        [Description("ThirdClass")]
        ThirdClass = 2,
    }
}
