using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotDealsAPI.Models
{
    public class upload_product_image
    {
        public string product_pk { get; set; }

        public string img_main_image { get; set; }

        public string[] img_sub_image { get; set; }
    }
}