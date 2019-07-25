<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SuccessResetPassword.aspx.cs" Inherits="HotDeals.SuccessResetPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/SuccessResetPassword.css" />
    <section class="success-reset-section">
        <h3>Your password has been successfully reset.</h3><br />
        <h6>Your new password: 123456</h6><br />
        <a href="MainMenu.aspx" class="continue-button">Continue</a>
    </section>
</asp:Content>
