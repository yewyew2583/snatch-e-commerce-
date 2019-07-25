// Framework Namespace
var jom = {};
jom.code = {};
jom.code.error = {};
jom.code.result = {};
jom.control = {};
jom.conversion = {};
jom.device = {};
jom.dialog = {};
jom.format = {};
jom.gps = {};
jom.oop = {};
jom.security = {};
jom.string = {};
jom.ui = {};
jom.validation = {};

// Framework variables
jom.apiUrl = "";
jom.dialog.dialogBox = null;
jom.isDebug = false;
jom.loadingPanelInterval = null;
jom.loadingTimeout = 20;
jom.objectList = Array();

/***************************************************************************
    Overwrite JavaScript Classes / Method
****************************************************************************/
// Reference: http://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/***************************************************************************
    Overwrite JQuery Classes / Method
****************************************************************************/
jQuery.fn.bringToFront = function (zIndexContext) {
    var zi = 1;
    var els = zIndexContext && zIndexContext != "auto" ? $(zIndexContext) : $("*");
    els.each(function () {
        if ($(this).css("position") != "static") {
            var cur = parseInt($(this).css('zIndex'));
            zi = cur > zi ? parseInt($(this).css('zIndex')) : zi;
        }
    });
    $(this).css('zIndex', zi += 1);
    return zi;
};

/***************************************************************************
    Namespace: jom
****************************************************************************/

/*--------------------------------------------------------------------------
    Class: jom.Object
--------------------------------------------------------------------------*/
jom.Object = function () {
    this.uniqueId = "";

    var minimum = 10000;
    var maximum = 99999;
    var rand1 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var rand2 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var rand3 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    this.uniqueId = rand1 + "-" + rand2 + "-" + rand3;

    jom.objectList.push(this);
}

/*--------------------------------------------------------------------------
    Class: jom.Validator
--------------------------------------------------------------------------*/
jom.Validator = function (controlId, value, errorMessage, validationObject) {
    this.errorMessage_date = "Invalid date. Example: 31/01/1990.";
    this.errorMessage_decimal = "Invalid number. Example: 123 and 500.15.";
    this.errorMessage_integer = "Invalid integer. Example: 10, 123, 456.";

    this.controlId = controlId;
    this.validationObject = validationObject;
    this.value = value;
    this.errorMessage = errorMessage;
}

jom.Validator.prototype.hide = function () {
    var validator = $("#" + this.controlId + "_val");

    validator.hide();
}

jom.Validator.prototype.validate = function () {
    var isValid = true;
    var validator = $("#" + this.controlId + "_val");
    var errorMessage = this.errorMessage;
    var nullValues = [];
    var index;

    validator.html("").hide();

    if (this.validationObject.nullValues instanceof Array) {
        nullValues = this.validationObject.nullValues;
    }

    if (this.validationObject instanceof Object) {
        var value = this.value;
        var valObj = this.validationObject;

        if (isValid && valObj.required) {
            if (value == null || value.toString() == "") {
                isValid = false;
            }

            if (isValid) {
                for (index = 0; index < nullValues.length; index++) {
                    if (nullValues[index] != null && value.toString() == nullValues[index].toString()) {
                        isValid = false;
                        break;
                    }
                }
            }
        }

        // Min length
        if (isValid && typeof valObj.minLength != "undefined") {
            if (value != null && value.toString().length < valObj.minLength) {
                isValid = false;
            }
        }

        // Max length
        if (isValid && typeof valObj.maxLength != "undefined" && valObj.maxLength > 0) {
            if (value != null && value.toString().length > valObj.maxLength) {
                isValid = false;
            }
        }

        // Validate data type
        if (isValid && typeof valObj.type == "string" && jom.string.trim(value).length > 0) {
            var dataType = valObj.type.toUpperCase();

            // Date
            if (dataType == "DATE") {
                if (!jom.validation.isDate(value, this.format)) {
                    isValid = false;
                    errorMessage = this.errorMessage_date;
                }
            }

            // Decimal
            if (dataType == "DECIMAL") {
                if (!jom.validation.isDecimal(value)) {
                    isValid = false;
                    errorMessage = this.errorMessage_decimal;
                }
            }

            // GPS DMS Latitude
            if (dataType == "GPS_DMS_LA") {
                if (!jom.validation.isGpsDMS(value)) {
                    isValid = false;
                    errorMessage = "DMS format. Example: 40° 44' 30.822\" N";
                }
            }

            // GPS DMS Longitude
            if (dataType == "GPS_DMS_LO") {
                if (!jom.validation.isGpsDMS(value)) {
                    isValid = false;
                    errorMessage = "DMS format. Example: 73° 59' 21.508\" W";
                }
            }

            // Integer
            if (dataType == "INT" || dataType == "INTEGER") {
                if (!jom.validation.isInteger(value)) {
                    isValid = false;
                    errorMessage = this.errorMessage_integer;
                }
            }

        }
    }

    if (!isValid) {
        validator.html(errorMessage).show();
        $("#" + this.controlId).focus();
    }

    return isValid;
}

