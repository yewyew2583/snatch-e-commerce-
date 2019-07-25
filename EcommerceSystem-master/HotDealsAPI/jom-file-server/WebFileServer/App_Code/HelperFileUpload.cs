using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFileServer
{
    /// <summary>
    /// Summary description for Helper
    /// </summary>
    public class HelperFileUpload
    {
        public static bool IsImageExtensionAllowed(String extension)
        {
            extension = Lib.String.ToUpper(extension);

            if(Lib.String.InList(extension, "BMP", "GIF", "JPEG", "JPG", "PNG", "TIF"))
            {
                return true;
            }

            return false;
        }

        public static bool IsImageOrPDFExtensionAllowed(String extension)
        {
            extension = Lib.String.ToUpper(extension);

            if (Lib.String.InList(extension, "BMP", "GIF", "JPEG", "JPG", "PNG", "TIF","PDF"))
            {
                return true;
            }

            return false;
        }
    }
}
