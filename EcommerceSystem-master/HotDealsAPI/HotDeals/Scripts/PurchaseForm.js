var product_id_pk, get_product_price, get_total_payment, get_product_name, get_product_image;
var client_token = localStorage.getItem("access_token");
var full_name = localStorage.getItem("full_name");

$(document).ready(function () {

    if (client_token == null || client_token == "") {
        alert('Please Login to continue');
        window.location.assign('SignIn.aspx');
    }

    document.getElementById("customername").disabled = true;
    document.getElementById("customername").value = full_name;
    document.getElementById("customername").style.color = "#333333";


    // This button will increment the value
    $('[data-quantity="plus"]').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(1);
        }
    });

    jom.ajax({
        url: jom.apiUrl + "product/get-product-purchase-form",
        success: function(result){
            var product = result.data;

            product_id_pk = product[0].product_id_pk;

            jom.ajax({
                url: jom.apiUrl + "product/get-product-main-image",
                data: {
                    product_fk: product_id_pk
                },
                success: function (result) {
                    var product_main_image = result.data;
                    console.log(product_id_pk);
                    console.log(product_main_image);
                    /*Product Image*/
                    var img_product = document.createElement('img');
                    get_product_image = product_main_image[0].image_url;
                    img_product.src = 'http://localhost:18153/data/img/product/' + get_product_image;
                    $('#product_image').append(img_product);
                },
                fail: function (result) {
                    console.log('Product Image Retrieve Failed!')
                }
            });

            /*Product Name*/
            var product_name = document.getElementById('product_name');
            get_product_name = product[0].product_name;
            product_name.innerHTML = get_product_name;

            /*Product Price*/
            var product_price = product[0].price;
            var original_price = document.getElementById('original_price');
            original_price.innerHTML = 'RM' + Number(product_price).toFixed(2);
            var product_discount_percent = product[0].discount_percent;
            var discount_price = document.getElementById('discount_price');
            
            get_product_price = Number(product_price / 100 * (100 - product_discount_percent)).toFixed(2);
            get_total_payment = (Number(get_product_price) + 5.00).toFixed(2);

            discount_price.innerHTML = 'RM' + get_product_price;

            var total_price = document.getElementById('total_price');
            var total_payment = document.getElementById('total_payment');
            total_payment.style.color = "#0d0d0d";

            total_price.innerHTML = 'RM' + get_product_price;
            total_payment.innerHTML = 'RM' + get_total_payment;

        },
        fail: function (result) {
            console.log('Product Retrieve Failed!')
        }
    });

    $('#order_amount').on('change', function () {
        $('#total_price').text('RM' + Number(get_product_price * $('#order_amount').val()).toFixed(2));
        $('#total_payment').text('RM' + (get_total_payment * $('#order_amount').val()).toFixed(2));
    });

    $('#order_amount').on('click', function () {
        $('#total_price').text('RM' + Number(get_product_price * $('#order_amount').val()).toFixed(2));
        $('#total_payment').text('RM' + (get_total_payment * $('#order_amount').val()).toFixed(2));
    });

    $('.plus-minus-button').on('click', function () {
        $('#total_price').text('RM' + Number(get_product_price * $('#order_amount').val()).toFixed(2));
        $('#total_payment').text('RM' + (get_total_payment * $('#order_amount').val()).toFixed(2));
    });
});

function placeorder() {
    if ($('#order_amount').val() != null && ($('#order_amount').val() >= 1) && (Number.isInteger(Number($('#order_amount').val())))) {
        if ($("#customername").val() != null && $("#mailing_phone_no").val() != null && $("#mailing_address").val() != null && $("#customername").val() != "" && $("#mailing_phone_no").val() != "" && $("#mailing_address").val() != "") {
            console.log($("#customername").val());
            console.log($("#mailing_phone_no").val());
            console.log($("#mailing_address").val());
            console.log($("#order_amount").val());
            console.log((get_total_payment * $('#order_amount').val()).toFixed(2));
            console.log(client_token);
            console.log(product_id_pk);
            console.log(get_product_name);
            console.log(get_product_image);


            jom.ajax({
                url: jom.apiUrl + "order/place-order",
                data: {
                    mailing_recipient: $("#customername").val(),
                    mailing_phone_no: $("#mailing_phone_no").val(),
                    mailing_address: $("#mailing_address").val(),
                    order_amount: $("#order_amount").val(),
                    total_payment: (get_total_payment * $('#order_amount').val()).toFixed(2),
                    client_token: client_token,
                    product_id_pk: product_id_pk,
                    get_product_name: get_product_name,
                    get_product_image: get_product_image
                },
                success: function (result) {
                    window.location.href = "CustomerOrder.aspx";
                },
                fail: function (result) {
                    alert("Place order failed!");
                    //location.reload(true);
                }
            });
        } else {
            alert('Please check your information');
        }
    } else {
        alert('Please check your order amount!')
    }
}