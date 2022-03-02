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

    $("#itemQty").val($("#tblOrderDetail tbody tr").length);
});