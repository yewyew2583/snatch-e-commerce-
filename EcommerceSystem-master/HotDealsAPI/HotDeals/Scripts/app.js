$(document).foundation();

function QueryData(queryString, preserveDuplicates) {

    // if a query string wasn't specified, use the query string from the URL
    if (queryString == undefined) {
        queryString = location.search ? location.search : '';
    }

    // remove the leading question mark from the query string if it is present
    if (queryString.charAt(0) == '?') queryString = queryString.substring(1);

    // check whether the query string is empty
    if (queryString.length > 0) {

        // replace plus signs in the query string with spaces
        queryString = queryString.replace(/\+/g, ' ');

        // split the query string around ampersands and semicolons
        var queryComponents = queryString.split(/[&;]/g);

        // loop over the query string components
        for (var index = 0; index < queryComponents.length; index++) {

            // extract this component's key-value pair
            var keyValuePair = queryComponents[index].split('=');
            var key = decodeURIComponent(keyValuePair[0]);
            var value = keyValuePair.length > 1 
                             ? decodeURIComponent(keyValuePair[1])
                             : '';

            // check whether duplicates should be preserved
            if (preserveDuplicates) {

                // create the value array if necessary and store the value
                if (!(key in this)) this[key] = [];
                this[key].push(value);

            } else {

                // store the value
                this[key] = value;

            }

        }

    }

}

$(document).ready(function () {
    var full_name = localStorage.getItem("full_name");
    var client_token = localStorage.getItem("access_token");

    if (client_token != null && client_token != "") {
        jom.ajax({
            url: jom.apiUrl + "security/refresh-time-or-remove-access-token",
            data: {
                client_token: client_token,
            },
            success: function (result) {
                var a_fullname = document.createElement('a');
                a_fullname.innerHTML = full_name + "'s Account";

                $("#dropdown_option").append(a_fullname);
            },
            fail: function (result) {
                alert("Access time expired!");
                localStorage.removeItem("full_name");
                localStorage.removeItem("access_token");
                window.location.href = "MainMenu.aspx";
            }
        });
    }
    else
    {
        //no token, sign in and sign up button will show!
        var a_sign_in = document.createElement('a');
        var a_sign_up = document.createElement('a');
        var vertical_line = document.createElement('b');

        a_sign_in.innerHTML = 'Login';
        a_sign_up.innerHTML = 'Sign up';
        vertical_line.innerHTML = ' | ';

        a_sign_in.href = 'SignIn.aspx';
        a_sign_up.href = 'SignUp.aspx';

        vertical_line.style.color = '#ffffff';
        
        $(".menu .desktop-navbar-signUp-signIn b").append(a_sign_in, vertical_line, a_sign_up);
    }
});

function logout() {
    var client_token = localStorage.getItem("access_token");
    jom.ajax({
        url: jom.apiUrl + "security/logout",
        data: {
            client_token: client_token,
        },
        success: function (result) {
            localStorage.removeItem("full_name");
            localStorage.removeItem("access_token");
            window.location.href = "MainMenu.aspx";
        },
        fail: function (result) {
            localStorage.removeItem("full_name");
            localStorage.removeItem("access_token");
            window.location.href = "MainMenu.aspx";
        }
    });
}