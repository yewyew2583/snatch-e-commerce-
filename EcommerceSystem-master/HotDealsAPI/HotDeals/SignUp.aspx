<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SignUp.aspx.cs" Inherits="HotDeals.SignUp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/SignUp.css">
<script src="Scripts/SignUp.js"></script>
<script src="Scripts/notify.min.js"></script>
    <section class="sign-up-form-section">
        <h4>Create your own Snatch account!</h4>
        <div class="sign-up-form">
            <div class="details">
                <div class="name-div">Your Full Name:<br>
                    <input id="fname" placeholder="e.g. Jeremy Lim" />
                </div>
                <br>
                <div class="email-div">E-mail:<br>
                    <input id="email" placeholder="e.g. ben123@gmail.com" />
                </div>
                <br>
                <div class="password-div">Password:<br>
                    <input type="password" id="password" placeholder="At least 6 char with number(s)" />
                </div>
                <br>
                <div class="confirm-password-div">Confirm password:<br>
                    <input type="password" id="ConfirmPassword" class="Confirm_Password" placeholder="Re-enter your password" />
                </div>
                <br><br><br>
            </div>
            <p>By creating an account, you agree to Snatch's <a href="#">Terms of Use.</a></p>
            <input type="button" id="signupbtn" class="continue-button" onclick="signup()" value="Sign up now" /><br>
            <p>Already have an account? Log in <a href="SignIn.aspx">here!</a></p>
        </div>
    </section>
</asp:Content>
