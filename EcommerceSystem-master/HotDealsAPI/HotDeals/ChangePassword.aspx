<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="HotDeals.ChangePassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/ChangePassword.css" />
<script src="Scripts/ChangePassword.js"></script>
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="Scripts/notify.min.js"></script>
    <section class="row change-password-section">
        <div class="change-pass-container column large-12 medium-12 small-12" align="center">
            <h4>Change your password</h4>
            <div class="change-pass-form">
                <div class="details">
                    <div class="current-pass-div">Current Password: <input type="password" id="current_password"/></div><br />
                    <div class="new-pass-div">New Password: <input type="password" id="new_password"/></div><br />
                    <div class="confirm-new-pass-div">Confirm New Password: <input type="password" id="new_confirm_password"/></div>
                    <div id="sectionappend"></div><br />
                </div>
                <p>By clicking "Confirm", you agree to change your current password to the new password that you have just entered above.</p>
                <input type="button" value="Confirm" id="change_password_btn" class="changePassButton" onclick="confirmchangepassword()"/>
            </div>
        </div>
    </section>
</asp:Content>
