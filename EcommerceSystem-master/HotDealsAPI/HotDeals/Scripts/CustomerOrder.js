var client_token = localStorage.getItem("access_token");
var fileName;
var selected_order_id;
$(document).ready(function () {
    if (client_token == null || client_token == "") {
        alert('Please Login to continue');
        window.location.assign('SignIn.aspx');
    } else {
        jom.ajax({
            url: jom.apiUrl + "order/customer-display-order",
            data: {
                client_token: client_token
            },
            success: function (result) {
                var order_info_list = result.data;
                if (order_info_list.length > 0) {

                    for (var i = 0; i < order_info_list.length; i++) {
                        var div_media_object = document.createElement('div');
                        div_media_object.className = 'media-object column row';
                        
                        /*First Column*/
                        var div_first_column = document.createElement('div');
                        div_first_column.className = 'column small-12 medium-6 large-4';
                        var div_thumbnail = document.createElement('div');
                        var img_thumbnail = document.createElement('img');
                        var p_order_date = document.createElement('p');
                        var order_date = new Date(order_info_list[i].order_date);
                        var options = {
                            weekday: "long", year: "numeric", month: "short",
                            day: "numeric", hour: "2-digit", minute: "2-digit"
                        };

                        div_thumbnail.className = 'thumbnail';
                        img_thumbnail.src = 'http://localhost:18153/data/img/product/' + order_info_list[i].image_url;
                        p_order_date.innerHTML = 'Order Date: ' + order_date.toLocaleTimeString("en-us", options);
                        div_thumbnail.appendChild(img_thumbnail);
                        div_first_column.appendChild(div_thumbnail);
                        div_first_column.appendChild(p_order_date);

                        /*Second Column*/
                        var div_second_column = document.createElement('div');
                        div_second_column.className = 'column small-12 medium-6 large-4';
                        var div_info_section = document.createElement('div');
                        div_info_section.className = 'info_section';

                        var h4_order_id = document.createElement('h4');
                        var p_product_name = document.createElement('p');
                        var p_amount = document.createElement('p');
                        var p_total_amount = document.createElement('p');
                        var p_status = document.createElement('p');

                        h4_order_id.innerHTML = 'Order ID: ' + order_info_list[i].order_id_pk;
                        p_product_name.innerHTML = 'Product Name: ' + order_info_list[i].product_name;
                        p_amount.innerHTML = 'Amount: ' + order_info_list[i].order_amount;
                        p_total_amount.innerHTML = 'Total Payment Amount: RM' + Number(order_info_list[i].total_payment).toFixed(2);

                        if (order_info_list[i].order_status != 'Approved')
                            p_status.innerHTML = 'Status: <b>' + order_info_list[i].order_status + '</b>';
                        else
                            p_status.innerHTML = 'Status: <b>' + order_info_list[i].order_status + '</b>' + '<br/><i>*The item will be delivered within 24 hours</i>';

                        div_info_section.appendChild(h4_order_id);
                        div_info_section.appendChild(p_product_name);
                        div_info_section.appendChild(p_amount);
                        div_info_section.appendChild(p_total_amount);
                        div_info_section.appendChild(p_status);
                        div_second_column.appendChild(div_info_section);

                        /*Third Column*/
                        var div_third_column = document.createElement('div');
                        div_third_column.className = 'column small-12 medium-12 large-4';
                        var button_cod = document.createElement('button');
                        var button_upload = document.createElement('button');
                        var button_cancel = document.createElement('button');
                        button_cod.className = 'order_page_button button warning';
                        button_upload.className = 'order_page_button button warning';
                        button_cancel.className = 'order_page_button button falert';
                        button_cod.id = order_info_list[i].order_id_pk;
                        button_upload.id = order_info_list[i].order_id_pk;
                        button_cancel.id = order_info_list[i].order_id_pk;
                        button_cod.type = 'button';
                        button_cod.setAttribute('data-open', 'CODConfirm');
                        button_upload.type = 'button';
                        button_upload.setAttribute('data-open', 'UploadFileConfirm');
                        button_cancel.type = 'button';
                        button_cancel.setAttribute('data-open', 'CancelConfirm');
                        button_cod.innerHTML = 'Cash On Delivery';
                        button_upload.innerHTML = 'Upload Payment Proof';
                        button_cancel.innerHTML = 'Cancel Order';

                        var approved_icon = document.createElement('i');
                        approved_icon.className = 'fi-check status_icon';
                        approved_icon.id = 'approved_icon';

                        var rejected_icon = document.createElement('i');
                        rejected_icon.className = 'fi-x status_icon';
                        rejected_icon.id = 'rejected_icon';

                        if (order_info_list[i].order_status == 'Pending') {
                            div_third_column.appendChild(button_cod);
                            div_third_column.appendChild(button_upload);
                            div_third_column.appendChild(button_cancel);
                        } else if (order_info_list[i].order_status == 'Waiting For Approval') {
                            div_third_column.appendChild(button_cancel);
                        } else if (order_info_list[i].order_status == 'Rejected') {
                            div_third_column.appendChild(rejected_icon);
                        } else if (order_info_list[i].order_status == 'Approved') {
                            div_third_column.appendChild(approved_icon);
                        } else if (order_info_list[i].order_status == 'Canceled') {
                            div_third_column.appendChild(rejected_icon);
                        }

                        div_media_object.appendChild(div_first_column);
                        div_media_object.appendChild(div_second_column);
                        div_media_object.appendChild(div_third_column);

                        $('#customer_order_section').append(div_media_object);
                        $(".loader_wrapper").css('display', "none");
                    }
                } else {
                    $(".no_customer_order").css('display', "block");
                    $(".loader_wrapper").css('display', "none");
                }


            },
            fail: function (result) {
                console.log('order retrieve failed')
            }
        });

        $(document).delegate('.order_page_button', 'click', function () {
            selected_order_id = $(this).attr('id');
            console.log(selected_order_id);
        });

        $('.codButton').on('click', function () {
            console.log(selected_order_id);
            jom.ajax({
                url: jom.apiUrl + "order/customerCashOnDelivery",
                data: {
                    order_id_pk: selected_order_id,
                    client_token: client_token
                },
                success: function (result) {
                    if (result.isSuccess) {
                        location.reload(true);

                        console.log('success');
                    }
                },
                fail: function (result) {
                    //console.log('Error: failed to update payment method!');
                    alert('Error: failed to update payment method!');
                    location.reload(true);
                }
            });
        });

        $('.cancelButton').on('click', function () {
            console.log(selected_order_id);
            jom.ajax({
                url: jom.apiUrl + "order/customerCancelOrder",
                data: {
                    order_id_pk: selected_order_id,
                    client_token: client_token
                },
                success: function (result) {
                    if (result.isSuccess) {
                        location.reload(true);

                        console.log('success');
                    }
                },
                fail: function (result) {
                    //console.log('Error: failed to update payment method!');
                    alert('Error: failed to cancel order!');
                    location.reload(true);
                }
            });
        });

        $('#input_upload_bank_in').on("change", function (event) {
            var imageUrl = "http://localhost:18153/temp/";
            var files;
            files = event.target.files;
            event.stopPropagation(); // Stop stuff happening
            event.preventDefault(); // Totally stop stuff happening
            var data = new FormData();
            var sohai;
            var fileData = files[0];   // Getting the properties of file from file field

            // File upload data
            data.append("file", fileData); // Appending parameter named file
            data.append("group1", "BANKIN_PROOF");
            data.append("option", "FILE");
            $.ajax({
                url: 'http://localhost:18153/upload/',
                type: "POST",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                beforeSend: function () {
                    $('#uploaded_file_name').html("");
                    $('.btn_upload_bank_in').addClass('disabled');
                    $('.btn_upload_bank_in').removeAttr('onclick', 'UploadFile()');
                },
                success: function (result) {
                    if (result.isSuccess == true) {
                        fileName = result.data.file_name;
                        $('#uploaded_file_name').html(fileName);
                        $('.btn_upload_bank_in').removeClass('disabled');
                        $('.btn_upload_bank_in').attr('onclick','UploadFile()')
                    } else {
                        $('#uploaded_file_name').html(fileName);
                        $('.btn_upload_bank_in').addClass('disabled');
                        $('.btn_upload_bank_in').removeAttr('onclick', 'UploadFile()');
                    }
                    
                },
                fail:function(){
                    $('#uploaded_file_name').html(fileName);
                    $('.btn_upload_bank_in').addClass('disabled');
                    $('.btn_upload_bank_in').removeAttr('onclick', 'UploadFile()');
                },
                error: function (result) {
                    console.log('Please try Again');
                },
            });
        });

        
    }
});

function UploadFile() {
    if (fileName != null) {
        jom.ajax({
            url: jom.apiUrl + "order/customerUploadFile",
            data: {
                order_id_pk: selected_order_id,
                client_token: client_token,
                bank_receipt: fileName
            },
            success: function (result) {
                if (result.isSuccess) {
                    location.reload(true);

                    console.log('success');
                }
            },
            fail: function (result) {
                //console.log('Error: failed to update payment method!');
                alert('Error: Failed to Upload File!');
                location.reload(true);
            }
        });
    }
}