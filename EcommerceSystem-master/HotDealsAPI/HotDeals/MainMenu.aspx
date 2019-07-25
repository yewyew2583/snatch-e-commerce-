<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="MainMenu.aspx.cs" Inherits="HotDeals.MainMenu" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="https://fonts.googleapis.com/css?family=Oswald|Raleway|Roboto" rel="stylesheet">
    <link rel="stylesheet" href="Content/circle.css">
    <link rel="stylesheet" href="Content/MainMenu.css">
    <link rel="stylesheet" href="Content/flipclock.css">
    <script src="Scripts/MainMenu.js"></script>
    <script src="Scripts/flipclock.min.js"></script>
    <section id="mainMenuContainer">
        <section id="item-count-group">
        <%--<div class="c100 p25 big red item-count-big show-for-large hide-for-small">
            <span>197 left</span>
            <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
            </div>
        </div>
        <div class="c100 p25 red item-count-medium show-for-medium hide-for-large">
            <span>197 left</span>
            <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
            </div>
        </div>
        <div class="c100 p25 small red item-count-small show-for-small hide-for-medium">
            <span>197 left</span>
            <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
            </div>
        </div>--%>
    </section>
    
    <section class="row" style="margin-top:5%;">
        <div class="small-12 medium-12 large-9 large-offset-3 columns">
            <div class="clock"></div>
        </div>
    </section>
    <section class="row">
        <div class="column large-12" style="text-align:center">
            <label style="margin-bottom:0;"><strong id="product_name"></strong></label>
        </div>
        <div class="small-12 medium-12 large-6 column product-detail-image-tab">
            <div class="tabs-content image_tab" data-tabs-content="product-detail-image">
                <%--<div class="tabs-panel is-active" id="image1">
                      <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>
                <div class="tabs-panel" id="image2">
                    <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>
                <div class="tabs-panel" id="image3">
                      <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>
                <div class="tabs-panel" id="image4">
                    <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>
                <div class="tabs-panel" id="image5">
                      <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>
                <div class="tabs-panel" id="image6">
                    <img class="thumbnail" src="http://placehold.it/1920x1080">
                </div>--%>
            </div>
            <ul class="tabs image_tab_selection" data-tabs id="product-detail-image">
                <%--<li class="tabs-title is-active"><a href="#image1"><img src="http://placehold.it/650x350"></a></li>
                <li class="tabs-title"><a href="#image2"><img src="http://placehold.it/180x180"></a></li>
                <li class="tabs-title"><a href="#image3"><img src="http://placehold.it/650x350"></a></li>
                <li class="tabs-title"><a href="#image4"><img src="http://placehold.it/180x180"></a></li>
                <li class="tabs-title"><a href="#image5"><img src="http://placehold.it/650x350"></a></li>
                <li class="tabs-title"><a href="#image6"><img src="http://placehold.it/180x180"></a></li>--%>
            </ul>
        </div>
        <div class="column small-6 medium-6 large-3">
            <label><strong id="discount_price"></strong></label><span class="label falert" id="discount_percent"></span>
            <label id="price"style="text-decoration:line-through"></label>
        </div>
        <div class="column small-6 medium-6 large-3 show-for-medium hide-for-small">
            <button class="button warning buy-button" type="button">Buy Now</button>
            <br />
            <a class="button price-comparison-button" data-open="priceComparisonModalBody">Price Comparison</a>
        </div>
        <div class="column small-6 medium-6 large-3 show-for-small hide-for-medium" style="position: relative;top: 60px;">
            <button class="button warning buy-button-small" type="button">Buy Now</button>
            <br />
            <a class="button price-comparison-button-small" data-open="priceComparisonModalBody">Price Comparison</a>
        </div>
    </section>
    <section class="row">
        <div class="column large-12">
            <hr />
            <h5>Product Detail:</h5>
            <p id="product_detail">
                
            </p>
            <hr />
        </div>
    </section>
    <section class="pass-coming-items-section">
        <ul class="tabs" data-tabs id="past-coming-items">
            <li class="tabs-title is-active"><a href="#past-item">What You've Missed Out!</a></li>
            <%--<li class="tabs-title"><a href="#coming-soon">Coming Soon</a></li>--%>
        </ul>
        <div class="tabs-content" data-tabs-content="past-coming-items">
            <div class="tabs-panel is-active row small-up-2 medium-up-3 large-up-5" id="past-item">
                <%--<div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-medium"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>--%>
            </div>
            <%--<div class="tabs-panel row small-up-2 medium-up-3 large-up-5" id="coming-soon">
                <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-medium"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
            </div>--%>
        </div>
    </section>
    <div class="reveal preview_link" id="priceComparisonModalBody" data-reveal data-animation-in="fade-in" data-animation-out="fade-out">
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    </section>

    <!-- Main Menu when no current product item to be displayed -->
    <section id="mainMenuContainerBlank">
        <section class="message">
            <div class="apology">
                <h1>Our apologies!</h1><br>
                <p>Sorry, but we are all sold out for our latest product!</p>
                <p>Please visit us again for better products to come in the future, or look at the list below for products that were featured on Snatch in the past!</p>
            </div>
            <h2>We look forward to serving you in the future!</h2>
        </section>
        <section class="pass-coming-items-section">
            <ul class="tabs" data-tabs id="past-coming-items2">
                <li class="tabs-title is-active"><a href="#past-item2">What You've Missed Out!</a></li>
                <%--<li class="tabs-title"><a href="#coming-soon">Coming Soon</a></li>--%>
            </ul>
            <div class="tabs-content" data-tabs-content="past-coming-items2">
                <div class="tabs-panel is-active row small-up-2 medium-up-3 large-up-5" id="past-item2">
                    <%--<div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-medium"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>--%>
                </div>
                <%--<div class="tabs-panel row small-up-2 medium-up-3 large-up-5" id="coming-soon">
                    <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-medium"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                    <div class="column show-for-large"><img class="thumbnail" src="http://placehold.it/1920x1080"></div>
                </div>--%>
            </div>
        </section>
    </section>
    <div class="loader_wrapper" id="mainMenuLoader">
        <div class="loader"></div>
    </div>
</asp:Content>
