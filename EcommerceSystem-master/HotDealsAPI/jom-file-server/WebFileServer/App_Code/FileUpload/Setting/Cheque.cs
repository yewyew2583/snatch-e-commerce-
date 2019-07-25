using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Setting
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
            switch (this.Request.Option)
            {
                case "UPDATE_BANK_ICON": return ProcessRequest_UpdateBankIcon();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult ProcessRequest_UpdateBankIcon()
        {
            int MAX_WIDTH = 350;
            int MAX_HEIGHT = 350;

            RequestResult result = new RequestResult();
            long config_cheque_bank_pk = long.Parse(Request.Data1);

            // Verify access
            if (Request.MemberInfo.IsAdmin)
            {

            }
            else
            {
                result.SetError_UnauthorizedAccess();
            }

            if (result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../data/service/cheque/bank/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageExtensionAllowed(fileInfo.Extension))
                {
                    result.SetError(BO.Code.FileUpload.UNSUPPORTED_FORMAT, BO.Code.FileUpload.UNSUPPORTED_FORMAT_MSG);
                    return result;
                }

                if (Lib.ImageResize.SaveImage(file, saveFilePath, MAX_WIDTH, MAX_HEIGHT))
                {
                    DBHelper.ExecuteNonQuery(@"
                        UPDATE config_cheque_bank SET icon = @icon
                        WHERE config_cheque_bank_pk = @config_cheque_bank_pk;
                        ",
                        new DBParameter("@config_cheque_bank_pk", config_cheque_bank_pk),
                        new DBParameter("@icon", fileInfo.FileNameUnique));

                    result.data = new BO.Model.Domain.File.uploaded_file
                    {
                        file_name = fileInfo.FileNameUnique,
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
