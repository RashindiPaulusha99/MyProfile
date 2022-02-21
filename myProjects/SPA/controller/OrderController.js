
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

var regExSellQuantity=/^[0-9]{2,20}$/;

$("#sellQty").keyup(function (event) {

    let sellQty = $("#sellQty").val();
    if (regExSellQuantity.test(sellQty)){
        $("#sellQty").css('border','2px solid blue');
        $("#errorSellQty").text("");
    }else {
        $("#sellQty").css('border','2px solid red');
        $("#errorSellQty").text("Quantity is a required field: Pattern 00");
    }
});

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

    $("#tblItem tbody > tr").off("click");
    //$("#tblItem tbody > tr").off("dblclick");

    if($("#errorCode").text()!=""||$("#errorKind").text()!=""||$("#errorItemName").text()!=""||$("#errorQty").text()!=""||$("#errorPrice").text()!=""||
        $("#itemCode").val()==""||$("#nameOfItem").val()==""||$("#kind").val()==""||$("#qty").val()==""||$("#unitPrice").val()==""){
        $("#btnSaveItem").disable();
    }else {

        let text = "Do you really want to save this Item?";

        if (confirm(text) == true) {
            let itemCode = $("#itemCode").val();
            let kind = $("#kind").val();
            let itemName = $("#nameOfItem").val();
            let qty = $("#qty").val();
            let unitPrice = $("#unitPrice").val();

            var itemDetails={
                code:itemCode,
                kind:kind,
                name:itemName,
                qty:qty,
                price:unitPrice
            }

            var ifDuplicate=false;

            var code=$("#itemCode").val();
            var trim = $.trim(code);

            for (var j = 0; j < itemDB.length; j++) {
                if (trim == itemDB[j].code){
                    ifDuplicate = true;
                }else {
                    ifDuplicate = false;
                }
            }

            if (ifDuplicate == false){
                itemDB.push(itemDetails);
                $("#tblItem tbody").empty();

                for (var i = 0; i < itemDB.length; i++) {
                    let raw = `<tr><td> ${itemDB[i].code} </td><td> ${itemDB[i].kind} </td><td> ${itemDB[i].name} </td><td> ${itemDB[i].qty} </td><td> ${itemDB[i].price} </td></tr>`;
                    $("#tblItem tbody").append(raw);
                }

                $("#itemCode").val("");
                $("#kind").val("");
                $("#nameOfItem").val("");
                $("#qty").val("");
                $("#unitPrice").val("");

                $("#itemCode").css('border', '2px solid transparent');
                $("#kind").css('border', '2px solid transparent');
                $("#nameOfItem").css('border', '2px solid transparent');
                $("#qty").css('border', '2px solid transparent');
                $("#unitPrice").css('border', '2px solid transparent');
            }else {
                alert("Already Exists");
            }

        } else {

        }
    }

    $("#tblItem tbody > tr").click(function () {

        tblItemRow=$(this);

        var code=tblItemRow.children(':nth-child(1)').text();
        var trim1 = $.trim(code);
        var kind=tblItemRow.children(':nth-child(2)').text();
        var trim2 = $.trim(kind);
        var iName=tblItemRow.children(':nth-child(3)').text();
        var trim3 = $.trim(iName);
        var qty=tblItemRow.children(':nth-child(4)').text();
        var trim4 = $.trim(qty);
        var price=tblItemRow.children(':nth-child(5)').text();
        var trim5 = $.trim(price);

        $("#itemCode").val(trim1);
        $("#kind").val(trim2);
        $("#nameOfItem").val(trim3);
        $("#qty").val(trim4);
        $("#unitPrice").val(trim5);
    });

    /*$("#tblItem tbody > tr").dblclick(function () {
        $(this).remove();

        $("#itemCode").val("");
        $("#kind").val("");
        $("#nameOfItem").val("");
        $("#qty").val("");
        $("#unitPrice").val("");
    });*/


});