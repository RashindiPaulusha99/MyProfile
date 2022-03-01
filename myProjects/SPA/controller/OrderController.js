
function disableFields() {
    $("#orderCusName").css('disabled',false);
    $("#orderCusContact").disable();
    $("#orderCusAddress").disable();
    $("#orderCusNIC").disable();
    $("#orderItemName").disable();
    $("#orderItemCode").disable();
    $("#orderKind").disable();
    $("#orderPrice").disable();
    $("#orderQty").disable();
    $("#gross").disable();
    $("#net").disable();
}

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

var regExOrderID=/^(O00-)[0-9]{3,4}$/;
var regExSellQuantity=/^[0-9]{1,20}$/;
var regExDiscount=/^[0-9]{1,2}$/;

$("#orderId").keyup(function (event) {

    let orderId = $("#orderId").val();
    if (regExOrderID.test(orderId)){
        $("#orderId").css('border','2px solid blue');
        $("#errorOrderId").text("");
        if (event.key=="Enter"){
            $("#orderDate").focus();
        }
    }else {
        $("#orderId").css('border','2px solid red');
        $("#errorOrderId").text("OrderId is a required field: Pattern O00-000");
    }
});

$("#sellQty").keyup(function (event) {

    let sellQty = $("#sellQty").val();
    if (regExSellQuantity.test(sellQty)){
        $("#sellQty").css('border','2px solid blue');
        $("#errorSellQty").text("");
        if (event.key=="Enter"){
            $("#itemDiscount").focus();
        }
    }else {
        $("#sellQty").css('border','2px solid red');
        $("#errorSellQty").text("Quantity is a required field: Pattern 00");
    }
});

$("#itemDiscount").keyup(function () {

    let itemDiscount = $("#itemDiscount").val();
    if (regExDiscount.test(itemDiscount)){
        $("#itemDiscount").css('border','2px solid blue');
        $("#errordiscount").text("");
    }else {
        $("#itemDiscount").css('border','2px solid red');
        $("#errordiscount").text("ItemDiscount is a required field: Pattern 0");
    }
});

function loadItemCodes() {
    $("#codes").empty();
    for (var i = 0; i <itemDB.length ; i++) {
        $("#codes").append($("<option></option>").attr("value", i).text(itemDB[i].code));
    }
}

$("#codes").click(function () {

    for (var i = 0; i < itemDB.length; i++) {
        if ($("#codes option:selected").text()==itemDB[i].code){
            $("#orderItemCode").val(itemDB[i].code);
            $("#orderKind").val(itemDB[i].kind);
            $("#orderItemName").val(itemDB[i].name);
            $("#orderQty").val(itemDB[i].qty);
            $("#orderPrice").val(itemDB[i].price);
        }
    }
});

/*-------------------Order Table-----------------------*/

function manageQty(qty,status){
    var votevalue = parseInt(qty);
    for (var j = 0; j < itemDB.length; j++) {
        if ($("#orderItemCode").val() == itemDB[j].code){
            var manageQty=parseInt(itemDB[j].qty);
            if (status=="add"){
                manageQty-=votevalue;
                itemDB[j].qty=manageQty;
            }else if (status=="reduce"){
                manageQty+=votevalue;
                itemDB[j].qty=manageQty;
            }
        }
    }
}

function getQty(sellqty){
    var votevalue = parseInt(sellqty);
    for (var j = 0; j < $("#tblOrder tbody tr").children(':nth-child(1)').length; j++) {
        if ($("#orderItemCode").val() == $("#tblOrder tbody tr").children(':nth-child(1)')[j].innerText){
            var qty = parseInt($("#tblOrder tbody tr").children(':nth-child(4)')[j].innerText);
            qty+=votevalue;
        }
    }
    return qty;
}

function getAmount(net,status){
    for (var j = 0; j < $("#tblOrder tbody tr").children(':nth-child(1)').length; j++) {
        if ($("#orderItemCode").val() == $("#tblOrder tbody tr").children(':nth-child(1)')[j].innerText){
            var amount=parseInt($("#tblOrder tbody tr").children(':nth-child(7)')[j].innerText);
            if (status=="add"){
                amount=amount+net;
            }else if (status=="reduce"){
                amount=amount-net;
            }
        }
    }
    return amount;
}

