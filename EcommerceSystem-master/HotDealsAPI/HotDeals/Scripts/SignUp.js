/*Validate password is in the AT LEAST 1 uppercase, 1 lower case, and 1 digit in 6character format*/
function validatePass(password) {
    var passformat = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (password != null && password != "") {
        if (passformat.test(password)) {
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

/*Validate name is only letters format*/
function validateName(name) {
    var nameformat = /^[a-zA-Z\s]+$/;
    if (name != null && name != "") {
        if (nameformat.test(name)) {
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

/*Validate email is in the standard format*/
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

var AllReady, isReadyFname = 0, isReadyEmail = 0, isReadyPassword = 0, isReadyConfirmPassword = 0;

$(document).ready(function () {
    /*verifying full name*/
    $('#fname').blur(function () {
        if (fname.value == null || fname.value == "") {
            $("#fname").notify("Required!");
            isReadyFname = 0;
        }
        else if (!validateName(fname.value)) {
            $("#fname").notify("Only Letters Allow!");
            isReadyFname = 0;
        }
        else {
            $("#fname").notify("Available.", "success");
            isReadyFname = 1;
        }
    });

    /*verifying email format and whther email is duplicated*/
    $('#email').blur(function () {
        if (email.value == null || email.value == "") {
            $("#email").notify("Required!");
            isReadyEmail = 0;
        }
        else if (!validateEmail(email.value)) {
            $("#email").notify("E-mail format is wrong!\neg. snatch123@cart.com");
            isReady2 = 0;
        }
        else {
            /*sending API to ensure email is not duplicated*/
            jom.ajax({
                url: jom.apiUrl + "security/verify-same-email",
                data: {
                    email: $("#email").val(),
                },
                success: function (result) {
                    $("#email").notify("Available.", "success");
                    isReadyEmail = 1;
                },
                fail: function (result) {
                    $("#email").notify("E-mail already exist!");
                    isReadyEmail = 0;
                }
            });
        }
    });

    /*verifying password format*/
    $('#password').blur(function () {
        if (password.value == null || password.value == "") {
            $("#password").notify("Required!");
            isReadyPassword = 0;
        }
        else if (!validatePass(password.value)) {
            $("#password").notify("At least 6 character with number(s) eg. snatch123");
            isReadyPassword = 0;
        }
        else {
            $("#password").notify("Available.", "success");
            isReadyPassword = 1;
        }
    });

    /*verify the password is matched*/
    $('#ConfirmPassword').blur(function () {
        var ConfirmPassword = $("#ConfirmPassword").val();
        if ($("#password").val() == ConfirmPassword) {
            if (ConfirmPassword != null && ConfirmPassword != "") {
                $("#ConfirmPassword").notify("Password Matched.", "success");
                isReadyConfirmPassword = 1;
            }
            else {
                $("#ConfirmPassword").notify("Required");
                isReadyConfirmPassword = 0;
            }
        }
        else {
            $("#ConfirmPassword").notify("password not match!");
            isReadyConfirmPassword = 0;
        }
    });
});

function signup() {
    AllReady = isReadyFname + isReadyEmail + isReadyPassword + isReadyConfirmPassword;
    if (AllReady == 4) {
        jom.ajax({
            url: jom.apiUrl + "security/signup",
            data: {
                full_name: $("#fname").val(),
                email: $("#email").val(),
                password: $("#password").val(),
            },
            success: function (result) {
                $("#signupbtn").notify(
                    "Sign up Succeed.", "success"
                );
                //to reset value of email to prevent double submissions.
                isReadyEmail = 0; 
                window.location.href = "SignIn.aspx";
            },
            fail: function (result) {
                alert("API sign up failed!");
            }
        });
    }
    else {
        $("#signupbtn").notify(
            "Sign Up Failed, Check back the required and format box.", { position: "bottom" }
        );
    }
}