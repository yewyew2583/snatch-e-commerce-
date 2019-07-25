using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace HotDeals
{
    public class Config
    {
        public static bool IsDebug
        {
            get
            {
                string IsDebugStr = System.Configuration.ConfigurationManager.AppSettings["IsDebug"];

                if (IsDebugStr == null)
                {
                    throw new System.Exception("AppSettings setting for 'IsDebug' not found.");
                }

                if (string.IsNullOrWhiteSpace(IsDebugStr))
                {
                    throw new System.Exception("AppSettings setting for 'IsDebug' cannot be empty string.");
                }

                if (IsDebugStr == "1" || IsDebugStr.Trim().ToUpper() == "TRUE")
                {
                    return true;
                }

                return false;
            }
        }

        public static string Url_RemoteApi
        {
            get
            {
                if (ConfigurationManager.AppSettings["Url_RemoteApi"] == null)
                {
                    throw new System.Exception("AppSettings setting for 'Url_RemoteApi' not found.");
                }

                string address = ConfigurationManager.AppSettings["Url_RemoteApi"].Trim();

                if (address == "")
                {
                    throw new System.Exception("AppSettings setting for 'Url_RemoteApi' cannot be empty string.");
                }

                return address;
            }
        }
    }
}