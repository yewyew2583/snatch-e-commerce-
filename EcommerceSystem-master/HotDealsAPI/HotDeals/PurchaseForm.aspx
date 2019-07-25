<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PurchaseForm.aspx.cs" Inherits="HotDeals.PurchaseForm" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/PurchaseForm.css">
<script src="Scripts/PurchaseForm.js"></script>
    <section class="row big-section">
        <section class="column select-quantity-section small-12 medium-6 large-6">
            <h3><strong>Step 1: Choose Your Desire Quantity!</strong></h3>
            <div id="product_image" class="thumbnail">

            </div>
            <h4 id="product_name">Stabilo Red Pen</h4>
            <h4 id="discount_price">RM25.00</h4>
            <h6 id="original_price">RM28.50</h6>
                <p>Quantity:</p>
                <div class="input-group plus-minus-input">
                    <div class="input-group-button">
                        <button type="button" class="button secondary plus-minus-button" data-quantity="minus" data-field="quantity">
                           <i class="fi-minus"></i>
                        </button>
                     </div>
                    <input class="input-group-field" type="number" id="order_amount" name="quantity" value="1" min="1" step="1">
                    <div class="input-group-button">
                        <button type="button" class="button secondary plus-minus-button" data-quantity="plus" data-field="quantity">
                             <i class="fi-plus"></i>
                        </button>
                    </div>
                </div>
            <h4 style="display:inline">Total Price: </h4><h4 style="display:inline" id="total_price">RM25.00</h4><br>
            <h2 style="display:inline">Total Payment: </h2><h2 style="display:inline" id="total_payment">RM30</h2>
            <p class="help-text">RM5 delivery fees will be charged for each item.</p>
        </section>
        <section class="column purchase-form-section small-12 medium-6 large-6">
            <h3><strong>Step 2: Snatch NOW!</strong></h3>
            <h5>Note: Fill in your details correctly</h5>
            <label class="info-text-label">Name :</label>
            <input type="text" class="customer-detail-textbox"  id="customername" placeholder="Enter your name"/>
            <label class="info-text-label">Phone No. :</label>
            <input type="text" class="customer-detail-textbox" id="mailing_phone_no" placeholder="eg.0123456789"/>
            <label class="info-text-label">Mailing Address:</label>
            <textarea maxlength="1000" id="mailing_address" placeholder="Enter mailing address here."></textarea>
            <input type="button" class="button expanded" id="placeOrderBtn" value="Place Order" onclick="placeorder()" />
        </section>
    </section>
</asp:Content>
