$(document).foundation();

var product_amount;
/* Values to be uploaded */
var product_name, product_price, discount_percentage, stock_quantity, starting_date, ending_date, product_description, img_main_image;
var lazada_url, elevenstreet_url, shopee_url;
var img_sub_image = [];
/* Boolean to make sure each input not empty or null */
var bool_product_name, bool_product_price, bool_discount_percentage, bool_stock_quantity, bool_starting_date, bool_ending_date, bool_product_description;
var bool_img_main_image, bool_img_sub_images = [], bool_img_sub_image;

$("#btn_upload_main_photo").click(function () {
    $('#upload_main_photo').click();
});

$("#btn_upload_sub_photo").click(function () {
    $('#upload_sub_photo').click();
});

$('#product_name').on("change", function (event) {
    product_name = $('#product_name').val();
    bool_product_name = verifyInput(product_name);
});

$('#product_price').on("change", function (event) {
    product_price = $('#product_price').val();
    bool_product_price = verifyInput(product_price);
});

$('#discount_percentage').on("change", function (event) {
    discount_percentage = $('#discount_percentage').val();
    bool_discount_percentage = verifyInput(discount_percentage);
});

$('#stock_quantity').on("change", function (event) {
    stock_quantity = $('#stock_quantity').val();
    bool_stock_quantity = verifyInput(stock_quantity);
});

$('#starting_date').on("change", function (event) {
    starting_date = $('#starting_date').val();
    bool_starting_date = verifyInput(starting_date);
});

$('#ending_date').on("change", function (event) {
    ending_date = $('#ending_date').val();
    bool_ending_date = verifyInput(ending_date);
});

$('#product_description').on("change", function (event) {
    product_description = $('#product_description').val();
    bool_product_description = verifyInput(product_description);
});

$('#upload_main_photo').on("change", function (event) {
    var imageUrl = "http://localhost:18153/temp/";
    var files;
    files = event.target.files;
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening
    var data = new FormData();

    var fileData = files[0];   // Getting the properties of file from file field

    // File upload data
    data.append("file", fileData); // Appending parameter named file
    data.append("group1", "PRODUCT_IMAGE");
    data.append("group2", "MAIN_IMAGE");
    data.append("option", "IMAGE");
    $.ajax({
        url: 'http://localhost:18153/upload/',
        type: "POST",
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function (result) {
            //console.log(JSON.stringify(result));
            img_main_image = result.data.file_name;
            bool_img_main_image = verifyInput(img_main_image);
            console.log(bool_img_main_image);
            var main_image_preview = document.getElementsByClassName('main_image_preview');
            var img = document.createElement('img');
            img.className = 'thumbnail img_main_image_preview';
            img.src = 'http://localhost:18153/data/img/product/' + img_main_image;

            var p = document.createElement('p');
            p.innerHTML = 'Main Image Preview';

            $('.main_image_preview').empty();
            main_image_preview[0].appendChild(p);
            main_image_preview[0].appendChild(img);
            main_image_preview[0].setAttribute("style", "display:block");
        },
        error: function (result) {
            alert("Please Try Again");
        },
    });
});

$('#upload_sub_photo').on("change", function (event) {
    var imageUrl = "http://localhost:18153/temp/";
    var files;
    files = event.target.files;
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    var fileData = files;   // Getting the properties of file from file field

    var p = document.createElement('p');
    p.innerHTML = 'Sub-Image Preview';

    $('.sub_image_preview').empty();
    $('.sub_image_preview').append(p);

    function ProcessNextSubImage(counter) {
        if (counter < fileData.length) {
            var data = new FormData();
            data.append("file", fileData[counter]); // Appending parameter named file
            data.append("group1", "PRODUCT_IMAGE");
            data.append("group2", "SUB_IMAGE");
            data.append("option", "IMAGE");
            $.ajax({
                url: 'http://localhost:18153/upload/',
                type: "POST",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function (result) {
                    //console.log(JSON.stringify(result));

                    img_sub_image[counter] = result.data.file_name;
                    bool_img_sub_images[counter] = verifyInput(img_sub_image[counter]);
                    var sub_image_preview = document.getElementsByClassName('sub_image_preview');
                    var img = document.createElement('img');
                    var div = document.createElement('div');

                    img.className = 'thumbnail img_sub_image_preview';
                    img.src = 'http://localhost:18153/data/img/product/' + img_sub_image[counter];
                    div.className = 'column';
                    div.append(img);

                    sub_image_preview[0].appendChild(div);
                    sub_image_preview[0].setAttribute("style", "display:block");
                    
                    counter++;
                    ProcessNextSubImage(counter);

                },
                error: function (result) {
                    alert("Please Try Again");
                },
            });
        } else {
            return;
        }
    }

    ProcessNextSubImage(0);

    if (verifySubImage(bool_img_sub_images) == false) {
        bool_img_sub_image = false;
    } else {
        bool_img_sub_image = true;
    }
    console.log(bool_img_sub_image);
});

