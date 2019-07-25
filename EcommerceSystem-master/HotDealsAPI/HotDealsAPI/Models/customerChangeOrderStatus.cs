using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models
{
    public class customerChangeOrderStatus
    {
        public string client_token { get; set; }
        
        public string order_id_pk { get; set; }
    }
}