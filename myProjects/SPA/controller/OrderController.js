
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

    if($("#errorSellQty").text()!=""||$("#ids option:selected").val()==""||$("#codes option:selected").val()==""||$("#sellQty").val()==""||
        $("#gross").val()==""||$("#net").val()==""||$("#cash").val()==""||$("#discount").val()==""||$("#balance").val()==""){
        $("#btnAddCart").disable();
    }else {

        let text = "Do you really want to add to cart this Item?";

        if (confirm(text) == true) {
            let orderId = $("#o").val();
            let itemCode = $("#codes option:selected").val();
            let kind = $("#orderKind").val();
            let itemName = $("#orderItemName").val();
            let unitPrice = $("#orderPrice").val();
            let sellQty = $("#sellQty").val();
            let total = sellQty*unitPrice;

            var orderDetails={
                orderId:orderId,
                code:itemCode,
                kind:kind,
                name:itemName,
                price:unitPrice,
                sellQty:sellQty,
                total:total
            }

            var ifDuplicate=false;

            var code=$("#codes option:selected").val();
            var trim = $.trim(code);

            for (var j = 0; j < orderDB.length; j++) {
                if (trim == orderDB[j].code){
                    ifDuplicate = true;
                }else {
                    ifDuplicate = false;
                }
            }

            if (ifDuplicate == false){
                orderDB.push(orderDetails);
                $("#tblOrder tbody").empty();

                for (var i = 0; i < orderDB.length; i++) {
                    let raw = `<tr><td> ${orderDB[i].code} </td><td> ${orderDB[i].kind} </td><td> ${orderDB[i].name} </td><td> ${orderDB[i].sellQty} </td><td> ${orderDB[i].price} </td><td> ${orderDB[i].total} </td></tr>`;
                    $("#tblCustomer tbody").append(raw);
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