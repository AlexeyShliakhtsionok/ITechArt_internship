using System;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json.Serialization;
using System.Text;

namespace Data_Access_Layer.Entities
{
    public enum Role
    {
        [Description("Administrator")]
        Administrator = 0,
        [Description("Staff")]
        Staff = 1,
    }
}
