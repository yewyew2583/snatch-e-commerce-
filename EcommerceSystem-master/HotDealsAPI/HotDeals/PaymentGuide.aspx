<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PaymentGuide.aspx.cs" Inherits="HotDeals.PaymentGuide" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link rel="stylesheet" href="Content/PaymentGuide.css">
    <section class="paymentGuideContainer">
        <h3>Payment Guide</h3><br>
        <p><i>** All orders, regardless of methods of payment, are ONLY available for shipping within Klang Valley and will be subjected to RM5 shipping fee PER ITEM, regardless of the buyer's location anywhere within Klang Valley. **</i></p>
        <div class="cut"></div><br>
        <div class="cash">
            <h4>Cash on Delivery</h4>
            <h6><span class="glyphicon glyphicon-play"></span> How do I pay with cash on delivery?</h6>
            <p>Customers can choose the Cash On Delivery (COD) method at the payment step during checkout.</p>
            <p>After making their order, with the selection of this payment method, customers are required to prepare the EXACT amount of cash stated in the online receipt to be paid IN CASH to the delivery agent.</p>
            <h6><span class="glyphicon glyphicon-play"></span> Will I need to submit proof of my payment?</h6>
            <p>Yes. After choosing the cash on delivery method at the payment step during checkout AND completing the payment, customers will then be redirected to upload their bank receipt as a proof in order for us to proceed with the shipping process.</p>
        </div><br>
        <div class="cut"></div><br>
        <div class="bankIn">
            <h4>Bank In</h4>
            <h6><span class="glyphicon glyphicon-play"></span> How do I start paying with bank in?</h6>
            <p>Customers can perform ATM or E-banking transfer payment at the payment step during checkout.</p>
            <p>Payment using these methods will be made to our designated bank account as shown below.</p>
            <p class="bank-acc-info">(BANK and account number)</p>
            <h6><span class="glyphicon glyphicon-play"></span> Will I need to submit proof of my payment?</h6>
            <p>Yes. After choosing the bank in method at the payment step during checkout AND completing the payment, customers will then be redirected to upload their bank receipt as a proof in order for us to proceed with the shipping process.</p>
        </div><br>
    </section>
</asp:Content>
