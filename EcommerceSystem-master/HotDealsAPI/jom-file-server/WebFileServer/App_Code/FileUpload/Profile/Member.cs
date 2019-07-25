using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;
using Lib.IO;

namespace WebFileServer.FileUpload.Profile
{

    /// <summary>
    /// Summary description for Member
    /// </summary>
    public class Member : BaseFileUpload
    {
        public Member(RequestInfo request) : base(request)
        {

        }

        protected override RequestResult ProcessRequest()
        {
            switch (this.Request.Option)
            {
                case "UPDATE_PHOTO": return ProcessRequest_UpdatePhoto();
                default: throw new System.Exception("Option not found.");

            }
        }

        protected RequestResult ProcessRequest_UpdatePhoto()
        {
            int MAX_WIDTH = 350;
            int MAX_HEIGHT = 350;

            RequestResult result = new RequestResult();
            long member_pk = long.Parse(Request.Data1);

            // Verify access
            if (member_pk > 0 && Request.MemberInfo.member_pk == member_pk)
            {
                
            } else
            {
                result.SetError_UnauthorizedAccess();
            }

            if (result.isSuccess)
            {
                // Get file info
                HttpPostedFile file = this.Request.UploadedFile;
                String filename = file.FileName;
                UploadedFileInfo fileInfo = new UploadedFileInfo(filename);
                String saveFilePath = Request.Context.Server.MapPath("../data/files/member/photo/" + fileInfo.FileNameUnique);

                // Verify extension
                if (!HelperFileUpload.IsImageExtensionAllowed(fileInfo.Extension))
                {
                    result.SetError(BO.Code.FileUpload.UNSUPPORTED_FORMAT, BO.Code.FileUpload.UNSUPPORTED_FORMAT_MSG);
                    return result;
                }

                if (Lib.ImageResize.SaveImage(file, saveFilePath, MAX_WIDTH, MAX_HEIGHT))
                {
                    DBHelper.ExecuteNonQuery(@"
                        UPDATE member SET photo = @photo
                        WHERE member_pk = @member_pk;
                        ",
                        new DBParameter("@member_pk", member_pk),
                        new DBParameter("@photo", fileInfo.FileNameUnique));

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

    } // End Class

}