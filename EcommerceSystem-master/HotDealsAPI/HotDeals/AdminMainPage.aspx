<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminMainPage.aspx.cs" Inherits="HotDeals.AdminMainPage1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>HotDeals - Admin Page</title>
    <link rel="stylesheet" href="Content/font-awesome.min.css" />
    <link rel="stylesheet" href="Content/icons/foundation-icons.css" />
    <link rel="stylesheet" href="Content/foundation.min.css" />
    <link rel="stylesheet" href="Content/app.css" />
    <link rel="stylesheet" href="Content/AdminMainPage.css" />
</head>
<body class="body-content">
    <section class="admin-header">
        <a href="MainMenu.aspx"><img src="img/office-cart-logo-grey.png" /></a>
        <input type="button" class="pull-right" value="Logout" onclick="adminlogout()" />
        <p class="username"></p>
    </section>
    <section class="admin-main-content">
        <div>
            <ul class="tabs" data-tabs data-active-collapse="true" id="main-section-tabs">
                <li class="tabs-title is-active"><a href="#home" aria-selected="true">Home</a></li>
                <li class="tabs-title"><a href="#upload_product_tab">Upload Product</a></li>
                <li class="tabs-title"><a href="#customer_order">Customer Orders</a></li>
                <li class="tabs-title"><a href="#product_list">Product List</a></li>
            </ul>
        </div>
        <div class="">
            <div class="tabs-content" data-tabs-content="main-section-tabs">
                <div class="tabs-panel is-active" id="home">
                    <div><h1>Welcome To Admin Page</h1></div>
                </div>
                <div class="tabs-panel" id="upload_product_tab">
                    <div class="row basic_product_information_section">
                        <h3>Product Information</h3>
                        <div class="small-6">
                            <label>Product Name:</label>
                            <input id="product_name" type="text" placeholder="Name for the product"/>
                            <label>Product Original Price:</label>
                            <div class="input-group">
                                <span class="input-group-label">RM</span>
                                <input id="product_price" class="input-group-field" type="text" placeholder="Original Price For The Product"/>
                            </div>
                            <label>Discount Percentage (0-100):</label>
                            <div class="input-group">
                                <input id="discount_percentage" class="input-group-field" type="number" min="0" max="100"/>
                                <span class="input-group-label">%</span>
                            </div>
                            <p class="help-text">i.e. 30 means discount 30% </p>
                            <label>Stock Quantity:</label>
                            <input id="stock_quantity" type="number"/>
                            <label>Starting Date & Time</label>
                            <input id="starting_date" type="datetime-local"/>
                            <label>Ending Date & Time</label>
                            <input id="ending_date" type="datetime-local"/>
                            <label>Product Description:</label>
                            <textarea id="product_description" placeholder="Description For The Product"></textarea>
                            <p class="help-text">Use <code>&lt;br /&gt;</code> to represent line break </p>
                            <p class="help-text">i.e. Tech Specs &lt;br /&gt; Approximate weight: 133 g </p>
                            <p class="help-text">will results in</p>
                            <p class="help-text">Tech Specs <br /> Approximate weight: 133 g</p>
                        </div>
                    </div>
                    <div class="product_main_image_section">
                        <h3>Product Main Image</h3>
                        <p>Main image for the product.</p>
                        <p>Will be selected when only one picture can be selected.</p>
                        <input id="upload_main_photo" type="file" accept="image/*" style="display:none"/>
                        <button id="btn_upload_main_photo" class="button" type="button">Press Me to Upload <strong>ONE</strong> Main Image</button>
                        <p class="help-text"><strong>Image Should be in 1920x1080 (16:9 aspect ratio)</strong></p>
                        <div class="main_image_preview">
                            <%--<p>Main Image Preview</p>--%>
                            <%--<img class="thumbnail img_main_image_preview" src="http://localhost:18153/data/img/product/Razer_1.png"/>--%>
                        </div>
                    </div>
                    <div class="product_sub_image_section">
                        <h3>Product Sub-Images</h3>
                        <p>Sub-images for the product.</p>
                        <p>All images for the product EXCEPT main image.</p>
                        <input id="upload_sub_photo" type="file" accept="image/*" style="display:none" multiple/>
                        <button id="btn_upload_sub_photo" class="button" type="button">Press Me to Upload <strong>MULTIPLE</strong> Sub-Images</button>
                        <p class="help-text"><strong>Image Should be in 1920x1080 (16:9 aspect ratio)</strong></p>
                        <div class="sub_image_preview row small-up-6 medium-up-6 large-up-6">
                            <p>Sub-Images Preview</p>
                            <%--<img class="thumbnail img_main_image_preview" src="http://localhost:18153/data/img/product/Razer_1.png"/>--%>
                        </div>
                    </div>
                    <div class="competitor_link_section">
                        <h3>Price Comparison</h3>
                        <p>Search for this product at these few websites.</p>
                        <p>Copy and paste the complete url.</p>
                        <label>Lazada:</label>
                        <input id="lazada_url" type="text" placeholder="URL for this product in Lazada"/>
                        <p class="help-text"><strong>i.e. http://www.lazada.com.my/this-product</strong></p>
                        <label id="lazada_url_preview_loading">Loading Preview...</label>
                        <div id="lazada_url_preview" class="preview_link">
                            
                        </div>
                        <label>11street:</label>
                        <input id="elevenstreet_url" type="text" placeholder="URL for this product in 11street"/>
                        <p class="help-text"><strong>i.e. http://www.11street.my/productdetail/this-product</strong></p>
                        <label id="elevenstreet_url_preview_loading">Loading Preview...</label>
                        <div id="elevenstreet_url_preview" class="preview_link">
                            
                        </div>
                        <label>Shopee:</label>
                        <input id="shopee_url" type="text" placeholder="URL for this product in Shopee"/>
                        <p class="help-text"><strong>i.e. https://shopee.com.my/this-product</strong></p>
                        <label id="shopee_url_preview_loading">Loading Preview...</label>
                        <div id="shopee_url_preview" class="preview_link">
                            
                        </div>
                    </div>
                    <button class="button" type="button" onclick="uploadProduct()">Upload Product</button>
                    <div class="loader_wrapper" id="upload_loader">
                        <div class="loader"></div>
                    </div>
                </div>
                <div class="tabs-panel" id="customer_order">
                    <h3>Customer Order</h3>
                    <p>Press status button for each order to change order status</p>
                    <div class="loader_wrapper" id="customer_order_loader">
                        <div class="loader"></div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-label"><i class="fi-magnifying-glass"></i></span>
                        <input class="input-group-field" type="text" id="myInput" onkeyup="filterOrder()" placeholder="Search for Order ID.."/>
                    </div>
                    <div class="table-scroll">
                        <table id="customer_order_table">
                            <tr>
                                <th onclick="sortTable(0)"><label>Status</label></th>
                                <th onclick="sortTable(1)"><label>Order ID</label></th>
                                <th onclick="sortTable(2)"><label>Product</label></th>
                                <th onclick="sortTable(3)"><label>Amount</label></th>
                                <th onclick="sortTable(4)"><label>Payment Method</label></th>
                                <th onclick="sortTable(5)"><label>Receipt</label></th>
                                <th><label>Total Payment Required (RM)</label></th>
                                <th onclick="sortTable(7)"><label>Name</label></th>
                                <th onclick="sortTable(8)"><label>Address</label></th>
                                <th onclick="sortTable(9)"><label>Phone</label></th>
                            </tr>
                        </table>
                    </div>
                    <div class="reveal confirmation_popup" id="changeOrderStatus" data-reveal>
                        <h6>Choose the order status want to change to</h6>
                        <select id="change_status_selector">
                            <option selected disabled hidden style='display: none' value=''></option>
                            <option value="pending">Pending</option>
                            <option value="waiting">Waiting For Approval</option>
                            <option value="reject">Rejected</option>
                            <option value="approve">Approved</option>
                        </select>
                        <div class="button-group expanded">
                            <button class="button btn_change_status" type="button">Change Status</button>
                            <button class="button" type="button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="tabs-panel" id="product_list">
                    <h3>Product List</h3>
                    <p>To update product info, upload it again, and delete the old one here</p>
                    <div class="loader_wrapper" id="product_table_loader">
                        <div class="loader"></div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-label"><i class="fi-magnifying-glass"></i></span>
                        <input class="input-group-field" type="text" id="product_myInput" onkeyup="filterProduct()" placeholder="Search for Product ID.."/>
                    </div>
                    <div class="table-scroll">
                        <table id="product_table">
                            <tr>
                                <th onclick="sortProductTable(0)"><label>Delete</label></th>
                                <th onclick="sortProductTable(1)"><label>Product ID</label></th>
                                <th onclick="sortProductTable(2)"><label>Product Name</label></th>
                                <th onclick="sortProductTable(3)"><label>Stock Quantity</label></th>
                                <th onclick="sortProductTable(4)"><label>Remaining Quantity</label></th>
                                <th onclick="sortProductTable(5)"><label>Start Date</label></th>
                                <th onclick="sortProductTable(6)"><label>Expiry Date</label></th>
                                <th onclick="sortProductTable(7)"><label>Price (RM)</label></th>
                                <th onclick="sortProductTable(8)"><label>Discount Percent</label></th>
                            </tr>
                        </table>
                    </div>
                    <div class="reveal confirmation_popup" id="deleteProduct" data-reveal>
                        <h6>Are you sure you want to delete this product?</h6>
                        <p class="help-text">This product will be deleted FOREVER</p>
                        <div class="button-group expanded">
                            <button class="button btn_delete_product" type="button">Delete</button>
                            <button class="button" type="button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="Scripts/jom.js"></script>
<script type="text/javascript">
    jom.apiUrl = "<%= HotDeals.Config.Url_RemoteApi  %>";
    jom.isDebug = <%= HotDeals.Config.IsDebug.ToString().ToLower() %>;
</script>
<script src="Scripts/vendor/what-input.js"></script>
<script src="Scripts/vendor/foundation.js"></script>
<script src="Scripts/AdminMainPage.js"></script>
</body>
</html>
