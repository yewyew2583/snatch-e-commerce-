using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Service
{
    /// <summary>
    /// Summary description for Cheque
    /// </summary>
    public class Cheque : BaseFileUpload
    {
        public Cheque(RequestInfo request) : base(request)
        {
        }

        protected override RequestResult ProcessRequest()
        {
            switch(this.Request.Role)
            {
                case "PARTNER": return ProcessRequest_Partner();
                default: throw new System.Exception("Role not found.");

            }
        }

        protected RequestResult ProcessRequest_Partner()
        {
            switch (this.Request.Option)
            {
                case "RECEIPT": return SaveCheuqueReceipt();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult SaveCheuqueReceipt()
        {
            int MAX_WIDTH = 2048;
            int MAX_HEIGHT = 1536;

            RequestResult result = new RequestResult();
            Guid job_id = Guid.Parse(Request.Data1);

            // Verify access
            if (!BO.Service.Order.Validation.IsPartner(job_id, Request.MemberInfo.member_pk))
            {
                result.SetError_UnauthorizedAccess();
            }

            if(result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../data/files/service_order/cheque/receipt/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageExtensionAllowed(fileInfo.Extension))
                {
                    result.SetError(BO.Code.FileUpload.UNSUPPORTED_FORMAT, BO.Code.FileUpload.UNSUPPORTED_FORMAT_MSG);
                    return result;
                }

                if (Lib.ImageResize.SaveImage(file, saveFilePath, MAX_WIDTH, MAX_HEIGHT))
                {
                    // Get service_order_pk
                    DataRow rowOrder = DBHelper.GetDataRow(@"
                        SELECT service_order_pk 
                        FROM service_order
                        WHERE job_id = @job_id
                        LIMIT 0, 1;
                        ",
                        new DBParameter("@job_id", job_id));

                    long service_order_pk = Lib.Conversion.ToLong(rowOrder["service_order_pk"]);

                    // Update service_order_attachment record
                    DBHelper.ExecuteNonQuery(@"
                        DELETE FROM service_order_attachment
                        WHERE service_order_fk = @service_order_fk AND code_file_type = @code_file_type;

                        INSERT INTO service_order_attachment(service_order_fk, code_file_type, code_user_type, file_name, file_name_physical)
                        VALUES(@service_order_fk, @code_file_type, @code_user_type, @file_name, @file_name_physical);
                        ",
                        new DBParameter("@service_order_fk", service_order_pk),
                        new DBParameter("@code_file_type", "RECEIPT"),
                        new DBParameter("@code_user_type", BO.Code.TypeMember.PARTNER),
                        new DBParameter("@file_name", fileInfo.FileName),
                        new DBParameter("@file_name_physical", fileInfo.FileNameUnique));

                    result.data = new BO.Model.Data.service_order_attachment
                    {
                        file_name = fileInfo.FileName,
                        file_name_physical = fileInfo.FileNameUnique
                    };
                }
                else
                {
                    result.SetError_Unknown();
                }
            }

            return result;
        }

    }
}
