using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models.Security
{
    public class login_data
    {
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string member_id_fk { get; set; }
    }
}