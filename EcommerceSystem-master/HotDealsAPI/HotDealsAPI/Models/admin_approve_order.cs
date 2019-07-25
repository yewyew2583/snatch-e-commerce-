using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models
{
    public class admin_approve_order
    {
        public string order_id_pk { get; set; }

        public string status { get; set; }

        public long order_amount { get; set; }

        public long product_id_fk { get; set; }
    }
}