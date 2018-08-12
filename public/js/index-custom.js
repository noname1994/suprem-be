/* JS Document */

/******************************
******************************/

jQuery(document).ready(function ($) {
    const SERVER_HOST = "http://localhost:8080/"

    const URL_PRODUCT = SERVER_HOST + "product";

    $.get(URL_PRODUCT, function () {

    }).done(function () {

    }).fail(function (error) {

    })

});