var grossAmount=0;
function calculateGrossAmount(gross,status){
    if(status=="add"){
        grossAmount+=gross;
        $("#gross").val(grossAmount);
    }else if (status=="reduce"){
        grossAmount-=gross;
        $("#gross").val(grossAmount);
    }
}

var netAmount=0;
function calculateNetAmount(net,status){
    if (status=="add"){
        netAmount+=net;
        $("#net").val(netAmount);
    }else if (status=="reduce"){
        netAmount-=net;
        $("#net").val(netAmount);
    }
}

var tblOrderRow;
var click="not clicked";

/*$("#btnAddCart").click(function () {

     $("#tblItem tbody > tr").off("click");
     $("#tblItem tbody > tr").off("dblclick");

    if($("#errorSellQty").text()!=""||$("#errorOrderId").text()!=""||$("#errordiscount").text()!=""||$("#ids option:selected").val()==""||
        $("#codes option:selected").val()==""||$("#sellQty").val()==""||$("#orderId").val()==""||$("#orderDate").val()==""){
        $("#btnAddCart").disable();
    }else {

        let text = "Do you really want to add to cart this Item?";

        if (confirm(text) == true) {

            let orderId = $("#orderId").val();
            let itemCode = $("#codes option:selected").text();
            let kind = $("#orderKind").val();
            let itemName = $("#orderItemName").val();
            let unitPrice = $("#orderPrice").val();
            let sellQty = $("#sellQty").val();
            let gross = sellQty*unitPrice;
            let discount = $("#itemDiscount").val();
            let net = gross-(gross*$("#itemDiscount").val()/100);

            var ifDuplicate=false;

            for (var j = 0; j < orderDetailsDB.length; j++) {
                if (itemCode == orderDetailsDB[j].code){
                    ifDuplicate = true;
                } else {
                    ifDuplicate = false;
                }
            }

            if (ifDuplicate==false){

                var orderDetails={
                    orderId:orderId,
                    code:itemCode,
                    kind:kind,
                    name:itemName,
                    price:unitPrice,
                    sellQty:sellQty,
                    discount:discount,
                    total:net
                }

                orderDetailsDB.push(orderDetails);
                manageQty(sellQty,"add");
                calculateGrossAmount(gross);
                calculateNetAmount(net);

                $("#tblOrder tbody").empty();

                for (var i = 0; i < orderDetailsDB.length; i++) {
                    let raw = `<tr><td> ${orderDetailsDB[i].code} </td><td> ${orderDetailsDB[i].kind} </td><td> ${orderDetailsDB[i].name} </td><td> ${orderDetailsDB[i].sellQty} </td><td> ${orderDetailsDB[i].price} </td><td> ${orderDetailsDB[i].total} </td></tr>`;
                    $("#tblOrder tbody").append(raw);
                }

                $("#orderItemName").val("");
                $("#orderKind").val("");
                $("#orderQty").val("");
                $("#orderPrice").val("");
                $("#sellQty").val("");
                $("#itemDiscount").val("");

                $("#sellQty").css('border', '2px solid transparent');
                $("#itemDiscount").css('border', '2px solid transparent');

            }else if (ifDuplicate==true){

                var qty = getQty(sellQty);
                var amount = getAmount(net,"add");
                manageQty(sellQty,"add");
                calculateGrossAmount(gross);
                calculateNetAmount(net);

                for (var i = 0; i < orderDetailsDB.length; i++) {
                    if ($("#codes option:selected").text() == orderDetailsDB[i].code){

                        orderDetailsDB[i].orderId=orderId;
                        orderDetailsDB[i].code=itemCode;
                        orderDetailsDB[i].kind=kind;
                        orderDetailsDB[i].name=itemName;
                        orderDetailsDB[i].price=unitPrice;
                        orderDetailsDB[i].sellQty=qty;
                        orderDetailsDB[i].discount=discount;
                        orderDetailsDB[i].total=amount;
                    }
                }

                $("#tblOrder tbody").empty();

                for (var i = 0; i < orderDetailsDB.length; i++) {
                    let raw = `<tr><td> ${orderDetailsDB[i].code} </td><td> ${orderDetailsDB[i].kind} </td><td> ${orderDetailsDB[i].name} </td><td> ${orderDetailsDB[i].sellQty} </td><td> ${orderDetailsDB[i].price} </td><td> ${orderDetailsDB[i].total} </td></tr>`;
                    $("#tblOrder tbody").append(raw);
                }

                $("#orderItemName").val("");
                $("#orderKind").val("");
                $("#orderQty").val("");
                $("#orderPrice").val("");
                $("#sellQty").val("");
                $("#itemDiscount").val("");

                $("#sellQty").css('border', '2px solid transparent');
                $("#itemDiscount").css('border', '2px solid transparent');

            }

        } else {

        }
    }

    $("#tblOrder tbody > tr").click(function () {
        tblOrderRow=$(this);

        var code=tblOrderRow.children(':nth-child(1)').text();
        var trim1 = $.trim(code);
        var kind=tblOrderRow.children(':nth-child(2)').text();
        var trim2 = $.trim(kind);
        var iName=tblOrderRow.children(':nth-child(3)').text();
        var trim3 = $.trim(iName);
        var sellqty=tblOrderRow.children(':nth-child(4)').text();
        var trim4 = $.trim(sellqty);
        var price=tblOrderRow.children(':nth-child(5)').text();
        var trim5 = $.trim(price);

        $("#codes option:selected").text(trim1);
        $("#orderKind").val(trim2);
        $("#orderItemName").val(trim3);
        $("#sellQty").val(trim4);
        $("#orderPrice").val(trim5);

        for (var i = 0; i < itemDB.length; i++) {
            if ($("#codes option:selected").text() == itemDB[i].code) {
                $("#orderQty").val(itemDB[i].qty);
            }
        }

        for (var i = 0; i < orderDetailsDB.length; i++) {
            if ($("#codes option:selected").text() == orderDetailsDB[i].code) {
                $("#itemDiscount").val(orderDetailsDB[i].discount);
            }
        }
    });

    $("#tblOrder tbody > tr").dblclick(function () {

        let text = "Are you sure you want to remove this Item from cart?";

        if (confirm(text) == true) {
            tblOrderRow.remove();

            var index=-1;

            for (var i = 0; i < orderDetailsDB.length; i++) {
                if (tblOrderRow.children(':nth-child(1)').text() == orderDetailsDB[i].code){
                    index=i;
                }
            }
            orderDetailsDB.splice(index,1);
            console.log(orderDetailsDB);

            /!*var qty = getQty(tblOrderRow.children(':nth-child(4)').text());
            var amount = getAmount(tblOrderRow.children(':nth-child(5)').text());
            manageQty(tblOrderRow.children(':nth-child(4)').text());

            calculateGrossAmount(gross);
            calculateNetAmount(net);*!/

            $("#orderItemName").val("");
            $("#orderKind").val("");
            $("#orderQty").val("");
            $("#orderPrice").val("");
            $("#sellQty").val("");
            $("#itemDiscount").val("");
        } else {

        }
    });
});*/

