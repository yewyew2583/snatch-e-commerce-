using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using BO;

namespace WebFileServer
{
    public partial class upload_Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RequestResult result = new RequestResult();

            try
            {
                result = ProcessFileUpload.Process(this.Context);
            }
            catch(System.Exception ex)
            {
                Lib.Log.LogError(ex);
                result.SetError_Unknown();
            }

            Response.ClearContent();
            Response.Write(Lib.JSON.Stringify(result));

            // Allow cross domain request
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
        }
    }
}