$('#lazada_url').on("change", function () {
    var target = $('#lazada_url').val();
    var key = "5974b30610faf47c94ffab020ad49d6fb8b48923da769";
    $.ajax({
        url: "http://api.linkpreview.net",
        dataType: 'jsonp',
        data: { q: target, key: key },
        beforeSend: function () {
            $("#lazada_url_preview_loading").css('display', "block");
        },
        success: function (response) {
            //console.log(response);
            lazada_url = JSON.stringify(response);
            $("#lazada_url_preview_loading").css('display', "none");
            $('#lazada_url_preview').empty();

            var div_media_object = document.createElement('div');
            div_media_object.className = 'media-object';

            var div_media_object_section_1 = document.createElement('div');
            div_media_object_section_1.className = 'media-object-section';
            var a_image = document.createElement('a');
            var div_link_preview_image = document.createElement('div');
            a_image.href = response.url;
            div_link_preview_image.className = 'thumbnail link_preview_image';
            div_link_preview_image.style = 'background-image:url("' + response.image + '")';
            a_image.appendChild(div_link_preview_image);
            div_media_object_section_1.appendChild(a_image);

            var div_media_object_section_2 = document.createElement('div');
            div_media_object_section_2.className = 'media-object-section';
            var a_desc = document.createElement('a');
            a_desc.href = response.url;
            var div_link_section = document.createElement('div');
            div_link_section.className = 'thumbnail link_section';
            var p_link_preview_title = document.createElement('p');
            p_link_preview_title.className = 'link_preview_title';
            var strong_link_preview_title = document.createElement('strong');
            strong_link_preview_title.innerHTML = response.title;
            var div_ink_preview_description_wrapper = document.createElement('div');
            div_ink_preview_description_wrapper.className = 'link_preview_description_wrapper';
            var p_link_preview_description = document.createElement('p');
            p_link_preview_description.className = 'link_preview_description';
            p_link_preview_description.innerHTML = response.description;
            div_ink_preview_description_wrapper.appendChild(p_link_preview_description);
            p_link_preview_title.appendChild(strong_link_preview_title);
            div_link_section.appendChild(p_link_preview_title);
            div_link_section.appendChild(div_ink_preview_description_wrapper);
            a_desc.appendChild(div_link_section);
            div_media_object_section_2.appendChild(a_desc);

            div_media_object.appendChild(div_media_object_section_1);
            div_media_object.appendChild(div_media_object_section_2);
            $('#lazada_url_preview').append(div_media_object);
            $('#lazada_url_preview').css('display', 'block');
        }
    });
});

