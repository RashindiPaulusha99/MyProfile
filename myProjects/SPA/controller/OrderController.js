
function disableFields() {
    $("#orderCusName").prop('disabled',true);
    $("#orderId").prop('disabled',true);
    $("#orderCusContact").prop('disabled',true);
    $("#orderCusId").prop('disabled',true);
    $("#orderCusAddress").prop('disabled',true);
    $("#orderCusNIC").prop('disabled',true);
    $("#orderItemName").prop('disabled',true);
    $("#orderItemCode").prop('disabled',true);
    $("#orderKind").prop('disabled',true);
    $("#orderPrice").prop('disabled',true);
    $("#orderQty").prop('disabled',true);
    $("#gross").prop('disabled',true);
    $("#net").prop('disabled',true);
}

var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

$('#orderDate').val(today);

function generateOrderId() {
    $("#orderId").val("O00-0001");
    var OrderId=orderDB[orderDB.length-1].orderId;
    var tempId = parseInt(OrderId.split("-")[1]);
    tempId = tempId+1;
    if (tempId <= 9){
        $("#orderId").val("O00-000"+tempId);
    }else if (tempId <= 99) {
        $("#orderId").val("O00-00" + tempId);
    }else if (tempId <= 999){
        $("#orderId").val("O00-0" + tempId);
    }else {
        $("#orderId").val("O00-"+tempId);
    }
}

$("#btnNew").click(function () {
    generateOrderId();
    $("#orderItemName").val("");
    $("#orderItemCode").val("");
    $("#orderKind").val("");
    $("#orderQty").val("");
    $("#orderPrice").val("");
    $("#sellQty").val("");
    $("#itemDiscount").val("");
    $("#orderCusName").val("");
    $("#orderCusId").val("");
    $("#orderCusAddress").val("");
    $("#orderCusNIC").val("");
    $("#orderCusContact").val("");
    $("#searchOrder").val("");
    $("#gross").val("");
    $("#net").val("");
    $("#cash").val("");
    $("#discount").val("");
    $("#balance").val("");
    $("#tblOrder tbody").empty();

    $("#sellQty").css('border', '2px solid transparent');
    $("#itemDiscount").css('border', '2px solid transparent');
    $("#discount").css('border', '2px solid transparent');
    $("#cash").css('border', '2px solid transparent');

});

$("#btnSearchOrder").click(function () {
    var trimid=$.trim($("#searchOrder").val());

    for (var i = 0; i < orderDB.length; i++) {
        if (trimid == orderDB[i].orderId){
            $("#orderCusId").val(orderDB[i].cusIds);
            $("#orderId").val(trimid);
            $("#orderDate").val(orderDB[i].orderDate);
            $("#net").val(orderDB[i].netTotal);
            $("#gross").val(orderDB[i].grossTotal);
        }
    }

    for (var i = 0; i < customerDB.length; i++) {
        if ($("#orderCusId").val() == customerDB[i].id){
            $("#orderCusName").val(customerDB[i].id);
            $("#orderCusNIC").val(customerDB[i].nic);
            $("#orderCusContact").val(customerDB[i].contact);
            $("#orderCusAddress").val(customerDB[i].address);
        }
    }

    for (var i = 0; i < orderDetailsDB.length; i++) {
        if (trimid == orderDetailsDB[i].orderId){
            let raw = `<tr><td> ${orderDetailsDB[i].code} </td><td> ${orderDetailsDB[i].kind} </td><td> ${orderDetailsDB[i].name} </td><td> ${orderDetailsDB[i].sellQty} </td><td> ${orderDetailsDB[i].price} </td><td> ${orderDetailsDB[i].discount} </td><td> ${orderDetailsDB[i].total} </td><td> <input id='btnEdit' class='btn btn-success btn-sm' value='Update' style="width: 75px"/> </td><td> <input id='btnDelete' class='btn btn-danger btn-sm' value='Delete' style="width: 75px"/> </td></tr>`;
            $("#tblOrder tbody").append(raw);
        }
    }
});

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
            $("#orderCusId").val(customerDB[i].id);
            $("#orderCusContact").val(customerDB[i].contact);
            $("#orderCusNIC").val(customerDB[i].nic);
            $("#orderCusAddress").val(customerDB[i].address);
        }
    }
});

/*-------------------Item Sec-----------------------*/

var regExSellQuantity=/^[0-9]{1,20}$/;
var regExDiscount=/^[0-9]{1,2}$/;

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

/* if update previous row , qtyOnHand changes */
function manageQty(qty,previousQty){
    var qty = parseInt(qty);
    var previousQty = parseInt(previousQty);
    for (var j = 0; j < itemDB.length; j++) {
        if ($("#orderItemCode").val() == itemDB[j].code){
            var manageQty=parseInt(itemDB[j].qty);
            manageQty+=previousQty;
            manageQty-=qty;
            itemDB[j].qty=manageQty;
        }
    }
}

/* if add new row , qtyOnHand changes */
function manageAddQty(qty){
    var votevalue = parseInt(qty);
    for (var j = 0; j < itemDB.length; j++) {
        if ($("#orderItemCode").val() == itemDB[j].code){
            var manageQty=parseInt(itemDB[j].qty);
            manageQty-=votevalue;
            itemDB[j].qty=manageQty;
        }
    }
}

