function disableOrderFields() {
    $("#OID").prop('disabled',true);
    $("#ODate").prop('disabled',true);
    $("#cusId").prop('disabled',true);
    $("#itemQty").prop('disabled',true);
    $("#grossAmount").prop('disabled',true);
    $("#netAmount").prop('disabled',true);
}

$("#btnSearchOrders").click(function () {
    var trimid=$.trim($("#searchOrderId").val());

    for (var i = 0; i < orderDB.length; i++) {
        if (trimid == orderDB[i].orderId){
            $("#cusId").val(orderDB[i].cusIds);
            $("#OID").val(trimid);
            $("#ODate").val(orderDB[i].orderDate);
            $("#netAmount").val(orderDB[i].netTotal);
            $("#grossAmount").val(orderDB[i].grossTotal);
        }
    }

    for (var i = 0; i < orderDetailsDB.length; i++) {
        if (trimid == orderDetailsDB[i].orderId){
            let raw = `<tr><td> ${orderDetailsDB[i].code} </td><td> ${orderDetailsDB[i].kind} </td><td> ${orderDetailsDB[i].name} </td><td> ${orderDetailsDB[i].sellQty} </td><td> ${orderDetailsDB[i].price} </td><td> ${orderDetailsDB[i].discount} </td><td> ${orderDetailsDB[i].total} </td></tr>`;
            $("#tblOrderDetail tbody").append(raw);
        }
    }

    $("#itemQty").val($("#tblOrderDetail tbody tr").length);
});

$("#btnClear").click(function () {
    $("#tblOrderDetail tbody").empty();
    $("#cusId").val("");
    $("#OID").val("");
    $("#ODate").val("");
    $("#netAmount").val("");
    $("#grossAmount").val("");
    $("#itemQty").val("");
    $("#searchOrderId").val("");
});