/*--------------------------------------------------------------------------
    Class: jom.ValidatorList
--------------------------------------------------------------------------*/
jom.ValidatorList = function () {
    this.list = new Array();
    this.data = {};
}

jom.ValidatorList.prototype.add = function (validator) {
    this.list.push(validator);
}

jom.ValidatorList.prototype.addValidator = function (controlId, value, errorMessage, validationObject) {
    var validator = new jom.Validator(controlId, value, errorMessage, validationObject);

    this.list.push(validator);
}

jom.ValidatorList.prototype.clear = function () {
    this.list = new Array();
}

jom.ValidatorList.prototype.hideValidators = function () {
    for (var index = 0; index < this.list.length; index++) {
        this.list[index].hide();
    }
}

jom.ValidatorList.prototype.validate = function () {
    var isValid = true;

    for (var index = 0; index < this.list.length; index++) {
        if (!this.list[index].validate()) {
            isValid = false;
        }
    }

    return isValid;
}

jom.ValidatorList.prototype.value = function (controlId) {
    for (var index = 0; index < this.list.length; index++) {
        this.list[index].hide();

        if (this.list[index].controlId == controlId) {
            if (typeof this.list[index].value != "undefined") {
                return this.list[index].value;
            } else {
                throw Error("Value not found in jom.ValidatorList.value(controlId). controlId: " + controlId);
            }
        }
    }

    throw Error("Validator not found in jom.ValidatorList.value(controlId). controlId: " + controlId);
}