$('#elevenstreet_url').on("change", function () {
    var target = $('#elevenstreet_url').val();
    var key = "5974b30610faf47c94ffab020ad49d6fb8b48923da769";
    $.ajax({
        url: "http://api.linkpreview.net",
        dataType: 'jsonp',
        data: { q: target, key: key },
        beforeSend: function () {
            $("#elevenstreet_url_preview_loading").css('display', "block");
        },
        success: function (response) {
            //console.log(response);
            elevenstreet_url = JSON.stringify(response);
            $("#elevenstreet_url_preview_loading").css('display', "none");
            $('#elevenstreet_url_preview').empty();

            var div_media_object = document.createElement('div');
            div_media_object.className = 'media-object';

            var div_media_object_section_1 = document.createElement('div');
            div_media_object_section_1.className = 'media-object-section';
            var a_image = document.createElement('a');
            var div_link_preview_image = document.createElement('div');
            a_image.href = response.url;
            div_link_preview_image.className = 'thumbnail link_preview_image';
            div_link_preview_image.style = 'background-image:url("' + response.image + '")';
            a_image.appendChild(div_link_preview_image);
            div_media_object_section_1.appendChild(a_image);

            var div_media_object_section_2 = document.createElement('div');
            div_media_object_section_2.className = 'media-object-section';
            var a_desc = document.createElement('a');
            a_desc.href = response.url;
            var div_link_section = document.createElement('div');
            div_link_section.className = 'thumbnail link_section';
            var p_link_preview_title = document.createElement('p');
            p_link_preview_title.className = 'link_preview_title';
            var strong_link_preview_title = document.createElement('strong');
            strong_link_preview_title.innerHTML = response.title;
            var div_ink_preview_description_wrapper = document.createElement('div');
            div_ink_preview_description_wrapper.className = 'link_preview_description_wrapper';
            var p_link_preview_description = document.createElement('p');
            p_link_preview_description.className = 'link_preview_description';
            p_link_preview_description.innerHTML = response.description;
            div_ink_preview_description_wrapper.appendChild(p_link_preview_description);
            p_link_preview_title.appendChild(strong_link_preview_title);
            div_link_section.appendChild(p_link_preview_title);
            div_link_section.appendChild(div_ink_preview_description_wrapper);
            a_desc.appendChild(div_link_section);
            div_media_object_section_2.appendChild(a_desc);

            div_media_object.appendChild(div_media_object_section_1);
            div_media_object.appendChild(div_media_object_section_2);
            $('#elevenstreet_url_preview').append(div_media_object);
            $('#elevenstreet_url_preview').css('display', 'block');
        }
    });
});

$('#shopee_url').on("change", function () {
    var target = $('#shopee_url').val();
    var key = "5974b30610faf47c94ffab020ad49d6fb8b48923da769";
    $.ajax({
        url: "http://api.linkpreview.net",
        dataType: 'jsonp',
        data: { q: target, key: key },
        beforeSend: function () {
            $("#shopee_url_preview_loading").css('display', "block");
        },
        success: function (response) {
            //console.log(response);
            shopee_url = JSON.stringify(response);
            $("#shopee_url_preview_loading").css('display', "none");
            $('#shopee_url_preview').empty();

            var div_media_object = document.createElement('div');
            div_media_object.className = 'media-object';

            var div_media_object_section_1 = document.createElement('div');
            div_media_object_section_1.className = 'media-object-section';
            var a_image = document.createElement('a');
            var div_link_preview_image = document.createElement('div');
            a_image.href = response.url;
            div_link_preview_image.className = 'thumbnail link_preview_image';
            div_link_preview_image.style = 'background-image:url("' + response.image + '")';
            a_image.appendChild(div_link_preview_image);
            div_media_object_section_1.appendChild(a_image);

            var div_media_object_section_2 = document.createElement('div');
            div_media_object_section_2.className = 'media-object-section';
            var a_desc = document.createElement('a');
            a_desc.href = response.url;
            var div_link_section = document.createElement('div');
            div_link_section.className = 'thumbnail link_section';
            var p_link_preview_title = document.createElement('p');
            p_link_preview_title.className = 'link_preview_title';
            var strong_link_preview_title = document.createElement('strong');
            strong_link_preview_title.innerHTML = response.title;
            var div_ink_preview_description_wrapper = document.createElement('div');
            div_ink_preview_description_wrapper.className = 'link_preview_description_wrapper';
            var p_link_preview_description = document.createElement('p');
            p_link_preview_description.className = 'link_preview_description';
            p_link_preview_description.innerHTML = response.description;
            div_ink_preview_description_wrapper.appendChild(p_link_preview_description);
            p_link_preview_title.appendChild(strong_link_preview_title);
            div_link_section.appendChild(p_link_preview_title);
            div_link_section.appendChild(div_ink_preview_description_wrapper);
            a_desc.appendChild(div_link_section);
            div_media_object_section_2.appendChild(a_desc);

            div_media_object.appendChild(div_media_object_section_1);
            div_media_object.appendChild(div_media_object_section_2);
            $('#shopee_url_preview').append(div_media_object);
            $('#shopee_url_preview').css('display', 'block');
        }
    });
});

function verifyInput(input) {
    if (input != "" && input != null) {
        return true;
    } else {
        return false;
    }
}

function verifySubImage(input) {
    for (var i = 0; i < input.length; i++) {
        if (input[i] == false) {
            return false;
        }
    }
}

