using System;
using System.Data;
using System.Web;

using BO;
using Lib.Data.Database;

namespace WebFileServer.FileUpload
{
    /// <summary>
    /// Summary description for BaseFileManager
    /// </summary>
    public class BaseFileUpload
    {
        #region Properties

        public RequestInfo Request
        {
            get { return Request_;  }
        }
        protected RequestInfo Request_;

        #endregion

        public bool IsNeedLogin
        {
            get { return IsNeedLogin_Check(); }
        }
        
        public BaseFileUpload(RequestInfo request)
        {
            this.Request_ = request;
        }

        public virtual bool IsNeedLogin_Check()
        {
            return true;
        }

        public RequestResult ProcessFileUpload()
        {
            RequestResult result = new RequestResult();

            if(this.Request.UploadedFile == null)
            {
                result.SetError("NO_FILE_UPLOADED", "No file uploaded.");
            }
            
            if(result.isSuccess)
            {
                result = ProcessRequest();
            }
                
            return result;
        }

        protected virtual RequestResult ProcessRequest()
        {
            throw new System.Exception("Not implemented.");
        }

    }
}