/* if delete a row , qtyOnHand changes */
function manageReduceQty(qty){
    var votevalue = parseInt(qty);
    for (var j = 0; j < itemDB.length; j++) {
        if ($("#orderItemCode").val() == itemDB[j].code){
            var manageQty=parseInt(itemDB[j].qty);
            manageQty+=votevalue;
            itemDB[j].qty=manageQty;
        }
    }
}

/* if add new gross*/
var grossAmount=0;
function calculateGrossAmount(gross){
    grossAmount+=gross;
    $("#gross").val(grossAmount);
}

/* if update new gross*/
function updateGrossAmount(gross,previousGross){
    grossAmount-=previousGross;
    grossAmount+=gross;
    $("#gross").val(grossAmount);
}

/* if delete gross*/
function deleteGrossAmount(gross){
    grossAmount-=gross;
    $("#gross").val(grossAmount);
}

/* if add new net*/
var netAmount=0;
function calculateNetAmount(net){
    netAmount+=net;
    $("#net").val(netAmount);
}

/* if update new net*/
function updateNetAmount(net,previousNet){
    netAmount-=previousNet;
    netAmount+=net;
    $("#net").val(netAmount);
}

/* if delete net*/
function deleteNetAmount(net){
    netAmount-=net;
    $("#net").val(netAmount);
}

var tblOrderRow;
var click="not clicked";

$("#btnAddCart").click(function () {

    $("#tblOrder tbody > tr").off("click");
    $("#tblOrder tbody").off("click",'#btnDelete');

    if($("#errorSellQty").text()!=""||$("#errorOrderId").text()!=""||$("#errordiscount").text()!=""||$("#ids option:selected").val()==""||
        $("#codes option:selected").val()==""||$("#sellQty").val()==""||$("#orderId").val()==""||$("#orderDate").val()==""){
        $("#btnAddCart").disable();
    }else {

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

            var ifDuplicate=false;

            for (var i = 0; i < $("#tblOrder tbody tr").length; i++) {
                if($("#orderItemCode").val()==$("#tblOrder tbody tr").children(':nth-child(1)')[i].innerText){
                    ifDuplicate=true;
                }
            }

            if (ifDuplicate!=true){

                manageAddQty(sellQty);
                calculateGrossAmount(gross);
                calculateNetAmount(net);

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

                $("#tblOrder tbody").on('click','#btnDelete',function () {

                    let text = "Are you sure you want to remove this Item from cart?";

                    if (confirm(text) == true) {
                        tblOrderRow.remove();

                        manageReduceQty(tblOrderRow.children(':nth-child(4)').text());
                        var preGross=parseInt($(tblOrderRow).children(':nth-child(4)').text())*$("#orderPrice").val();
                        deleteGrossAmount(preGross);
                        var delNet=parseInt($(tblOrderRow).children(':nth-child(7)').text());
                        deleteNetAmount(delNet);

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

                    manageQty(sellQty,$(tblOrderRow).children(':nth-child(4)').text());
                    var previousGross=parseInt($(tblOrderRow).children(':nth-child(4)').text())*unitPrice;
                    updateGrossAmount(gross,previousGross);
                    updateNetAmount(net,$(tblOrderRow).children(':nth-child(7)').text());

                    $(tblOrderRow).children(':nth-child(4)').text(sellQty);
                    $(tblOrderRow).children(':nth-child(7)').text(net);

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

    }

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

            for (var i = 0; i < $("#tblOrder tbody tr").length; i++) {
                var orderDetails={
                    orderId:orderId,
                    code:$("#tblOrder tbody tr").children(':nth-child(1)')[i].innerText,
                    kind:$("#tblOrder tbody tr").children(':nth-child(2)')[i].innerText,
                    name:$("#tblOrder tbody tr").children(':nth-child(3)')[i].innerText,
                    sellQty:$("#tblOrder tbody tr").children(':nth-child(4)')[i].innerText,
                    price:$("#tblOrder tbody tr").children(':nth-child(5)')[i].innerText,
                    discount:$("#tblOrder tbody tr").children(':nth-child(6)')[i].innerText,
                    total:$("#tblOrder tbody tr").children(':nth-child(7)')[i].innerText
                }
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
                for (var i = 0; i < $("#tblOrder tbody tr").length; i++) {
                    var orderDetails={
                        orderId:orderId,
                        code:$("#tblOrder tbody tr").children(':nth-child(1)')[i].innerText,
                        kind:$("#tblOrder tbody tr").children(':nth-child(2)')[i].innerText,
                        name:$("#tblOrder tbody tr").children(':nth-child(3)')[i].innerText,
                        price:$("#tblOrder tbody tr").children(':nth-child(5)')[i].innerText,
                        sellQty:$("#tblOrder tbody tr").children(':nth-child(4)')[i].innerText,
                        discount:$("#tblOrder tbody tr").children(':nth-child(6)')[i].innerText,
                        total:$("#tblOrder tbody tr").children(':nth-child(7)')[i].innerText
                    }
                    orderDetailsDB.push(orderDetails);
                }

                var rest=amountOfNet-(amountOfNet*discount/100);
                var balance=cash-rest;
                $("#balance").val(balance);

                $("#btnAddCart").attr('disabled',false);

            } else if (ifDuplicate == true) {
                alert("Something Wrong.");
            }
        }
    }

});