function uploadProduct() {
    if (bool_product_name && bool_product_price && bool_discount_percentage && bool_stock_quantity && bool_starting_date && bool_ending_date && bool_product_description && bool_img_main_image && bool_img_sub_image) {
        jom.ajax({
            url: jom.apiUrl + "product/upload-product",
            data: {
                product_pk: product_amount+1,
                product_name: product_name,
                product_price: product_price,
                discount_percentage: discount_percentage,
                stock_quantity: stock_quantity,
                starting_date: starting_date,
                ending_date: ending_date,
                product_description: product_description,
                lazada_url: lazada_url,
                elevenstreet_url: elevenstreet_url,
                shopee_url: shopee_url
            },
            beforeSend:function(){
                $('#upload_loader').css('display', 'block');
            },
            success: function (result) {
                console.log("Product Uploading...");
                jom.ajax({
                    url: jom.apiUrl + "product/upload-product-image",
                    data: {
                        product_pk: product_amount + 1,
                        img_main_image: img_main_image,
                        img_sub_image: img_sub_image,
                    },
                    success: function (result) {
                        alert("Product Successfully Uploaded!");
                    },
                    fail: function (result) {
                        alert("Product Upload Failed while uploading image!");
                    }
                });
                $('#upload_loader').css('display', 'none');
            },
            fail: function (result) {
                alert("Product Upload Failed!");
            }
        });
    } else {
        alert("Please Ensure All Data Is Submit Properly!");
    }
}


var selected_order_id, selected_order_amount, selected_product_pk;
var selected_status,selected_status_final;
var product_to_delete;

