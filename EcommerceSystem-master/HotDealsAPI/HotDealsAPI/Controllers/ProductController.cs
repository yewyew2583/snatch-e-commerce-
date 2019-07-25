using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using BO;
using Lib.Data.Database;

namespace HotDealsAPI.Controllers
{
    [RoutePrefix("product")]
    public class ProductController : ApiController
    {
        [Route("get-product")]
        [System.Web.Http.AcceptVerbs("GET","POST")]
        public BO.RequestResult getProduct()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_detail = DBHelper.GetDataTable(@"
                SELECT product_id_pk,product_name,stock_quantity,remaining_quantity,start_date AS starting_date,expiry_date AS expiring_date,NOW() AS cur_date,price,discount_percent,product_info,lazada_url,elevenstreet_url,shopee_url 
                FROM product
                WHERE (NOW() BETWEEN product.start_date AND product.expiry_date)
                AND remaining_quantity > 0
                ORDER BY product_id_pk DESC
                LIMIT 0,1;
            ");
            if (product_detail.Rows.Count > 0)
            {
                result.data = Lib.Conversion.ToJSONArray(product_detail);
                result.isSuccess = true;
            }
            else
            {
                result.isSuccess = false;
            }
            

            return result;
        }

        [Route("get-all-product-main-image")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getAllProductMainImage()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_main_image = DBHelper.GetDataTable(@"
                SELECT product_image.image_url FROM product,product_image
                WHERE product_image.product_id_fk = product.product_id_pk
                AND product.is_delete = b'0'
                AND product_image.is_main = b'1'
                ORDER BY product.product_id_pk DESC
                LIMIT 1,5;
            ");
            if (product_main_image != null)
            {
                if (product_main_image.Rows.Count > 0)
                {
                    result.data = Lib.Conversion.ToJSONArray(product_main_image);
                    result.isSuccess = true;
                } else
                {
                    result.isSuccess = false;
                }
                
            }
            
            return result;
        }

        [Route("admin-get-product")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult adminGetProduct()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_detail = DBHelper.GetDataTable(@"
                SELECT product_id_pk,product_name,stock_quantity,remaining_quantity,start_date AS starting_date,expiry_date AS expiring_date,price,discount_percent,is_delete
                FROM product
                ORDER BY product_id_pk DESC;
            ");

            result.data = Lib.Conversion.ToJSONArray(product_detail);

            return result;
        }

        [Route("get-product-name")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getProductName([FromBody] HotDealsAPI.Models.get_product_image model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_name = DBHelper.GetDataTable(@"
                SELECT product_name FROM product
                WHERE product_id_pk = @product_fk;
            ",
            new DBParameter("@product_fk", model.product_fk));

            result.data = Lib.Conversion.ToJSONArray(product_name);

            return result;
        }

        [Route("get-product-main-image")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getProductMainImage([FromBody] HotDealsAPI.Models.get_product_image model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_main_image = DBHelper.GetDataTable(@"
                SELECT product_image_pk,is_main,image_url FROM product_image
                WHERE product_id_fk = @product_fk
                AND is_main = b'1';
            ",
            new DBParameter("@product_fk", model.product_fk));

            result.data = Lib.Conversion.ToJSONArray(product_main_image);

            return result;
        }

        [Route("get-product-image")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getProductImage([FromBody] HotDealsAPI.Models.get_product_image model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_image = DBHelper.GetDataTable(@"
                SELECT product_image_pk,is_main,image_url FROM product_image
                WHERE product_id_fk = @product_fk;
            ",
            new DBParameter("@product_fk", model.product_fk));

            result.data = Lib.Conversion.ToJSONArray(product_image);

            return result;
        }

        [Route("get-product-amount")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getProductAmount()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable total_product = DBHelper.GetDataTable(@"
                SELECT COUNT(*) AS total_product FROM product;
            ");

            result.data = Lib.Conversion.ToJSONArray(total_product);

            return result;
        }

        [Route("get-product-purchase-form")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult getProductPurchaseForm()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable product_detail = DBHelper.GetDataTable(@"
                SELECT product_id_pk,product_name,price,discount_percent FROM product
                WHERE (NOW() BETWEEN product.start_date AND product.expiry_date)
                AND remaining_quantity > 0
                ORDER BY product_id_pk DESC
                LIMIT 0,1;
            ");

            result.data = Lib.Conversion.ToJSONArray(product_detail);

            return result;
        }

        [Route("upload-product")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult uploadProduct([FromBody] HotDealsAPI.Models.upload_product model)
        {
            BO.RequestResult result = new BO.RequestResult();
            
            DBHelper.ExecuteNonQuery(@"
            INSERT INTO product(product_id_pk, product_name, stock_quantity, remaining_quantity,start_date,expiry_date ,price,discount_percent,product_info,lazada_url,elevenstreet_url,shopee_url)
            VALUES(@product_pk, @product_name, @stock_quantity, @stock_quantity,DATE(@starting_date),DATE(@ending_date),@product_price,@discount_percentage,@product_description,@lazada_url,@elevenstreet_url,@shopee_url);
            ",
            new DBParameter("@product_pk", model.product_pk),
            new DBParameter("@product_name", model.product_name),
            new DBParameter("@product_price", model.product_price),
            new DBParameter("@discount_percentage", model.discount_percentage),
            new DBParameter("@stock_quantity", model.stock_quantity),
            new DBParameter("@starting_date", model.starting_date),
            new DBParameter("@ending_date", model.ending_date),
            new DBParameter("@product_description", model.product_description),
            new DBParameter("@lazada_url", model.lazada_url),
            new DBParameter("@elevenstreet_url", model.elevenstreet_url),
            new DBParameter("@shopee_url", model.shopee_url));

            return result;
        }

        [Route("upload-product-image")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult uploadProductImage([FromBody] HotDealsAPI.Models.upload_product_image model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DBHelper.ExecuteNonQuery(@"
            INSERT INTO product_image(is_main, product_id_fk, image_url)
            VALUES(b'1', @product_pk, @img_main_image);
            ",
            new DBParameter("@product_pk", model.product_pk),
            new DBParameter("@img_main_image", model.img_main_image));

            foreach(string s in model.img_sub_image)
            {
                DBHelper.ExecuteNonQuery(@"
                INSERT INTO product_image(is_main, product_id_fk, image_url)
                VALUES(b'0', @product_pk, @img_sub_image);
                ",
                new DBParameter("@product_pk", model.product_pk),
                new DBParameter("@img_sub_image", s));
            }

            return result;
        }

        [Route("deleteProduct")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult deleteProduct([FromBody] HotDealsAPI.Models.delete_product model)
        {
            BO.RequestResult result = new BO.RequestResult();
            
            int is_success;

            is_success = DBHelper.ExecuteNonQuery(@"
            UPDATE product
            SET is_delete = b'1'
            WHERE product_id_pk = @product_id_fk;
            ",
            new DBParameter("@product_id_fk", model.product_id_fk));

            if (is_success == 0)
            {
                result.isSuccess = false;
            }
            else
            {
                result.isSuccess = true;
            }

            return result;
        }
    }
}
