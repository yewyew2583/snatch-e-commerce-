using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models.Security
{
    public class sign_up_data
    {
        public string full_name{ get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }
}