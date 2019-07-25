<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CustomerOrder.aspx.cs" Inherits="HotDeals.CustomerOrder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="Content/CustomerOrder.css">
    <script src="Scripts/CustomerOrder.js"></script>
    <div class="row small-up-1 medium-up-1 large-up-1">
        <h2 class="column" id="customer_order_title">Your Order</h2>
    </div>
    <section class="row small-up-1 medium-up-1 medium-up-1" id="customer_order_section">
        <div class="loader_wrapper column small-12 medium-12 large-12">
            <div class="loader"></div>
        </div>
        <div class="no_customer_order column small-12 medium-12 large-12">
            <h2>No Record Found!</h2>
        </div>
        <%--<div class="media-object column row">
            <div class="column small-12 medium-6 large-4">
                <div class="thumbnail">
                    <img src="img/product/Razer_6.png">
                </div>
            </div>
            <div class="column small-12 medium-6 large-4">
                <div class="info_section">
                    <h4>Order ID: 1</h4>
                    <p>Product Name: Razer</p>
                    <p>Amount: 2</p>
                    <p>Total Payment Amount: RM16</p>
                    <p>Status: Pending</p>
                </div>
            </div>
            <div class="column small-12 medium-12 large-4">
                <button class="button order_page_button warning" type="button">Cash On Delivery</button>
                <button class="button order_page_button warning" type="button">Upload Payment Proof</button>
                <button class="button order_page_button falert" type="button">Cancel Order</button>
            </div>
        </div>--%>
    </section>
    <div class="reveal confirmation_popup" id="CODConfirm" data-reveal>
        <h6>Do you sure you want to choose "Cash On Deliver" method?</h6>
        <p class="help-text">You will NOT be able to revery your changes</p>
        <div class="button-group expanded">
            <button class="button codButton" type="button">Yes</button>
            <button class="button" type="button" data-close>No</button>
        </div>
    </div>
    <div class="reveal confirmation_popup" id="CancelConfirm" data-reveal>
        <h6>Do you sure you want to cancel this order?</h6>
        <p class="help-text">You will NOT be able to revery your changes</p>
        <div class="button-group expanded">
            <button class="button cancelButton" type="button">Yes</button>
            <button class="button" type="button" data-close>No</button>
        </div>
    </div>
    <div class="reveal confirmation_popup" id="UploadFileConfirm" data-reveal>
        <h6>Please Upload your bank in proof</h6>
        <p class="help-text">You can upload proof in image or PDF</p>
        <label for="input_upload_bank_in" class="button">Choose File</label>
        <input id="input_upload_bank_in" type="file" style="display:none"/>
        <p id="uploaded_file_name"></p>
        <div class="button-group expanded">
            <button type="button" class="button btn_upload_bank_in disabled">Upload</button>
            <button class="button" type="button" data-close>No</button>
        </div>
    </div>
</asp:Content>
