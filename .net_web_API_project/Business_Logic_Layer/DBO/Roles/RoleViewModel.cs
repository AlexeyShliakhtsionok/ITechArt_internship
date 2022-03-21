using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.DBO.Roles
{
    public enum RoleViewModel
    {
        [Description("Administrator")]
        Administrator = 0,
        [Description("Staff")]
        Staff = 1,
    }
}
