using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models
{
    public class upload_product
    {
        public string product_pk { get; set; }

        public string product_name { get; set; }

        public float product_price { get; set; }

        public float discount_percentage { get; set; }

        public int stock_quantity { get; set; }

        public string starting_date { get; set; }

        public string ending_date { get; set; }

        public string product_description { get; set; }

        public string lazada_url { get; set; }

        public string elevenstreet_url { get; set; }

        public string shopee_url { get; set; }
    }
}