
/*-------------------Customer Sec-----------------------*/

function loadCustomerIds() {
    $("#ids").empty();
    for (var i = 0; i <customerDB.length ; i++) {
        $("#ids").append($("<option></option>").attr("value", i).text(customerDB[i].id));
    }
}

$("#ids").click(function () {
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#ids option:selected").text()==customerDB[i].id){
            $("#orderCusName").val(customerDB[i].name);
            $("#orderCusContact").val(customerDB[i].contact);
            $("#orderCusNIC").val(customerDB[i].nic);
            $("#orderCusAddress").val(customerDB[i].address);
        }
    }
});

/*-------------------Item Sec-----------------------*/

function loadItemCodes() {
    $("#codes").empty();
    for (var i = 0; i <itemDB.length ; i++) {
        $("#codes").append($("<option></option>").attr("value", i).text(itemDB[i].code));
    }
}

$("#codes").click(function (event) {

    for (var i = 0; i < itemDB.length; i++) {
        if ($("#codes option:selected").text()==itemDB[i].code){
            $("#orderKind").val(itemDB[i].kind);
            $("#orderItemName").val(itemDB[i].name);
            $("#orderQty").val(itemDB[i].qty);
            $("#orderPrice").val(itemDB[i].price);
        }
    }
});

/*-------------------Order Table-----------------------*/

$("#btnAddCart").click(function () {


});