$(document).ready(function () {
	var username = localStorage.getItem("username");
    var admin_token = localStorage.getItem("admin_access_token");

	if (admin_token != null && admin_token != "") {
        jom.ajax({
            url: jom.apiUrl + "security/admin-refresh-time-or-remove-access-token",
            data: {
                admin_token: admin_token,
            },
            success: function (result) {
                //display username
                var h4_username = document.createElement('h4');
                h4_username.innerHTML = "Welcome back! " + username + "!";
                $('.admin-header .username').append(h4_username);
			},
			fail:function(){
				alert("Access time expired!");
                localStorage.removeItem("username");
                localStorage.removeItem("admin_access_token");
                window.location.href = "Admin.aspx";
			}
		});
	}else {
        //no token lead back admin.aspx
        alert("Access time expired!");
        localStorage.removeItem("username");
        localStorage.removeItem("admin_access_token");
        window.location.href = "Admin.aspx";
    }
    jom.ajax({
        url: jom.apiUrl + "product/get-product-amount",
        success: function (result) {
            var total_product = result.data;
    

            product_amount = total_product[0].total_product;
        },
        fail: function (result) {
            console.log("Category retrieve failed!");
        }
    });
    

    jom.ajax({
        url: jom.apiUrl + "order/admin-display-order",
        success: function (result) {
            var order_detail = result.data;
                

            console.log(order_detail);

            for (var i = 0; i < order_detail.length; i++) {
                var tr_row = document.createElement('tr');
                

                
                var td_status = document.createElement('td');
                var button_status = document.createElement('button');
                var p_status = document.createElement('p');
                p_status.style = 'display:none';
                button_status.id = order_detail[i].order_id_pk + '-' + order_detail[i].order_amount + '-' + order_detail[i].product_id_fk;
                button_status.type = 'button';
                if (order_detail[i].order_status == 'Pending') {
                    button_status.setAttribute('data-open', 'changeOrderStatus');
                    button_status.className = 'button status_button secondary';
                    button_status.innerHTML = 'Pending';
                    p_status.innerHTML = 'b';
                } else if (order_detail[i].order_status == 'Waiting For Approval') {
                    button_status.setAttribute('data-open', 'changeOrderStatus');
                    button_status.className = 'button status_button warning';
                    button_status.innerHTML = 'Waiting For Approval';
                    p_status.innerHTML = 'a';
                } else if (order_detail[i].order_status == 'Rejected') {
                    button_status.setAttribute('data-open', 'changeOrderStatus');
                    button_status.className = 'button status_button falert';
                    button_status.innerHTML = 'Rejected';
                    p_status.innerHTML = 'c';
                } else if (order_detail[i].order_status == 'Approved') {
                    button_status.className = 'button status_button success disabled';
                    button_status.innerHTML = 'Approved';
                    p_status.innerHTML = 'd';
                }
                td_status.appendChild(p_status);
                td_status.appendChild(button_status);

                var td_order_id = document.createElement('td');
                td_order_id.innerHTML = order_detail[i].order_id_pk;


                var td_product_name = document.createElement('td');
                td_product_name.innerHTML = order_detail[i].product_name;
                            

                var td_purchase_amount = document.createElement('td');
                td_purchase_amount.innerHTML = order_detail[i].order_amount;

                var td_payment_method = document.createElement('td');
                td_payment_method.innerHTML = order_detail[i].payment_method;

                var td_receipt = document.createElement('td');
                if (order_detail[i].bank_receipt != null) {
                    var a_receipt = document.createElement('a');
                    a_receipt.type = 'button';
                    a_receipt.innerHTML = 'View Bank In Proof';
                    a_receipt.className = 'button';
                    //a_receipt.innerHTML = order_detail[i].bank_receipt;
                    a_receipt.href = 'http://localhost:18153/data/bankinproof/' + order_detail[i].bank_receipt;
                    a_receipt.target = '_blank';
                    td_receipt.appendChild(a_receipt);
                } else {
                    var p_receipt = document.createElement('p');
                    p_receipt.innerHTML = 'No receipt uploaded.';
                    td_receipt.appendChild(p_receipt);
                }

               
                var td_total_payment = document.createElement('td');
                td_total_payment.innerHTML = Number(order_detail[i].total_payment).toFixed(2);
                
                var td_name = document.createElement('td');
                td_name.innerHTML = order_detail[i].mailing_recipient;
                            

                var td_address = document.createElement('td');
                td_address.innerHTML = order_detail[i].mailing_address;

                var td_phone = document.createElement('td');
                td_phone.innerHTML = order_detail[i].mailing_phone_no;;

                tr_row.appendChild(td_status);
                tr_row.appendChild(td_order_id);
                tr_row.appendChild(td_product_name);
                tr_row.appendChild(td_purchase_amount);
                tr_row.appendChild(td_payment_method);
                tr_row.appendChild(td_receipt);
                tr_row.appendChild(td_total_payment);
                tr_row.appendChild(td_name);
                tr_row.appendChild(td_address);
                tr_row.appendChild(td_phone);

               
                            

                $('#customer_order_table').append(tr_row);
                $("#customer_order_loader").css('display', "none");
            }
        },
        fail: function (result) {
            Console.log('Order Data Retrieve Failed!');
            $("#customer_order_loader").css('display', "none");
        }
    });

    jom.ajax({
        url: jom.apiUrl + "product/admin-get-product",
        success: function (result) {
            var product_detail = result.data;

            console.log(product_detail);
            
            for (var i = 0; i < product_detail.length; i++) {
                var tr_row = document.createElement('tr');

                var td_delete = document.createElement('td');
                var button_delete = document.createElement('button');
                var p_delete = document.createElement('p');
                p_delete.style = 'display:none';
                button_delete.id = product_detail[i].product_id_pk;
                button_delete.type = 'button';
                if (product_detail[i].is_delete == 0) {
                    button_delete.setAttribute('data-open', 'deleteProduct');
                    button_delete.className = 'button delete_button falert';
                    button_delete.innerHTML = 'Delete';
                    p_delete.innerHTML = 'a';
                } else if (product_detail[i].is_delete == 1) {
                    button_delete.className = 'button delete_button secondary disabled';
                    button_delete.innerHTML = 'Deleted Product';
                    p_delete.innerHTML = 'b';
                }
                td_delete.appendChild(p_delete);
                td_delete.appendChild(button_delete);

                var td_product_id = document.createElement('td');
                td_product_id.innerHTML = product_detail[i].product_id_pk;

                var td_product_name = document.createElement('td');
                td_product_name.innerHTML = product_detail[i].product_name;

                var td_stock_quantity = document.createElement('td');
                td_stock_quantity.innerHTML = product_detail[i].stock_quantity;

                var td_remaining_quantity = document.createElement('td');
                td_remaining_quantity.innerHTML = product_detail[i].remaining_quantity;

                var td_starting_date = document.createElement('td');
                var start_date = new Date(product_detail[i].starting_date);
                td_starting_date.innerHTML = start_date.toLocaleString();

                var td_expiring_date = document.createElement('td');
                var end_date = new Date(product_detail[i].expiring_date);
                td_expiring_date.innerHTML = end_date.toLocaleString();

                var td_price = document.createElement('td');
                td_price.innerHTML = Number(product_detail[i].price).toFixed(2);

                var td_discount_percent = document.createElement('td');
                td_discount_percent.innerHTML = product_detail[i].discount_percent;

                tr_row.appendChild(td_delete);
                tr_row.appendChild(td_product_id);
                tr_row.appendChild(td_product_name);
                tr_row.appendChild(td_stock_quantity);
                tr_row.appendChild(td_remaining_quantity);
                tr_row.appendChild(td_starting_date);
                tr_row.appendChild(td_expiring_date);
                tr_row.appendChild(td_price);
                tr_row.appendChild(td_discount_percent);

                $('#product_table').append(tr_row);
                $("#product_table_loader").css('display', "none");
            }
        },
        fail: function (result) {
            Console.log('Order Data Retrieve Failed!');
            $("#product_table_loader").css('display', "none");
        }
    });

    $(document).delegate('.delete_button', 'click', function () {
        product_to_delete = $(this).attr('id');
        console.log(product_to_delete);
    });

    $(document).delegate('.status_button', 'click', function () {
        var temp_id_var = $(this).attr('id');
        var abc = temp_id_var.split('-');
        selected_order_id = abc[0];
        selected_order_amount = abc[1];
        selected_product_pk = abc[2];
        console.log(selected_order_id);
        console.log(selected_order_amount);
        console.log(selected_product_pk);
    });

    $('#change_status_selector').on('change', function () {
        selected_status = $('#change_status_selector').val();
        switch (selected_status) {
            case 'pending': selected_status_final = 'Pending'; break;
            case 'waiting': selected_status_final = 'Waiting For Approval'; break;
            case 'reject': selected_status_final = 'Rejected'; break;
            case 'approve': selected_status_final = 'Approved'; break;
        }
        console.log(selected_status_final);
    });


    $('.btn_change_status').on('click', function () {
        if (selected_status_final == 'Approved') {
            jom.ajax({
                url: jom.apiUrl + "order/adminApproveOrder",
                data: {
                    order_id_pk: selected_order_id,
                    status: selected_status_final,
                    order_amount: selected_order_amount,
                    product_id_fk: selected_product_pk
                },
                success: function (result) {
                    if (result.isSuccess) {
                        location.reload(true);

                        console.log('success');
                    }
                },
                fail: function (result) {
                    //console.log('Error: failed to update payment method!');
                    alert('Error: failed to update order status!');
                    location.reload(true);
                }
            });
        } else {
            jom.ajax({
                url: jom.apiUrl + "order/adminChangeOrderStatus",
                data: {
                    order_id_pk: selected_order_id,
                    status: selected_status_final
                },
                success: function (result) {
                    if (result.isSuccess) {
                        location.reload(true);

                        console.log('success');
                    }
                },
                fail: function (result) {
                    //console.log('Error: failed to update payment method!');
                    alert('Error: failed to update order status!');
                    location.reload(true);
                }
            });
        }
    });

    $('.btn_delete_product').on('click', function () {
        jom.ajax({
            url: jom.apiUrl + "product/deleteProduct",
            data: {
                product_id_fk: product_to_delete
            },
            success: function (result) {
                if (result.isSuccess) {
                    location.reload(true);

                    console.log('success');
                }
            },
            fail: function (result) {
               
                //console.log('Error: failed to update payment method!');
                alert('Error: failed to delete product!');
                location.reload(true);
                
            }
        });
    });
});

function filterOrder() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customer_order_table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterProduct() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("product_myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("product_table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("customer_order_table");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++; 
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortProductTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("product_table");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1) ; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function adminlogout() {
    var admin_token = localStorage.getItem("admin_access_token");
    jom.ajax({
        url: jom.apiUrl + "security/admin-logout",
        data: {
            admin_token: admin_token,
        },
        success: function (result) {
            localStorage.removeItem("username");
            localStorage.removeItem("admin_access_token");
            window.location.href = "Admin.aspx";
        },
        fail: function (result) {
            localStorage.removeItem("username");
            localStorage.removeItem("admin_access_token");
            window.location.href = "Admin.aspx";
        }
    });
}