$("#btnAddCart").click(function () {

    $("#tblItem tbody > tr").off("click");
    $("#tblItem tbody > tr").off("dblclick");

    /*if($("#errorSellQty").text()!=""||$("#errorOrderId").text()!=""||$("#errordiscount").text()!=""||$("#ids option:selected").val()==""||
        $("#codes option:selected").val()==""||$("#sellQty").val()==""||$("#orderId").val()==""||$("#orderDate").val()==""){
        $("#btnAddCart").disable();
    }else {*/

        let text = "Do you really want to add to cart this Item?";

        if (confirm(text) == true) {

            let orderId = $("#orderId").val();
            let itemCode = $("#orderItemCode").val();
            let kind = $("#orderKind").val();
            let itemName = $("#orderItemName").val();
            let unitPrice = $("#orderPrice").val();
            var sellQty = $("#sellQty").val();
            var gross = sellQty*unitPrice;
            let discount = $("#itemDiscount").val();
            var net = gross-(gross*discount/100);

            /*var orderDetails={
                orderId:orderId,
                code:itemCode,
                kind:kind,
                name:itemName,
                price:unitPrice,
                sellQty:sellQty,
                discount:discount,
                total:net
            }*/

            var ifDuplicate=false;

            for (var i = 0; i < $("#tblOrder tbody tr").length; i++) {
                if($("#orderItemCode").val()==$("#tblOrder tbody tr").children(':nth-child(1)')[i].innerText){
                    ifDuplicate=true;
                }
            }

            if (ifDuplicate!=true){

                manageQty(sellQty,"add");
                calculateGrossAmount(gross,"add");
                calculateNetAmount(net,"add");

                let raw = `<tr><td> ${itemCode} </td><td> ${kind} </td><td> ${itemName} </td><td> ${sellQty} </td><td> ${unitPrice} </td><td> ${discount} </td><td> ${net} </td><td> <input id='btnEdit' class='btn btn-success btn-sm' value='Update' style="width: 75px"/> </td><td> <input id='btnDelete' class='btn btn-danger btn-sm' value='Delete' style="width: 75px"/> </td></tr>`;
                $("#tblOrder tbody").append(raw);

                $("#orderItemName").val("");
                $("#orderKind").val("");
                $("#orderQty").val("");
                $("#orderPrice").val("");
                $("#sellQty").val("");
                $("#itemDiscount").val("");

                $("#sellQty").css('border', '2px solid transparent');
                $("#itemDiscount").css('border', '2px solid transparent');

                $("#btnDelete").click(function () {
                    let text = "Are you sure you want to remove this Item from cart?";

                    if (confirm(text) == true) {
                        tblOrderRow.remove();

                        var amount = getAmount(tblOrderRow.children(':nth-child(7)').text(),"reduce");
                        manageQty(tblOrderRow.children(':nth-child(4)').text(),"reduce");

                        calculateGrossAmount(gross,"reduce");
                        calculateNetAmount(net,"reduce");

                        $("#orderItemName").val("");
                        $("#orderItemCode").val("");
                        $("#orderKind").val("");
                        $("#orderQty").val("");
                        $("#orderPrice").val("");
                        $("#sellQty").val("");
                        $("#itemDiscount").val("");
                    } else {

                    }
                });

            }else if (ifDuplicate==true){

                if (click=="clicked"){
                    var amount = getAmount(net,"add");
                    manageQty(sellQty,"add");
                    calculateGrossAmount(gross,"add");
                    calculateNetAmount(net,"add");

                    $(tblOrderRow).children(':nth-child(4)').text(sellQty);
                    $(tblOrderRow).children(':nth-child(7)').text(amount);

                    $("#orderItemName").val("");
                    $("#orderItemCode").val("");
                    $("#orderKind").val("");
                    $("#orderQty").val("");
                    $("#orderPrice").val("");
                    $("#sellQty").val("");
                    $("#itemDiscount").val("");

                    $("#sellQty").css('border', '2px solid transparent');
                    $("#itemDiscount").css('border', '2px solid transparent');
                }else if (click=="not clicked"){
                    alert("Please Select A Row.");
                }

            }

        } else {

        }
    //}

    $("#tblOrder tbody > tr").click(function () {
        tblOrderRow=$(this);
        click="clicked";

        var code=tblOrderRow.children(':nth-child(1)').text();
        var trim1 = $.trim(code);
        var kind=tblOrderRow.children(':nth-child(2)').text();
        var trim2 = $.trim(kind);
        var iName=tblOrderRow.children(':nth-child(3)').text();
        var trim3 = $.trim(iName);
        var sellqty=tblOrderRow.children(':nth-child(4)').text();
        var trim4 = $.trim(sellqty);
        var price=tblOrderRow.children(':nth-child(5)').text();
        var trim5 = $.trim(price);
        var discount=tblOrderRow.children(':nth-child(6)').text();
        var trim6 = $.trim(discount);

        $("#orderItemCode").val(trim1);
        $("#orderKind").val(trim2);
        $("#orderItemName").val(trim3);
        $("#sellQty").val(trim4);
        $("#orderPrice").val(trim5);
        $("#itemDiscount").val(trim6);

        for (var i = 0; i < itemDB.length; i++) {
            if ($("#orderItemCode").val() == itemDB[i].code) {
                $("#orderQty").val(itemDB[i].qty);
            }
        }
    });

    $("#tblOrder tbody > tr").dblclick(function () {

        let text = "Are you sure you want to remove this Item from cart?";

        if (confirm(text) == true) {
            tblOrderRow.remove();

            var amount = getAmount(tblOrderRow.children(':nth-child(7)').text(),"reduce");
            manageQty(tblOrderRow.children(':nth-child(4)').text(),"reduce");

            calculateGrossAmount(gross,"reduce");
            calculateNetAmount(net,"reduce");

            $("#orderItemName").val("");
            $("#orderItemCode").val("");
            $("#orderKind").val("");
            $("#orderQty").val("");
            $("#orderPrice").val("");
            $("#sellQty").val("");
            $("#itemDiscount").val("");
        } else {

        }
    });
});

