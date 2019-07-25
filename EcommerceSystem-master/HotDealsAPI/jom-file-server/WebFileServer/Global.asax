<%@ Application Language="C#" %>

<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Timers" %>
<%@ Import Namespace="Lib.Data.Database" %>

<script runat="server">

    protected Lib.Threading.TimerWithObject timerCopyPartnerApplicationFiles = new Lib.Threading.TimerWithObject();
    /*
    void Application_Start(object sender, EventArgs e)
    {
        // Code that runs on application startup
        timerCopyPartnerApplicationFiles.Interval = 5 * 1000;
        timerCopyPartnerApplicationFiles.Elapsed += timerCopyPartnerApplicationFiles_Elapsed;
        timerCopyPartnerApplicationFiles.Start();
    }

    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown
        timerCopyPartnerApplicationFiles.Stop();
    }

    void Application_Error(object sender, EventArgs e)
    {
        // Code that runs when an unhandled error occurs
        Exception ex = Server.GetLastError();
        Lib.Log.LogError(ex);
    }

    void Session_Start(object sender, EventArgs e)
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e)
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
    */
    /*
    protected void timerCopyPartnerApplicationFiles_Elapsed(object sender, ElapsedEventArgs e)
    {
        try
        {
            DataTable dt = DBHelper.GetDataTable(@"
                SELECT partner_application_pk, img_driving_license_front, img_driving_license_back, img_driving_insurance
                FROM partner_application
                WHERE is_file_processed = 0
                ORDER BY partner_application_pk
                LIMIT 0, 10;
                ");

            List<BO.Model.Data.partner_application> applications =
                BO.Model.BindingHelper.ToList<BO.Model.Data.partner_application>(dt);

            string tempPath = AppDomain.CurrentDomain.BaseDirectory + "\\temp\\";
            string partner_profile_path =  AppDomain.CurrentDomain.BaseDirectory + "\\data\\files\\member\\partner_profile\\";

            foreach(BO.Model.Data.partner_application app in applications)
            {
                string sourceLicenseFront = tempPath + app.img_driving_license_front;
                string destLicenseFront = partner_profile_path + app.img_driving_license_front;
                string sourceLicenseBack = tempPath + app.img_driving_license_back;
                string destLicenseBack = partner_profile_path + app.img_driving_license_back;
                string sourceDrivingInsurance = tempPath + app.img_driving_insurance;
                string destDrivingInsurance = partner_profile_path + app.img_driving_insurance;

                // Copy license front
                if(Lib.String.LengthTrim(app.img_driving_license_front) > 0 &&
                    System.IO.File.Exists(sourceLicenseFront) && !System.IO.File.Exists(destLicenseFront))
                {
                    System.IO.File.Copy(sourceLicenseFront, destLicenseFront);
                }

                // Copy license back
                if(Lib.String.LengthTrim(app.img_driving_license_back) > 0 &&
                    System.IO.File.Exists(sourceLicenseBack) && !System.IO.File.Exists(destLicenseBack))
                {
                    System.IO.File.Copy(sourceLicenseBack, destLicenseBack);
                }

                // Copy driving insurance
                if(Lib.String.LengthTrim(app.img_driving_insurance) > 0 &&
                    System.IO.File.Exists(sourceDrivingInsurance) && !System.IO.File.Exists(destDrivingInsurance))
                {
                    System.IO.File.Copy(sourceDrivingInsurance, destDrivingInsurance);
                }

                DBHelper.ExecuteNonQuery(@"
                    UPDATE partner_application SET is_file_processed = 1 
                    WHERE partner_application_pk = @partner_application_pk;",
                    new DBParameter("@partner_application_pk", app.partner_application_pk));
            }
        }
        catch(System.Exception ex)
        {
            Lib.Log.LogError(ex);
        }
    }*/

</script>
