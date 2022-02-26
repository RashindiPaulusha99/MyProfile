$("#customerName").css('display','none');
$("#customerSec").css('display','none');
$("#itemName").css('display','none');
$("#itemSec").css('display','none');
$("#orderName").css('display','none');
$("#orderSec").css('display','none');

$("#customer").click(function () {
    $("#customerName").css('display','block');
    $("#customerSec").css('display','block');
    $("#itemName").css('display','none');
    $("#itemSec").css('display','none');
    $("#orderName").css('display','none');
    $("#orderSec").css('display','none');
    $("#homeSec").css('display','none');
    $("#name").css('display','none');

    $("#customerId").focus();
});

$("#item").click(function () {
    $("#customerName").css('display','none');
    $("#customerSec").css('display','none');
    $("#itemName").css('display','block');
    $("#itemSec").css('display','block');
    $("#orderName").css('display','none');
    $("#orderSec").css('display','none');
    $("#homeSec").css('display','none');
    $("#name").css('display','none');

    $("#itemCode").focus();
});

$("#home").click(function () {
    $("#customerName").css('display','none');
    $("#customerSec").css('display','none');
    $("#itemName").css('display','none');
    $("#itemSec").css('display','none');
    $("#orderName").css('display','none');
    $("#orderSec").css('display','none');
    $("#homeSec").css('display','block');
    $("#name").css('display','block');
});

$("#order").click(function () {
    $("#customerName").css('display','none');
    $("#customerSec").css('display','none');
    $("#itemName").css('display','none');
    $("#itemSec").css('display','none');
    $("#orderName").css('display','block');
    $("#orderSec").css('display','block');
    $("#homeSec").css('display','none');
    $("#name").css('display','none');

    loadCustomerIds();
    loadItemCodes();
    $("#orderId").focus();
});