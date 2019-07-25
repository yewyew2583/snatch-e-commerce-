<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="HotDeals.ResetPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script src="Scripts/ResetPassword.js"></script>
<link rel="stylesheet" href="Content/ResetPassword.css" />
    <section class="confirm-reset-section small-12">
        <h4>Confirm reset password</h4>
        <input type="button" value="Confirm" id="reset_password_btn" class="changePassButton" onclick="resetpassword()"/><br />
        <p>Clicking "Confirm" will allow you to change your old password to a new password.</p>
    </section>
</asp:Content>
