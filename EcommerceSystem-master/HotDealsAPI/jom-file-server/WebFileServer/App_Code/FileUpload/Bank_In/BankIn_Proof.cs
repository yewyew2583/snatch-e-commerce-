using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Bank_In
{
    /// <summary>
    /// Summary description for Bankin Proof
    /// </summary>
    public class BankIn_Proof : BaseFileUpload
    {
        public BankIn_Proof(RequestInfo request) : base(request)
        {

        }

        protected override RequestResult ProcessRequest()
        {
            switch (this.Request.Option)
            {
                case "FILE": return ProcessRequest_UploadBankInProof();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult ProcessRequest_UploadBankInProof()
        {

            RequestResult result = new RequestResult();

            if (result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../data/bankinproof/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageOrPDFExtensionAllowed(fileInfo.Extension))
                {
                    result.SetError(BO.Code.FileUpload.UNSUPPORTED_FORMAT, BO.Code.FileUpload.UNSUPPORTED_FORMAT_MSG);
                    result.isSuccess = false;
                }

                file.SaveAs(saveFilePath);

                result.data = new BO.Model.Domain.File.uploaded_file
                {
                    file_name = fileInfo.FileNameUnique,
                    file_name_physical = fileInfo.FileNameUnique
                };
            }

            return result;
        }


    }
}
