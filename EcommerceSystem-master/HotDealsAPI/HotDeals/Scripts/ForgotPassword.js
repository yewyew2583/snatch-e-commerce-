function validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email != null && email != "") {
        if (mailformat.test(email)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/*send email to user mail box to verify reset password*/
function sendemail() {
    $('#send_btn').hide();
    var email_to_sent = $("#email").val();
    
    if (validateEmail(email_to_sent)) {
        if (email_to_sent != null && email_to_sent != "") {
            jom.ajax({
                url: jom.apiUrl + "security/send-email-forgot-password",
                data: {
                    client_email: $("#email").val(),
                },
                success: function (result) {
                    $('#send_btn').show();
                    $("#send_btn").notify("Email Sent! Kindly check your mailbox.", "success");
                },
                fail: function (result) {
                    $('#send_btn').show();
                    alert("Email failed to send. Pls try again.");
                }
            });
        }
    }
    else {
        $('#send_btn').show();
        $("#email").notify("Check your email format.");
    }
}