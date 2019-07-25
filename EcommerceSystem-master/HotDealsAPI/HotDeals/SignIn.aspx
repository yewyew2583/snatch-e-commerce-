<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SignIn.aspx.cs" Inherits="HotDeals.SignIn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/SignIn.css">
<script src="Scripts/SignIn.js"></script>
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <section class="sign-in-form-section">
        <h4>log in to your SNATCH account!</h4>
        <div class="sign-in-form">
            <div class="details">
                <div class="email-div">E-mail:<br><input id="email"></div><br>
                <div class="password-div">Password:<br> <input type="password" id="password"></div><br>
                <div id="sectionappend"></div>
            </div>
            <p>Forgot your password? Click <a href="ForgotPassword.aspx">here!</a></p>
            <input type="button" class="continue-button" onclick="signin()" id="signinbtn" value="Log in"/><br>
            <p>Don't have one yet? Create your own account <a href="SignUp.aspx">here!</a></p>
        </div>
    </section>
</asp:Content>
