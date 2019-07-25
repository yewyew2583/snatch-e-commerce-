using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models
{
    public class admin_change_order_status
    {
        public string order_id_pk { get; set; }

        public string status { get; set; }
    }
}