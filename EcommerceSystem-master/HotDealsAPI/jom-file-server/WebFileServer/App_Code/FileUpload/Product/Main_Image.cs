using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Product
{
    /// <summary>
    /// Summary description for Product
    /// </summary>
    public class Main_Image : BaseFileUpload
    {
        public Main_Image(RequestInfo request) : base(request)
        {

        }

        protected override RequestResult ProcessRequest()
        {
            switch (this.Request.Option)
            {
                case "IMAGE": return ProcessRequest_UploadMainImage();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult ProcessRequest_UploadMainImage()
        {
            int MAX_WIDTH = 1920;
            int MAX_HEIGHT = 1080;

            RequestResult result = new RequestResult();

            if (result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../data/img/product/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageOrPDFExtensionAllowed(fileInfo.Extension))
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
