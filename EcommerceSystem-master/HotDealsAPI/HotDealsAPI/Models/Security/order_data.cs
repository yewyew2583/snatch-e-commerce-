using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models.Security
{
    public class order_data
    {
        public double total_payment { get; set; }
        public int order_amount { get; set; }
        public string product_id_pk { get; set; }
        public string mailing_phone_no { get; set; }
        public string mailing_address { get; set; }
        public string client_token { get; set; }
        public string get_product_image { get; set; }
        public string get_product_name { get; set; }
        public string mailing_recipient { get; set; }
    }
}