/***************************************************************************
    Namespace: jom > functions
****************************************************************************/
jom.ajax = function (requestObj) {
    if (jom.isNull(requestObj)) { requestObj = {}; }

    var url = jom.apiUrl;
    var data = {};
    var isHumanAction = true;
    var isShowLoading = true;
    var isAsync = true;
    var successFunc = null;
    var failFunc = null;
    var exceptionFunc = null;

    if (requestObj.data instanceof Object) { data = requestObj.data; }
    if (typeof requestObj.url === "string") { url = requestObj.url; }
    if (typeof requestObj.isHumanAction === "boolean") { isHumanAction = requestObj.isHumanAction; }
    if (typeof requestObj.isShowLoading === "boolean") { isShowLoading = requestObj.isShowLoading; }
    if (typeof requestObj.isAsync === "boolean") { isAsync = requestObj.isSynchronize; }
    if (typeof requestObj.success === "function") { successFunc = requestObj.success; }
    if (typeof requestObj.fail === "function") { failFunc = requestObj.fail; }
    if (typeof requestObj.exception === "function") { exceptionFunc = requestObj.exception; }

    if (isShowLoading) {
        jom.ui.showLoadingPanel();
    }

    if (jom.isDebug) {
        console.log(JSON.stringify(data))
    }

    $.ajax({
        type: "POST",
        url: url,
        async: isAsync,
        headers: {
            'access_token': jom.security.loginToken()
        },
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            jom.ui.hideLoadingPanel();

            try {
                var result = JSON.parse(JSON.stringify(data));

                if (result.isSuccess) {
                    if (typeof successFunc == "function") {
                        successFunc(result);
                    } else {
                        jom.dialog.alert(result.caption, result.message);
                    }
                } else {
                    if (typeof failFunc == "function") {
                        failFunc(result);
                    } else if (result.code == jom.code.error.UNAUTHORIZED_ACCESS) {
                        jom.needLogin();
                    } else {
                        jom.dialog.alertFail(result.caption, result.message);
                    }
                }
            }
            catch (ex) {
                var exceptionInfo = "URL: " + url + ". \n\nMessage: " + ex.message + ". \n\nLine: " + ex.lineNumber + ". \n\nstack: " + ex.stack + ". \n\nData: " + data;

                if (jom.isDebug) {
                    jom.dialog.alertError("AJAX Request Error", exceptionInfo);
                } else {
                    console.log(exceptionInfo);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            jom.ui.hideLoadingPanel();

            //var errorInfo = xhr.responseText + "\n\n" + thrownError.toString();
            var errorInfo = xhr.status + " (" + xhr.statusText + ")\n\n" + xhr.responseText;

            if (jom.isDebug) {
                jom.dialog.alertError("Error", errorInfo);
            } else {
                console.log(errorInfo);
            }
        }
    });
}

jom.findObject = function (uniqueId) {
    for (var index = 0; index < jom.objectList.length; index++) {
        var obj = jom.objectList[index];

        if (obj.uniqueId == uniqueId) {
            return obj;
        }
    }

    return null;
}

jom.getPropertyArray = function (object, isOwnProperty) {
    var o = object, own = isOwnProperty, a = new Array();

    if (typeof own == "undefined") { own = false; }

    if (typeof o != "undefined") {
        for (var p in o) { // loop property
            if (own == false || o.hasOwnProperty(p)) {
                a.push(p);
            }
        }
    }

    a.sort();
    return a;
}

jom.htmlDecode = function (value) {
    return $('<div/>').html(value).text();
}

jom.htmlEncode = function (value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    var text = $('<div/>').text(value).html();

    if (text != null) {
        text = text.replace("\n", "<br/>");
    }

    return text;
}

jom.isNull = function (value) {
    if (typeof value == "undefined" || value == null) {
        return true;
    }

    return false;
}

jom.listProperties = function (object, isOwnProperty) {
    var properties = "", o = object, own = isOwnProperty;

    if (typeof o != "undefined") {
        var a = jom.getPropertyArray(o);

        for (var i = 0; i < a.length; i++) { // loop property
            var p = a[i];

            if (typeof o[p] != "function") {
                var className = "";
                className = " [type: " + (typeof o[p]) + "]";
                properties += p + className + "[value: " + o[p] + "]\n";
            }
        }
    }

    return properties;
}

jom.randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

jom.urlEncode = function (value) {
    return value;
}

/***************************************************************************
    Namespace: jom.code.error
****************************************************************************/
jom.code.error.UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS";

/***************************************************************************
    Namespace: jom.conversion > Functions
****************************************************************************/
jom.conversion.minutesToTime = function (minutes) {
    var time = "0:00 AM";

    var amPm = "AM";
    var timeMin = minutes % 60;
    var hour = (minutes - timeMin) / 60;

    if (hour > 12) {
        hour = hour - 12;
        amPm = "PM";
    }

    time = hour + ":" + jom.string.padLeft(timeMin, "0", 2) + " " + amPm;

    return time;
}

/***************************************************************************
    Namespace: jom.control > Functions
****************************************************************************/
jom.control.getValue = function (id) {
    return $("#" + id).val();
}

jom.control.getValueTrim = function (id) {
    var value = $("#" + id).val();

    if (value == null) {
        value = "";
    }

    return value.toString().trim();
}

jom.control.setHtml = function (id, value) {
    $("#" + id).html(value);
}

jom.control.setValue = function (id, value) {
    $("#" + id).val(value);
}

/***************************************************************************
    Namespace: jom.device
****************************************************************************/
jom.device.MODE_DESKTOP = "desktop";
jom.device.MODE_PHONE = "phone";
jom.device.MODE_TABLET = "tablet";

/***************************************************************************
    Namespace: jom.device > Functions
****************************************************************************/
jom.device.getMode = function () {
    var mode = localStorage.getItem("jom.device.mode");

    if (mode == null) {
        mode = jom.device.MODE_PHONE;
    }

    return mode;
}

jom.device.isAndroid = function () {
    // Reference: http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return true;
    }

    return false;
}

jom.device.isIOS = function () {
    // Reference: http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }

    return false;
}