$("#btnClearCart").click(function () {
    $("#orderItemName").val("");
    $("#orderItemCode").val("");
    $("#orderKind").val("");
    $("#orderQty").val("");
    $("#orderPrice").val("");
    $("#sellQty").val("");
    $("#itemDiscount").val("");

    $("#sellQty").css('border', '2px solid transparent');
    $("#itemDiscount").css('border', '2px solid transparent');
});

/*-------------------Final Total----------------------*/

var regExCash=/^[0-9]{2,10}(.)[0-9]{2}$/;
var regExFinalDiscount=/^[0-9]{1,2}$/;

$("#cash").keyup(function (event) {

    let cash = $("#cash").val();
    if (regExCash.test(cash)){
        $("#cash").css('border','2px solid blue');
        $("#errorCash").text("");
        if (event.key=="Enter") {
            $("#discount").focus();
        }
    }else {
        $("#cash").css('border','2px solid red');
        $("#errorCash").text("Cash is a required field: Pattern 00.00");
    }
});

$("#discount").keyup(function () {

    let discount = $("#discount").val();
    if (regExFinalDiscount.test(discount)){
        $("#discount").css('border','2px solid blue');
        $("#errorFinalDiscount").text("");
    }else {
        $("#discount").css('border','2px solid red');
        $("#errorFinalDiscount").text("Discount is a required field: Pattern 0");
    }
});

