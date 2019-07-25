using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models.Security
{
    public class token_data
    {
        public string admin_token { get; set; }
        public string client_token { get; set; }
        public string client_email { get; set; }
        public string client_password { get; set; }
        public string client_current_password { get; set; }
    }
}