jom.device.isPhone = function () {
    // Reference: http://stackoverflow.com/questions/21757105/javascript-how-to-check-user-agent-for-mobile-tablet
    var ua = navigator.userAgent;
    var mobile = /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'w' : /iPhone|iP[oa]d/.test(ua) ? 'i' : /Android/.test(ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'b' : /Mobile Safari/.test(ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0;

    return mobile;
}

jom.device.isTablet = function () {
    // Reference: http://stackoverflow.com/questions/21757105/javascript-how-to-check-user-agent-for-mobile-tablet
    var ua = navigator.userAgent;
    var tablet = /Tablet|iPad/i.test(ua);

    return tablet;
}

jom.device.setMode = function (mode) {
    localStorage.setItem("jom.device.mode", mode);
}

/***************************************************************************
    Namespace: jom.dialog > Functions
****************************************************************************/
jom.dialog.alert = function (caption, message, buttons) {
    jom.dialog.showDialog(caption, message, "I", buttons);
}

jom.dialog.alertError = function (caption, message, buttons) {
    jom.dialog.showDialog(caption, message, "E", buttons);
}

jom.dialog.alertFail = function (caption, message, buttons) {
    jom.dialog.showDialog(caption, message, "E", buttons);
}

jom.dialog.alertWarning = function (caption, message, buttons) {
    jom.dialog.showDialog(caption, message, "W", buttons);
}

jom.dialog.closeDialog = function () {
    jom.dialog.dialogBox.close();
}

jom.dialog.showDialog = function (caption, message, option, buttons) {
    alert(message);
}

/***************************************************************************
    Namespace: jom.format > Functions
****************************************************************************/
jom.format.toDateTime = function (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var strTime = hours + ':' + minutes + ' ' + ampm;

    return date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear() + "  " + strTime;
}

jom.format.toShortDate = function (date, format) {
    if (date == null || date == "") { return ""; }

    if (typeof format == "undefined") {
        format = "dd/mm/yyyy";
    }

    if (format.toUpperCase() == "dd/mm/yyyy".toUpperCase()) {
        return jom.date.toShortDate_ddmmyyyy(date);
    }

    return date.toString();
}

jom.format.toShortDate_ddmmyyyy = function (date) {
    if (date == null || date == "") { return ""; }

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return jom.string.padLeft(day, "0", 2) + '/' + jom.string.padLeft(month, "0", 2) + '/' + year;
}

/***************************************************************************
    Namespace: jom.gps > Function
****************************************************************************/
jom.gps.decimalToDMS = function (decimalValue, isLongitude, decimalPlace) {
    if (typeof decimalPlace == "undefined") {
        decimalPlace = 3;
    }

    // Reference: http://stackoverflow.com/questions/5786025/decimal-degrees-to-degrees-minutes-and-seconds-in-javascript
    var d = parseInt(decimalValue);
    var minfloat = Math.abs((decimalValue - d) * 60);
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = secfloat.toFixed(decimalPlace);
    d = Math.abs(d);

    if (s == 60) {
        m++;
        s = 0;
    }

    if (m == 60) {
        d++;
        m = 0;
    }

    return {
        dir: decimalValue < 0 ? isLongitude ? 'W' : 'S' : isLongitude ? 'E' : 'N',
        deg: d,
        min: m,
        sec: s
    };
}

jom.gps.decimalToDMS_try = function (returnWhenError, decimalValue, isLongitude, decimalPlace) {
    try {
        return jom.gps.decimalToDMS(decimalValue, isLongitude, decimalPlace);
    } catch (error) {

    }

    return returnWhenError;
}

jom.gps.decimalToDMSstring = function (decimalValue, isLongitude, decimalPlace) {
    if (typeof decimalPlace == "undefined") {
        decimalPlace = 3;
    }

    var dms = jom.gps.decimalToDMS(decimalValue, isLongitude, decimalPlace);

    return dms.deg + "° " + dms.min + "' " + dms.sec + "\" " + dms.dir;
}

jom.gps.decimalToDMSstring_try = function (returnWhenError, decimalValue, isLongitude, decimalPlace) {
    try {
        return jom.gps.decimalToDMSstring(decimalValue, isLongitude, decimalPlace);
    } catch (error) {

    }

    return returnWhenError;
}

jom.gps.dmsToDecimal = function (data, decimalPlace) {
    if (typeof decimalPlace == "undefined") {
        decimalPlace = 7;
    }

    // Reference: http://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
    var parts = data.split(/[^\d\w\.]+/);
    var converted = jom.gps.dmsToDecimal_parts(parts[0], parts[1], parts[2], parts[3], decimalPlace);

    return converted;
}

jom.gps.dmsToDecimal_parts = function (degrees, minutes, seconds, direction, decimalPlace) {
    if (typeof decimalPlace == "undefined") {
        decimalPlace = 7;
    }

    // Reference: http://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
    var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd.toFixed(decimalPlace);
}

/***************************************************************************
    Namespace: jom.oop > Functions
****************************************************************************/

jom.oop.createObjectFromSuperType = function (prototypeOfSuper) {
    function F() { }
    F.prototype = prototypeOfSuper;
    return new F();
};

jom.oop.inheritPrototype = function (subType, superType) {
    try {
        var prototype = jom.oop.createObjectFromSuperType(superType.prototype); //create object
        prototype.constructor = subType; //augment object
        subType.prototype = prototype; //assign object
    } catch (err) {
        throw new Error(err.message + "\nsubType: " + subType + "\n\nsuperType: " + superType);
    }
};

/***************************************************************************
    Namespace: jom.security > Functions
****************************************************************************/
jom.security.loginToken = function () {
    return localStorage.getItem("token");
}

jom.security.needLogin = function () {
    top.location.href = "./";
}

/***************************************************************************
    Namespace: jom.string > Functions
****************************************************************************/

jom.string.padLeft = function (data, char, size) {
    var s = data.toString();

    while (s.length < size) s = char + s;

    return s;
}

jom.string.trim = function (data) {
    if (data != null) {
        return data.toString().trim();
    }

    return "";
}

jom.string.replace = function (data, search, replacement) {
    if (data != null) {
        return data.replace(new RegExp(search, 'g'), replacement);
    }

    return data;
}

/***************************************************************************
    Namespace: jom.ui > Functions
****************************************************************************/

jom.ui.hideLoadingPanel = function () {

}

jom.ui.setEnterKey = function (controlId, func) {
    $("#" + controlId).keypress(function (event) {
        if (event.keyCode == 13) {
            func();
        }
    });
}

jom.ui.showLoadingPanel = function () {

}

jom.ui.showLoadingPanel_timeout = function () {

}

jom.ui.updateLoadingPanelPosition = function () {

}

/***************************************************************************
    Namespace: jom.validation > Functions
****************************************************************************/

jom.validation.isDate = function (data, format) {
    if (typeof format == "undefined") { format = "dd/mm/yyyy"; }

    if (format.toUpperCase() == "mm/dd/yyyy".toUpperCase()) {
        return jom.validation.isDate_mmddyyyy(data);
    } else {
        return jom.validation.isDate_ddmmyyyy(data);
    }
}

// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
jom.validation.isDate_ddmmyyyy = function (dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
jom.validation.isDate_mmddyyyy = function (dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

jom.validation.isDecimal = function (data) {
    // Reference: http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
    return !isNaN(parseFloat(data)) && isFinite(data);
}

jom.validation.isGpsDMS = function (data) {
    try {
        var parts = data.split(/[^\d\w\.]+/);

        if (parts.length != 4) {
            return false;
        }

        jom.gps.dmsToDecimal(data);

        return true;
    }
    catch (err) {
        return false;
    }

    return false;
}

jom.validation.isInteger = function (data) {
    if (jom.validation.isLong(data)) {
        data = data.toString();

        if (parseFloat(data) >= -2147483648 && parseFloat(data) <= 2147483647) {
            return true;
        }
    }

    return false;
}

jom.validation.isLong = function (data) {
    if (jom.validation.isDecimal(data)) {
        data = data.toString();

        if (data.indexOf(".") < 0) {
            return true;
        }
    }

    return false;
}

/***************************************************************************
    JQuery document and window events
****************************************************************************/
$(document).ready(function () {

});

$(window).resize(function () {
    jom.ui.updateLoadingPanelPosition();
});