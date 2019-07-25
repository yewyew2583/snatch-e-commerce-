using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;

using BO;
using Lib.Data.Database;

namespace HotDealsAPI.Controllers
{
    [RoutePrefix("order")]
    public class OrderController : ApiController
    {
        [Route("place-order")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult placeOrder([FromBody] HotDealsAPI.Models.Security.order_data model)
        {
            BO.RequestResult result = new BO.RequestResult();
            
                DataRow verifyToken = DBHelper.GetDataRow(@"
                SELECT member_id_fk FROM login_token
                WHERE token = @token;
                ",
                new DBParameter("@token", model.client_token));

                if (verifyToken != null) {
                    int member_pk = Convert.ToInt32(verifyToken["member_id_fk"].ToString());

                    int is_success = DBHelper.ExecuteNonQuery(@"
                    INSERT INTO order_record(product_id_fk,product_name,image_url,order_amount,payment_method,member_id_fk,mailing_recipient,mailing_address,total_payment,order_date,order_status,mailing_phone_no)
                    VALUES(@product_id_pk,@get_product_name,@get_product_image, @order_amount,'Bank In',@member_pk,@mailing_recipient,@mailing_address,@total_payment,NOW(),'Pending',@mailing_phone_no);
                    ",
                    new DBParameter("@member_pk", member_pk),
                    new DBParameter("@product_id_pk", model.product_id_pk),
                    new DBParameter("@mailing_address", model.mailing_address),
                    new DBParameter("@mailing_phone_no", model.mailing_phone_no),
                    new DBParameter("@order_amount", model.order_amount),
                    new DBParameter("@get_product_image", model.get_product_image),
                    new DBParameter("@get_product_name", model.get_product_name),
                    new DBParameter("@mailing_recipient", model.mailing_recipient),
                    new DBParameter("@total_payment", model.total_payment));

                    if (is_success == 0)
                    {
                        result.isSuccess = false;
                    }
                    else
                    {
                        result.isSuccess = true;
                    }
                }

            return result;
        }

        [Route("customer-display-order")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult customerDisplayOrder([FromBody] HotDealsAPI.Models.customer_display_order model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataRow verifyToken = DBHelper.GetDataRow(@"
            SELECT member_id_fk FROM login_token
            WHERE token = @token;
            ",
            new DBParameter("@token", model.client_token));
            
            if (verifyToken != null)
            {
                string member_pk = verifyToken["member_id_fk"].ToString();

                DataTable order_detail = DBHelper.GetDataTable(@"
                SELECT order_id_pk, product_id_fk,product_name,image_url, order_amount, order_status, payment_method, total_payment,is_cancel,order_date FROM order_record
                WHERE member_id_fk = @member_id_fk
                ORDER BY order_date DESC;
            ",
            new DBParameter("@member_id_fk", member_pk));

            result.data = Lib.Conversion.ToJSONArray(order_detail);
            }
            
            return result;
        }

        [Route("customerCashOnDelivery")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult customerCashOnDelivery([FromBody] HotDealsAPI.Models.customerChangeOrderStatus model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataRow verifyToken = DBHelper.GetDataRow(@"
            SELECT member_id_fk FROM login_token
            WHERE token = @token;
            ",
            new DBParameter("@token", model.client_token));

            if (verifyToken != null)
            {
                string member_pk = verifyToken["member_id_fk"].ToString();
                int is_success;

                is_success = DBHelper.ExecuteNonQuery(@"
                UPDATE order_record
                SET order_status = 'Waiting For Approval', payment_method = 'Cash On Delivery'
                WHERE order_id_pk = @order_id_pk AND member_id_fk = @member_id_fk;
                ",
                new DBParameter("@order_id_pk", model.order_id_pk),
                new DBParameter("@member_id_fk", member_pk));

                if(is_success == 0)
                {
                    result.isSuccess = false;
                } else
                {
                    result.isSuccess = true;
                }
            }
            return result;
        }

        [Route("customerCancelOrder")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult customerCancelOrder([FromBody] HotDealsAPI.Models.customerChangeOrderStatus model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataRow verifyToken = DBHelper.GetDataRow(@"
            SELECT member_id_fk FROM login_token
            WHERE token = @token;
            ",
            new DBParameter("@token", model.client_token));

            if (verifyToken != null)
            {
                string member_pk = verifyToken["member_id_fk"].ToString();
                int is_success;

                is_success = DBHelper.ExecuteNonQuery(@"
                UPDATE order_record
                SET order_status = 'Canceled', is_cancel = b'1'
                WHERE order_id_pk = @order_id_pk AND member_id_fk = @member_id_fk;
                ",
                new DBParameter("@order_id_pk", model.order_id_pk),
                new DBParameter("@member_id_fk", member_pk));

                if (is_success == 0)
                {
                    result.isSuccess = false;
                }
                else
                {
                    result.isSuccess = true;
                }
            }
            return result;
        }

        [Route("customerUploadFile")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult customerUploadFile([FromBody] HotDealsAPI.Models.customer_upload_file model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataRow verifyToken = DBHelper.GetDataRow(@"
            SELECT member_id_fk FROM login_token
            WHERE token = @token;
            ",
            new DBParameter("@token", model.client_token));

            if (verifyToken != null)
            {
                string member_pk = verifyToken["member_id_fk"].ToString();
                int is_success;

                is_success = DBHelper.ExecuteNonQuery(@"
                UPDATE order_record
                SET bank_receipt = @bank_receipt, payment_method = 'Bank In', order_status = 'Waiting For Approval'
                WHERE order_id_pk = @order_id_pk AND member_id_fk = @member_id_fk;
                ",
                new DBParameter("@order_id_pk", model.order_id_pk),
                new DBParameter("@member_id_fk", member_pk),
                new DBParameter("@bank_receipt", model.bank_receipt));

                if (is_success == 0)
                {
                    result.isSuccess = false;
                }
                else
                {
                    result.isSuccess = true;
                }
            }
            return result;
        }

        [Route("admin-display-order")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult adminDisplayOrder()
        {
            BO.RequestResult result = new BO.RequestResult();

            DataTable order_detail = DBHelper.GetDataTable(@"
            SELECT product_id_fk,order_id_pk, bank_receipt,product_name, order_amount, order_status, payment_method, total_payment, mailing_recipient, mailing_address, mailing_phone_no FROM order_record
            WHERE is_cancel = b'0'
            ORDER BY order_date DESC;
            ");

            result.data = Lib.Conversion.ToJSONArray(order_detail);

            return result;
        }

        [Route("adminChangeOrderStatus")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult adminChangeOrderStatus([FromBody] HotDealsAPI.Models.admin_change_order_status model)
        {
            BO.RequestResult result = new BO.RequestResult();
            
            int is_success;
            
            is_success = DBHelper.ExecuteNonQuery(@"
            UPDATE order_record
            SET order_status = @status
            WHERE order_id_pk = @order_id_pk;
            ",
            new DBParameter("@order_id_pk", model.order_id_pk),
            new DBParameter("@status", model.status));

            if (is_success == 0)
            {
                result.isSuccess = false;
            }
            else
            {
                result.isSuccess = true;
            }
            Lib.Log.LogText("ty", "A1");
            return result;
        }

        [Route("adminApproveOrder")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult adminApproveOrder([FromBody] HotDealsAPI.Models.admin_approve_order model)
        {
            BO.RequestResult result = new BO.RequestResult();

            int is_success;
            
            is_success = DBHelper.ExecuteNonQuery(@"
            UPDATE order_record
            SET order_status = @status
            WHERE order_id_pk = @order_id_pk;
            ",
            new DBParameter("@order_id_pk", model.order_id_pk),
            new DBParameter("@status", model.status));
            
            if (is_success == 0)
            {
                result.isSuccess = false;
            }
            else
            {
                DBHelper.ExecuteNonQuery(@"
                    UPDATE product
                    SET remaining_quantity = remaining_quantity-@order_amount
                    WHERE product_id_pk = @product_id_fk;
                ", 
                new DBParameter("@product_id_fk", model.product_id_fk),
                new DBParameter("@order_amount", model.order_amount));

                result.isSuccess = true;
            }
            Lib.Log.LogText("ty", "A1");
            return result;
        }
    }
}
