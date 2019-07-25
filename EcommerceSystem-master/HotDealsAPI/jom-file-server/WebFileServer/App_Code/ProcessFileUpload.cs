using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using BO;

namespace WebFileServer
{
    /// <summary>
    /// Summary description for ProcessFileUpload
    /// </summary>
    public class ProcessFileUpload
    {
        public static RequestResult Process(HttpContext context)
        {
            RequestResult result = new RequestResult();
            RequestInfo request = new RequestInfo(context);

            switch(request.group1)
            {
                case "PRODUCT_IMAGE": result = ProcessGroup2_Product_Image(request); break;
                case "BANKIN_PROOF": result = BankIn_Proof(request); break;
                default: throw new System.Exception("Group 1 not found.");
            }

            return result;
        }

        protected static RequestResult ProcessGroup2_Product_Image(RequestInfo request)
        {
            RequestResult result = null;

            switch (request.group2)
            {
                case "MAIN_IMAGE":
                    result = new FileUpload.Product.Main_Image(request).ProcessFileUpload(); break;
                case "SUB_IMAGE":
                    result = new FileUpload.Product.Sub_Image(request).ProcessFileUpload(); break;
                default: throw new System.Exception("Group 2 not found.");
            }

            return result;
        }

        protected static RequestResult BankIn_Proof(RequestInfo request)
        {
            RequestResult result = null;

            result = new FileUpload.Bank_In.BankIn_Proof(request).ProcessFileUpload();

            return result;
        }
    }
}
