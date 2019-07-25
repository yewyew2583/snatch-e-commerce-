var client_token = localStorage.getItem("access_token");

$(document).ready(function () {
    var clock;
    jom.ajax({
        url: jom.apiUrl + "product/get-product",
        success: function (result) {
            var product_detail = result.data;

            console.log(product_detail);
            
            /*Display date
            var start_date = new Date(product_detail[0].starting_date);
            var start_date_full = start_date.getDate() + '/' + Number(start_date.getMonth() + 1) + '/' + start_date.getFullYear();
            var end_date = new Date(product_detail[0].expiring_date);
            var end_date_full = end_date.getDate() + '/' + Number(end_date.getMonth() + 1) + '/' + end_date.getFullYear();
            var date_display = document.getElementById('date_display');
            date_display.innerHTML = start_date_full + ' - ' + end_date_full;*/

            //var start_date = new Date(product_detail[0].starting_date);

            /*DISPLAY COUNTDOWN EXPIRE TIMER OF THE PRODUCT*/
            var end_date = new Date(product_detail[0].expiring_date);
            var current_date = new Date(product_detail[0].cur_date);
            
            var seconds_remaining = (end_date.getTime() / 1000) - (current_date.getTime() /1000);

            var clock;

            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
                callbacks: {
                    stop: function () {
                        $('.clock').html('The sales has expired!!')
                    }
                }
            });

            clock.setTime(seconds_remaining);
            clock.setCountdown(true);
            clock.start();

            /*Display Item Counter*/
            var item_counter = product_detail[0].remaining_quantity;
            var counter_class_name = 'p' + Math.ceil(product_detail[0].remaining_quantity / product_detail[0].stock_quantity * 100);
            var item_count = document.getElementById('item-count-group');
            for (var i = 0; i < 3; i++) {
                var div_c100 = document.createElement('div');
                var span_item_left = document.createElement('span');
                var div_slice = document.createElement('div');
                var div_bar = document.createElement('div');
                var div_fill = document.createElement('div');
                if (i == 0) {
                    div_c100.className = 'c100 ' + counter_class_name + ' big red item-count-big show-for-large hide-for-small';
                } else if (i == 1) {
                    div_c100.className = 'c100 ' + counter_class_name + ' red item-count-medium show-for-medium hide-for-large';
                } else if (i == 2) {
                    div_c100.className = 'c100 ' + counter_class_name + ' small red item-count-small show-for-small hide-for-medium';
                }
                span_item_left.innerHTML = item_counter + ' left';
                div_slice.className = 'slice';
                div_bar.className = 'bar';
                div_fill.className = 'fill';

                div_slice.appendChild(div_bar);
                div_slice.appendChild(div_fill);
                div_c100.appendChild(span_item_left);
                div_c100.appendChild(div_slice);
                $('#item-count-group').append(div_c100);
            }

            /*Display Image Tab*/
            jom.ajax({
                url: jom.apiUrl + "product/get-product-image",
                data: {
                    product_fk: product_detail[0].product_id_pk
                },
                success: function (result) {
                    var product_image = result.data;
                    for (var i = 0; i < product_image.length; i++) {
                        var div = document.createElement('div');
                        var img = document.createElement('img');
                        var selection_li = document.createElement('li');
                        var selection_a = document.createElement('a');
                        var selection_img = document.createElement('img');

                        if (i == 0) {
                            div.className = 'tabs-panel is-active';
                            div.id = 'image' + i;
                            img.className = 'thumbnail';
                            img.src = 'http://localhost:18153/data/img/product/' + product_image[i].image_url;

                            selection_li.className = 'tabs-title is-active';
                            selection_a.href = '#image' + i;
                            selection_img.src = 'http://localhost:18153/data/img/product/' + product_image[i].image_url;

                        }
                        else {
                            div.className = 'tabs-panel';
                            div.id = 'image' + i;
                            img.className = 'thumbnail';
                            img.src = 'http://localhost:18153/data/img/product/' + product_image[i].image_url;

                            selection_li.className = 'tabs-title';
                            selection_a.href = '#image' + i;
                            selection_img.src = 'http://localhost:18153/data/img/product/' + product_image[i].image_url;

                        }
                        div.appendChild(img);
                        selection_a.appendChild(selection_img);
                        selection_li.appendChild(selection_a);
                        $('.image_tab').append(div);
                        $('.image_tab_selection').append(selection_li);
                    }
                    var product_detail_image_tab = new Foundation.Tabs($('.product-detail-image-tab'));

                    $('.buy-button').css('display', 'block');
                    $('.price-comparison-button').css('display', 'block');
                    $('.buy-button-small').css('display', 'block');
                    $('.price-comparison-button-small').css('display', 'block');
                },
            });

            /*Display Product Name*/
            var product_name = product_detail[0].product_name;
            var product_name_h2 = document.getElementById('product_name');
            product_name_h2.innerHTML = product_name;

            /*Display Product Price*/
            var product_price = product_detail[0].price;
            var product_price_h6 = document.getElementById('price');
            product_price_h6.innerHTML = 'RM' + Number(product_price).toFixed(2);
            var product_discount_percent = product_detail[0].discount_percent;
            var product_discount_price_h4 = document.getElementById('discount_price');
            product_discount_price_h4.innerHTML = 'RM' + Number(product_price / 100 * (100 - product_discount_percent)).toFixed(2);
            var discount_percent_span = document.getElementById('discount_percent');
            discount_percent_span.innerHTML = '-' + product_discount_percent + '%';

            /*Display Product Detail*/
            var product_info = product_detail[0].product_info;
            var product_detail_p = document.getElementById('product_detail');
            product_detail_p.innerHTML = product_info;
            
            /*Prepare Price Comparison*/
            var lazada_link_preview, elevenstreet_link_preview, shopee_link_preview;
            lazada_link_preview = JSON.parse(product_detail[0].lazada_url);
            elevenstreet_link_preview = JSON.parse(product_detail[0].elevenstreet_url);
            shopee_link_preview = JSON.parse(product_detail[0].shopee_url);
            var priceCompareObj = [lazada_link_preview, elevenstreet_link_preview, shopee_link_preview];

            for (var i = 0; i < priceCompareObj.length; i++) {
                
                var div_media_object = document.createElement('div');
                div_media_object.className = 'media-object';

                var div_media_object_section_1 = document.createElement('div');
                div_media_object_section_1.className = 'media-object-section';
                var a_image = document.createElement('a');
                var div_link_preview_image = document.createElement('div');
                a_image.href = priceCompareObj[i].url;
                a_image.setAttribute('target', '_blank');
                div_link_preview_image.className = 'thumbnail link_preview_image';
                div_link_preview_image.style = 'background-image:url("' + priceCompareObj[i].image + '")';
                a_image.appendChild(div_link_preview_image);
                div_media_object_section_1.appendChild(a_image);

                var div_media_object_section_2 = document.createElement('div');
                div_media_object_section_2.className = 'media-object-section';
                var a_desc = document.createElement('a');
                a_desc.href = priceCompareObj[i].url;
                a_desc.setAttribute('target', '_blank');
                var div_link_section = document.createElement('div');
                div_link_section.className = 'thumbnail link_section';
                var p_link_preview_title = document.createElement('p');
                p_link_preview_title.className = 'link_preview_title';
                var strong_link_preview_title = document.createElement('strong');
                strong_link_preview_title.innerHTML = priceCompareObj[i].title;
                var div_ink_preview_description_wrapper = document.createElement('div');
                div_ink_preview_description_wrapper.className = 'link_preview_description_wrapper';
                var p_link_preview_description = document.createElement('p');
                p_link_preview_description.className = 'link_preview_description';
                p_link_preview_description.innerHTML = priceCompareObj[i].description;
                div_ink_preview_description_wrapper.appendChild(p_link_preview_description);
                p_link_preview_title.appendChild(strong_link_preview_title);
                div_link_section.appendChild(p_link_preview_title);
                div_link_section.appendChild(div_ink_preview_description_wrapper);
                a_desc.appendChild(div_link_section);
                div_media_object_section_2.appendChild(a_desc);

                var label_link_preview_desc = document.createElement('label');
                if (i == 0) {
                    label_link_preview_desc.innerHTML = 'Lazada:';
                } else if (i == 1) {
                    label_link_preview_desc.innerHTML = '11street:';
                } else {
                    label_link_preview_desc.innerHTML = 'Shopee:';
                }
                div_media_object.appendChild(div_media_object_section_1);
                div_media_object.appendChild(div_media_object_section_2);
                $('#priceComparisonModalBody').append(label_link_preview_desc);
                $('#priceComparisonModalBody').append(div_media_object);
                
            }
            //var priceComparisonModalBody = new Foundation.Reveal($('#priceComparisonModalBody'));
            $('#mainMenuLoader').css('display', 'none');
            $('#mainMenuContainer').css('display', 'block'); //change this to 'none' to view the mainmenucontainerblank
            $('#mainMenuContainerBlank').css('display', 'none'); //change this to 'block' to view the mainmenucontainerblank
        },
        fail: function (result) {
            console.log("Category retrieve failed!");
            $('#mainMenuLoader').css('display', 'none');
            $('#mainMenuContainer').css('display', 'none'); //change this to 'none' to view the mainmenucontainerblank
            $('#mainMenuContainerBlank').css('display', 'block'); //change this to 'block' to view the mainmenucontainerblank
        }
    });
    
    jom.ajax({
        url: jom.apiUrl + "product/get-all-product-main-image",
        success: function (result) {
            past_item = result.data;
            past_item2 = result.data;
            console.log(past_item);
            console.log(past_item2);
            for (var i = 0; i < past_item.length; i++) {

                var div_thumbnail = document.createElement('div');
                var img_thumbnail = document.createElement('img');

                if (i == 2) {
                    div_thumbnail.className = 'column show-for-medium';
                } else if (i == 3 || i == 4) {
                    div_thumbnail.className = 'column show-for-large';
                } else {
                    div_thumbnail.className = 'column';
                }

                img_thumbnail.className = 'thumbnail';
                img_thumbnail.src = 'http://localhost:18153/data/img/product/' + past_item[i].image_url;
                div_thumbnail.appendChild(img_thumbnail);
                $('#past-item').append(div_thumbnail);
            }
            //duplicating another ajax for the past item at main menu when there is no current product item to be displayed
            for (var i = 0; i < past_item2.length; i++) {

                var div_thumbnail = document.createElement('div');
                var img_thumbnail = document.createElement('img');

                if (i == 2) {
                    div_thumbnail.className = 'column show-for-medium';
                } else if (i == 3 || i == 4) {
                    div_thumbnail.className = 'column show-for-large';
                } else {
                    div_thumbnail.className = 'column';
                }

                img_thumbnail.className = 'thumbnail';
                img_thumbnail.src = 'http://localhost:18153/data/img/product/' + past_item2[i].image_url;
                div_thumbnail.appendChild(img_thumbnail);
                $('#past-item2').append(div_thumbnail);
            }
        },
        fail: function (result) {
            $('.pass-coming-items-section').css('display', 'none');
        }
    });

    $('.buy-button').on('click', function () {
        if (client_token != null && client_token != "") {
            window.location.assign('PurchaseForm.aspx');
        } else {
            window.location.assign('SignIn.aspx');
        }
    });

    $('.buy-button-small').on('click', function () {
        if (client_token != null && client_token != "") {
            window.location.assign('PurchaseForm.aspx');
        } else {
            window.location.assign('SignIn.aspx');
        }
    });
});