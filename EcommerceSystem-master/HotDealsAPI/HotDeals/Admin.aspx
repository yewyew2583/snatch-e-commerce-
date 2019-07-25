<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="HotDeals.Admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>HotDeals - Admin Login Page</title>
    <link rel="stylesheet" href="Content/font-awesome.min.css" />
    <link rel="stylesheet" href="Content/icons/foundation-icons.css" />
    <link rel="stylesheet" href="Content/foundation.min.css" />
    <link rel="stylesheet" href="Content/app.css" />
    <link rel="stylesheet" href="Content/AdminMainPage.css" />
    <link rel="stylesheet" href="Content/Admin.css" />
</head>
<body>
    <section class="login-container-section">
    <section class="admin-header">
        <a href="MainMenu.aspx"><img src="img/office-cart-logo-grey.png" /></a>
    </section>
    <section class="login-section">
        <p align="center">Username: <input type="text" id="username" class="username-box"/><br/></p>
        <p align="center">Password: <input type="password" id="password" class="password-box"/></p>
        <i id="sectionappend"></i><br />
        <input type="button" value="Login" onclick="adminlogin()" /><br/><br/>
    </section>
    </section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="Scripts/jom.js"></script>
<script type="text/javascript">
    jom.apiUrl = "<%= HotDeals.Config.Url_RemoteApi  %>";
    jom.isDebug = <%= HotDeals.Config.IsDebug.ToString().ToLower() %>;
</script>
<script src="Scripts/vendor/what-input.js"></script>
<script src="Scripts/vendor/foundation.js"></script>
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="Scripts/Admin.js"></script>
</body>
</html>
