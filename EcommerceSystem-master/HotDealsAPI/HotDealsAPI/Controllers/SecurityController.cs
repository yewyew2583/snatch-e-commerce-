using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;

using BO;
using Lib.Data.Database;

namespace HotDealsAPI.Controllers
{
    [RoutePrefix("security")]
    public class SecurityController : ApiController
    {
        [Route("signup")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult SignUp([FromBody] HotDealsAPI.Models.Security.sign_up_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            try
            {
                DBHelper.ExecuteNonQuery(@"
                INSERT INTO member(full_name, email, password, register_time)
                VALUES(@full_name, @email, @password, NOW());
                ",

                new DBParameter("@full_name", model.full_name),
                new DBParameter("@email", model.email),
                new DBParameter("@password", model.password));
            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        [Route("verify-same-email")]
        [System.Web.Http.AcceptVerbs("POST", "GET")]
        public BO.RequestResult VerifySameEmail([FromBody] HotDealsAPI.Models.Security.sign_up_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DataRow found = DBHelper.GetDataRow(@"
                SELECT member_id_pk FROM member
                WHERE email = @email
                LIMIT 0, 1;
                ",
                new DBParameter("@email", model.email));

            if (found == null)
            {
                result.isSuccess = true;
            }
            else
            {
                result.isSuccess = false;
            }

            return result;
        }
        
        [Route("login")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult Login([FromBody] HotDealsAPI.Models.Security.login_data model)
        {
            BO.RequestResult result = new BO.RequestResult();
            try
            {
                DataRow member_found = DBHelper.GetDataRow(@"
            SELECT member_id_pk FROM member
            WHERE email = @email AND password = @password
            LIMIT 0,1;
            ",
                    new DBParameter("@email", model.email),
                    new DBParameter("@password", model.password));

                if (member_found != null)
                {

                    string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                    //Guid.NewGuid().ToString()
                    result.isSuccess = true;

                    DBHelper.ExecuteNonQuery(@"
                    INSERT INTO login_token(member_id_fk, token, created_time,last_access_time,expiry_time)
                    VALUES((SELECT member_id_pk FROM member WHERE email = @email AND password = @password LIMIT 0,1), @token, NOW(), NOW(), (NOW()+INTERVAL 20 MINUTE));
                    ",

                    new DBParameter("@email", model.email),
                    new DBParameter("@password", model.password),
                    new DBParameter("@token", token));

                    DataRow client_data = DBHelper.GetDataRow(@"
                    SELECT m.full_name, lk.token,lk.member_id_fk
                    FROM member m, login_token lk
                    WHERE token = @token AND lk.member_id_fk = m.member_id_pk
                    LIMIT 0,1;
                    ",

                    new DBParameter("@token", token));

                    result.data = Lib.Conversion.ToJSON(client_data);
                }
                else
                {
                    result.isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        [Route("logout")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult Logout([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();
            
            DBHelper.ExecuteNonQuery(@"
                DELETE FROM login_token WHERE token = @token;
                ",
            new DBParameter("@token", model.client_token));

            result.isSuccess = true;

            return result;
        }

        [Route("refresh-time-or-remove-access-token")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult validateToken([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            try
            {
                DataRow token_found = DBHelper.GetDataRow(@"
                    SELECT login_token_pk FROM login_token
                    WHERE token = @token
                    AND TIME_TO_SEC(TIMEDIFF(expiry_time,NOW())) > 0
                    LIMIT 0,1;
                    ",
               new DBParameter("@token", model.client_token));

                if (token_found != null)
                {
                    DBHelper.ExecuteNonQuery(@"
                    UPDATE login_token SET last_access_time = NOW(), expiry_time = (NOW()+INTERVAL 20 MINUTE)
                    WHERE token = @token;
                    ",
                    new DBParameter("@token", model.client_token));

                    result.isSuccess = true;
                }
                else
                {
                    DBHelper.ExecuteNonQuery(@"
                    DELETE FROM login_token WHERE token = @token;",
                    new DBParameter("@token", model.client_token));

                    result.isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        [Route("send-email-forgot-password")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult SendEmail([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();
            string token = Guid.NewGuid().ToString();
            string resetPasswordLink = "http://localhost:58898/ResetPassword.aspx?validate=" + token;

            DBHelper.ExecuteNonQuery(@"
                INSERT INTO reset_password_token(token, email)
                VALUES(@token, @email);
                ",
                new DBParameter("@token", token),
                new DBParameter("@email", model.client_email));

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);

            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new System.Net.NetworkCredential("sohaiyewyew@gmail.com", "passwordsusah");

            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage();

            //Setting From , To and CC
            mail.From = new MailAddress("sohaiyewyew@gmail.com", "Snatch Reset");
            mail.To.Add(new MailAddress(model.client_email));
            //mail.CC.Add(new MailAddress("MyEmailID@gmail.com"));
            
            mail.Subject = "Reset your password";
            mail.IsBodyHtml = true;
            mail.Body = "<h3>Click the link below to confirm reset password!</h3>" + "CLICK ->  <a href='"+ resetPasswordLink + "'>ResetPasswordNow.com</a>";

            smtpClient.Send(mail);
            result.isSuccess = true;

            return result;
        }

        [Route("reset-password")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult ResetPassword([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            try
            {
                DBHelper.ExecuteNonQuery(@"
                    UPDATE member m, reset_password_token r
                    SET PASSWORD = '123456'
                    WHERE m.email = r.email AND r.token = @token;
                    ",
                    new DBParameter("@token", model.client_token));

                result.isSuccess = true;

            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        [Route("change-password")]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public BO.RequestResult ChangePassword([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            try
            {
                DataRow member_id_found = DBHelper.GetDataRow(@"
                SELECT member_id_fk FROM login_token
                WHERE token = @token;
                ",
                new DBParameter("@token", model.client_token));

                result.data = member_id_found;

                if (member_id_found != null)
                {
                    string member_id_pk = member_id_found["member_id_fk"].ToString();
                    int isSuccess;


                    isSuccess = DBHelper.ExecuteNonQuery(@"
                                UPDATE member
                                SET password = @new_password
                                WHERE password = @current_password AND member_id_pk = @member_id_pk;
                                ",
                                new DBParameter("@new_password", model.client_password),
                                new DBParameter("@current_password", model.client_current_password),
                                new DBParameter("@member_id_pk", member_id_pk));
                    
                    if(isSuccess == 1)
                    {
                        result.isSuccess = true;
                    }
                    else
                    {
                        result.isSuccess = false;
                    }
                }
                else
                {
                    result.isSuccess = false;
                }

            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        //---------------------------------------------------------//
        //**********************ADMIN SECTION**********************//
        //--------------------------------------------------------//
        [Route("admin-login")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult AdminLogin([FromBody] HotDealsAPI.Models.Security.login_data model)
        {
            BO.RequestResult result = new BO.RequestResult();
            try
            {
                DataRow member_found = DBHelper.GetDataRow(@"
                    SELECT admin_id_pk FROM admin
                    WHERE username = @username AND password = @password
                    LIMIT 0,1;
                    ",
                    new DBParameter("@username", model.username),
                    new DBParameter("@password", model.password));

                if (member_found != null)
                {

                    string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                    //Guid.NewGuid().ToString()
                    result.isSuccess = true;

                    DBHelper.ExecuteNonQuery(@"
                    INSERT INTO login_token(admin_id_fk, token, created_time,last_access_time,expiry_time)
                    VALUES((SELECT admin_id_pk FROM admin WHERE username = @username AND password = @password LIMIT 0,1), @token, NOW(), NOW(), (NOW()+INTERVAL 20 MINUTE));
                    ",

                    new DBParameter("@username", model.username),
                    new DBParameter("@password", model.password),
                    new DBParameter("@token", token));

                    DataRow admin_data = DBHelper.GetDataRow(@"
                    SELECT a.username, lk.token,lk.member_id_fk
                    FROM admin a, login_token lk
                    WHERE token = @token AND lk.admin_id_fk = a.admin_id_pk
                    LIMIT 0,1;
                    ",

                    new DBParameter("@token", token));

                    result.data = Lib.Conversion.ToJSON(admin_data);
                }
                else
                {
                    result.isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }

        [Route("admin-logout")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult AdminLogout([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            DBHelper.ExecuteNonQuery(@"
                DELETE FROM login_token WHERE token = @token;
                ",
            new DBParameter("@token", model.admin_token));

            result.isSuccess = true;

            return result;
        }

        [Route("admin-refresh-time-or-remove-access-token")]
        [System.Web.Http.AcceptVerbs("POST")]
        public BO.RequestResult AdminValidateToken([FromBody] HotDealsAPI.Models.Security.token_data model)
        {
            BO.RequestResult result = new BO.RequestResult();

            try
            {
                DataRow token_found = DBHelper.GetDataRow(@"
                    SELECT login_token_pk FROM login_token
                    WHERE token = @token
                    AND TIME_TO_SEC(TIMEDIFF(expiry_time,NOW())) > 0
                    LIMIT 0,1;
                    ",
               new DBParameter("@token", model.admin_token));

                if (token_found != null)
                {
                    DBHelper.ExecuteNonQuery(@"
                    UPDATE login_token SET last_access_time = NOW(), expiry_time = (NOW()+INTERVAL 20 MINUTE)
                    WHERE token = @token;
                    ",
                    new DBParameter("@token", model.admin_token));

                    result.isSuccess = true;
                }
                else
                {
                    DBHelper.ExecuteNonQuery(@"
                    DELETE FROM login_token WHERE token = @token;",
                    new DBParameter("@token", model.admin_token));

                    result.isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            return result;
        }
    }
}

