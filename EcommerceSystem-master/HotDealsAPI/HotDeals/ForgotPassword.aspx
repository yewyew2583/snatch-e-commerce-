<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="HotDeals.ForgotPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script src="Scripts/ForgotPassword.js"></script>
<script src="Scripts/notify.min.js"></script>
<link rel="stylesheet" href="Content/ForgotPassword.css" />
    <section class="forgot-password-section">
        <h4>Enter Your E-mail: </h4>
        <input type="text" id="email"/>
        <div class="row">
            <div class="small-6 medium-6 column"><input type="button" id="send_btn" class="sendbutton" value="Send" onclick="sendemail()"/></div>
            <div class="small-6 medium-6 column"><i>Clicking "Send" will send a verification link to reset password to the inbox of your entered e-mail.</i></div>
        </div>
    </section>
</asp:Content>