$("#btnPurchase").click(function () {

    if($("#errorSellQty").text()!=""||$("#errorOrderId").text()!=""||$("#errordiscount").text()!=""||$("#errorCash").text()!=""||
        $("#errorFinalDiscount").text()!=""||$("#ids option:selected").val()==""||$("#orderId").val()==""||$("#orderDate").val()==""||
        $("#gross").val()==""||$("#net").val()==""||$("#cash").val()==""||$("#discount").val()=="") {
        $("#btnPurchase").disable();
    }else {

        let text = "Do you really want to place order?";

        if (confirm(text) == true) {

            let amountOfGross = $("#gross").val();
            let amountOfNet = $("#net").val();
            let orderDate = $("#orderDate").val();
            let cusIds = $("#ids option:selected").text();
            let orderId = $("#orderId").val();
            let cash = $("#cash").val();
            let discount = $("#discount").val();

            var order = {
                orderId: orderId,
                orderDate: orderDate,
                cusIds: cusIds,
                grossTotal: amountOfGross,
                netTotal: amountOfNet
            }

            var ifDuplicate = false;

            for (var j = 0; j < orderDB.length; j++) {
                if (orderId == orderDB[j].orderId) {
                    ifDuplicate = true;
                } else {
                    ifDuplicate = false;
                }
            }

            if (ifDuplicate == false) {
                orderDB.push(order);

                var rest=amountOfNet-(amountOfNet*discount/100);
                var balance=cash-rest;
                $("#balance").val(balance);

                $("#btnAddCart").attr('disabled',false);

                $("#orderDate").val("");
                $("#orderCusName").val("");
                $("#orderCusContact").val("");
                $("#orderCusNIC").val("");
                $("#orderCusAddress").val("");
                $("#orderId").val("");

                $("#orderId").css('border', '2px solid transparent');


            } else if (ifDuplicate == true) {
                alert("Something Wrong.");
            }
        }
    }

});