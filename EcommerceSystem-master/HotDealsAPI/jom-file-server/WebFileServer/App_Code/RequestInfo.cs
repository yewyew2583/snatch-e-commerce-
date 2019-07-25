using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;

namespace WebFileServer
{

    /// <summary>
    /// Summary description for RequestInfo
    /// </summary>
    public class RequestInfo
    {
        #region Properties

        public HttpContext Context
        {
            get { return Context_; }
        }
        protected HttpContext Context_;

        public string LoginToken
        {
            get
            {
                if (Context_.Request.Headers["access_token"] != null)
                {
                    return Context_.Request.Headers["access_token"];
                }

                return "";
            }
        }

        public WebFileServer.Models.Domain.BasicMemberInfo MemberInfo
        {
            get
            {
                if (MemberInfo_ == null)
                {
                    DataRow row = DBHelper.GetDataRow(@"
                        SELECT m.member_pk, m.type, m.status, m.mobile_no, m.username, m.fullname,
                            m.email, m.facebook_id
                        FROM member m
                        INNER JOIN login_token l ON m.member_pk = l.member_fk
                        WHERE l.token = @token
                        LIMIT 0, 1;
                        ",
                        new DBParameter("@token", this.LoginToken));

                    MemberInfo_ = new WebFileServer.Models.Domain.BasicMemberInfo();

                    if (row != null)
                    {
                        MemberInfo_.SetValues(row);
                    }
                }

                return MemberInfo_;
            }
        }
        protected WebFileServer.Models.Domain.BasicMemberInfo MemberInfo_;

        public String Data1
        {
            get { return Lib.String.Trim(this.Context_.Request["data1"]).ToUpper(); }
        }

        public String Data2
        {
            get { return Lib.String.Trim(this.Context_.Request["data2"]).ToUpper(); }
        }

        public String Data3
        {
            get { return Lib.String.Trim(this.Context_.Request["data3"]).ToUpper(); }
        }

        public String group1
        {
            get { return Lib.String.Trim(this.Context_.Request["group1"]).ToUpper(); }
        }

        public String group2
        {
            get { return Lib.String.Trim(this.Context_.Request["group2"]).ToUpper(); }
        }

        public String group3
        {
            get { return Lib.String.Trim(this.Context_.Request["group3"]).ToUpper(); }
        }

        public String Option
        {
            get { return Lib.String.Trim(this.Context_.Request["option"]).ToUpper(); }
        }

        public String Role
        {
            get { return Lib.String.Trim(this.Context_.Request["role"]).ToUpper(); }
        }
        public String product_pk
        {
            get { return Lib.String.Trim(this.Context_.Request["product_pk"]); }
        }

        public HttpPostedFile UploadedFile
        {
            get
            {
                if (this.Context_ != null)
                {
                    if (this.Context_.Request.Files.Count > 0)
                    {
                        return this.Context_.Request.Files[0];
                    }
                }

                return null;
            }
        }

        #endregion

        public RequestInfo(HttpContext context)
        {
            Context_ = context;
        }
    }

}