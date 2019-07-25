using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Registration
{
    /// <summary>
    /// Summary description for Partner
    /// </summary>
    public class PartnerMotorbike : BaseFileUpload
    {
        public PartnerMotorbike(RequestInfo request) : base(request)
        {
        }

        public override bool IsNeedLogin_Check()
        {
            if(this.Request.Option == "IMAGE")
            {
                return false;
            }

            return base.IsNeedLogin_Check();
        }


        protected override RequestResult ProcessRequest()
        {
            switch (this.Request.Option)
            {
                case "IMAGE": return ProcessRequest_Image();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult ProcessRequest_Image()
        {
            int MAX_WIDTH = 2048;
            int MAX_HEIGHT = 1536;

            RequestResult result = new RequestResult();

            if (result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../temp/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageExtensionAllowed(fileInfo.Extension))
                {
                    result.SetError(BO.Code.FileUpload.UNSUPPORTED_FORMAT, BO.Code.FileUpload.UNSUPPORTED_FORMAT_MSG);
                    return result;
                }

                if (Lib.ImageResize.SaveImage(file, saveFilePath, MAX_WIDTH, MAX_HEIGHT))
                {
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