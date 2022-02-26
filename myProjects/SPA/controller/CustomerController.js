var regExCusID=/^(C00-)[0-9]{3,4}$/;
var regExCusName=/^[A-Z|a-z\s]{3,20}$/;
var regExCusGender=/^[^0-9](female)|(male)|(Female)|(Male)$/;
var regExCusContact=/^(071-|077-|075-|078-|)[0-9]{7}$/;
var regExCusNIC=/^[0-9]{9}(v)$/;
var regExCusAddress=/^[0-9A-Z a-z,/:]{4,50}$/;
var regExCusEmail=/^[0-9A-Z a-z$&#]{3,10}(@gmail.com)|(@yahoo.com)$/;

$("#customerId").keyup(function (event) {

    let id = $("#customerId").val();

    if (regExCusID.test(id)){
        $("#customerId").css('border','2px solid green');
        $("#errorId").text("");
        if (event.key=="Enter"){
            $("#nameOfCustomer").focus();
        }
    }else {
        $("#customerId").css('border','2px solid red');
        $("#errorId").text("Customer Id is a required field: Pattern C00-000");
    }
});

$("#nameOfCustomer").keyup(function (event) {

    let name = $("#nameOfCustomer").val();
    if (regExCusName.test(name)){
        $("#nameOfCustomer").css('border','2px solid green');
        $("#errorName").text("");
        if (event.key=="Enter"){
            $("#gender").focus();
        }
    }else {
        $("#nameOfCustomer").css('border','2px solid red');
        $("#errorName").text("Customer Name is a required field: Min 3, Max 20, Spaces Allowed.");
    }
});

$("#gender").keyup(function (event) {

    let gender = $("#gender").val();
    if (regExCusGender.test(gender)){
        $("#gender").css('border','2px solid green');
        $("#errorGender").text("");
        if (event.key=="Enter"){
            $("#contact").focus();
        }
    }else {
        $("#gender").css('border','2px solid red');
        $("#errorGender").text("Gender is a required field: Female or Male");
    }
});

$("#contact").keyup(function (event) {

    let contact = $("#contact").val();
    if (regExCusContact.test(contact)){
        $("#contact").css('border','2px solid green');
        $("#errorContact").text("");
        if (event.key=="Enter"){
            $("#nic").focus();
        }
    }else {
        $("#contact").css('border','2px solid red');
        $("#errorContact").text("Contact is a required field: Pattern 07x-xxxxxxx");
    }
});

$("#nic").keyup(function (event) {

    let nic = $("#nic").val();
    if (regExCusNIC.test(nic)){
        $("#nic").css('border','2px solid green');
        $("#errorNIC").text("");
        if (event.key=="Enter"){
            $("#address").focus();
        }
    }else {
        $("#nic").css('border','2px solid red');
        $("#errorNIC").text("NIC is a required field: 9 Digit and v");
    }
});

$("#address").keyup(function (event) {

    let address = $("#address").val();
    if (regExCusAddress.test(address)){
        $("#address").css('border','2px solid green');
        $("#errorAddress").text("");
        if (event.key=="Enter"){
            $("#email").focus();
        }
    }else {
        $("#address").css('border','2px solid red');
        $("#errorAddress").text("Address is a required field: Min 4");
    }
});

$("#email").keyup(function (event) {

    let email = $("#email").val();
    if (regExCusEmail.test(email)){
        $("#email").css('border','2px solid green');
        $("#errorEmail").text("");

        if (event.key=="Enter"){

            let text = "Do you really want to save this Customer?";

            if (confirm(text) == true) {

                let cusId = $("#customerId").val();
                let cusName = $("#nameOfCustomer").val();
                let cusGender = $("#gender").val();
                let cusContact = $("#contact").val();
                let cusNIC = $("#nic").val();
                let cusAddress = $("#address").val();
                let cusEmail = $("#email").val();

                var cusDetails={
                    id:cusId,
                    name:cusName,
                    gender:cusGender,
                    contact:cusContact,
                    nic:cusNIC,
                    address:cusAddress,
                    email:cusEmail
                }

                var ifDuplicate=false;

                var id=$("#customerId").val();
                var trim = $.trim(id);

                for (var j = 0; j < customerDB.length; j++) {
                    if (trim == customerDB[j].id){
                        ifDuplicate = true;
                    }else {
                        ifDuplicate = false;
                    }
                }

                if (ifDuplicate == false){
                    customerDB.push(cusDetails);
                    $("#tblCustomer tbody").empty();

                    for (var i = 0; i < customerDB.length; i++) {
                        let raw = `<tr><td> ${customerDB[i].id} </td><td> ${customerDB[i].name} </td><td> ${customerDB[i].gender} </td><td> ${customerDB[i].contact} </td><td> ${customerDB[i].nic} </td><td> ${customerDB[i].address} </td><td> ${customerDB[i].email} </td></tr>`;
                        $("#tblCustomer tbody").append(raw);
                    }

                    $("#customerId").val("");
                    $("#nameOfCustomer").val("");
                    $("#gender").val("");
                    $("#contact").val("");
                    $("#nic").val("");
                    $("#address").val("");
                    $("#email").val("");

                    $("#customerId").css('border','2px solid transparent');
                    $("#nameOfCustomer").css('border','2px solid transparent');
                    $("#gender").css('border','2px solid transparent');
                    $("#contact").css('border','2px solid transparent');
                    $("#nic").css('border','2px solid transparent');
                    $("#address").css('border','2px solid transparent');
                    $("#email").css('border','2px solid transparent');

                }else {
                    alert("Already Exists");
                }

            } else {

            }
        }
    }else {
        $("#email").css('border','2px solid red');
        $("#errorEmail").text("Email is a required field: At least 6 characters with symbols");
    }

    $("#tblCustomer tbody > tr").click(function () {

        tblCustomerRow=$(this);

        $("#customerId").val($(this).children(':nth-child(1)').text());
        $("#nameOfCustomer").val($(this).children(':nth-child(2)').text());
        $("#gender").val($(this).children(':nth-child(3)').text());
        $("#contact").val($(this).children(':nth-child(4)').text());
        $("#nic").val($(this).children(':nth-child(5)').text());
        $("#address").val($(this).children(':nth-child(6)').text());
        $("#email").val($(this).children(':nth-child(7)').text());

    });

    $("#tblCustomer tbody > tr").dblclick(function () {

        let text = "Are you sure you want to delete this Customer?";
        if (confirm(text) == true) {
            tblCustomerRow.remove();

            var index=-1;
            var id=$("#customerId").val();
            var trim=$.trim(id);

            for (var i = 0; i < customerDB.length; i++) {
                if (trim == customerDB[i].id){
                    index=i;
                }
            }
            customerDB.splice(index,1);

            $("#customerId").val("");
            $("#nameOfCustomer").val("");
            $("#gender").val("");
            $("#contact").val("");
            $("#nic").val("");
            $("#address").val("");
            $("#email").val("");
        } else {

        }
    });
});

$('#customerId,#nameOfCustomer,#gender,#contact,#nic,#address,#email').keydown(function (e) {
    if (e.key=="Tab"){
        e.preventDefault();
    }
});

/*function validation() {
    let id = $("#customerId").val();
    let name = $("#nameOfCustomer").val();
    let gender = $("#gender").val();
    let contact = $("#contact").val();
    let nic = $("#nic").val();
    let address = $("#address").val();
    let email = $("#email").val();

    if (regExCusID.test(id)){
        $("#customerId").css('border','2px solid green');
        $("#errorId").text("");
    }else {
        $("#customerId").css('border','2px solid red');
        $("#errorId").text("Customer Id is a required field: Pattern C00-000");
    }

    if (regExCusName.test(name)){
        $("#nameOfCustomer").css('border','2px solid green');
        $("#errorName").text("");
    }else {
        $("#nameOfCustomer").css('border','2px solid red');
        $("#errorName").text("Customer Name is a required field: Min 3, Max 20, Spaces Allowed.");
    }

    if (regExCusGender.test(gender)){
        $("#gender").css('border','2px solid green');
        $("#errorGender").text("");
    }else {
        $("#gender").css('border','2px solid red');
        $("#errorGender").text("Gender is a required field: Female or Male");
    }

    if (regExCusContact.test(contact)){
        $("#contact").css('border','2px solid green');
        $("#errorContact").text("");
    }else {
        $("#contact").css('border','2px solid red');
        $("#errorContact").text("Contact is a required field: Pattern 07x-xxxxxxx");
    }

    if (regExCusNIC.test(nic)){
        $("#nic").css('border','2px solid green');
        $("#errorNIC").text("");
    }else {
        $("#nic").css('border','2px solid red');
        $("#errorNIC").text("NIC is a required field: 9 Digit and v");
    }

    if (regExCusAddress.test(address)){
        $("#address").css('border','2px solid green');
        $("#errorAddress").text("");
    }else {
        $("#address").css('border','2px solid red');
        $("#errorAddress").text("Address is a required field: Min 4");
    }

    if (regExCusEmail.test(email)) {
        $("#email").css('border', '2px solid green');
        $("#errorEmail").text("");
    }else {
        $("#email").css('border','2px solid red');
        $("#errorEmail").text("Email is a required field: At least 6 characters with symbols");
    }

    /!*if (regExCusID.test(id)){
        $("#customerId").css('border','2px solid green');
        $("#errorId").text("");
        if (regExCusName.test(name)){
            $("#nameOfCustomer").css('border','2px solid green');
            $("#errorName").text("");
            if (regExCusGender.test(gender)){
                $("#gender").css('border','2px solid green');
                $("#errorGender").text("");
                if (regExCusContact.test(contact)){
                    $("#contact").css('border','2px solid green');
                    $("#errorContact").text("");
                    if (regExCusNIC.test(nic)){
                        $("#nic").css('border','2px solid green');
                        $("#errorNIC").text("");
                        if (regExCusAddress.test(address)){
                            $("#address").css('border','2px solid green');
                            $("#errorAddress").text("");
                            if (regExCusEmail.test(email)) {
                                $("#email").css('border', '2px solid green');
                                $("#errorEmail").text("");
                            }else {
                                $("#email").css('border','2px solid red');
                                $("#errorEmail").text("Email is a required field: At least 6 characters with symbols");
                            }
                        }else {
                            $("#address").css('border','2px solid red');
                            $("#errorAddress").text("Address is a required field: Min 4");
                        }
                    }else {
                        $("#nic").css('border','2px solid red');
                        $("#errorNIC").text("NIC is a required field: 9 Digit and v");
                    }
                }else {
                    $("#contact").css('border','2px solid red');
                    $("#errorContact").text("Contact is a required field: Pattern 07x-xxxxxxx");
                }
            }else {
                $("#gender").css('border','2px solid red');
                $("#errorGender").text("Gender is a required field: Female or Male");
            }
        }else {
            $("#nameOfCustomer").css('border','2px solid red');
            $("#errorName").text("Customer Name is a required field: Min 3, Max 20, Spaces Allowed.");
        }
    }else {
        $("#customerId").css('border','2px solid red');
        $("#errorId").text("Customer Id is a required field: Pattern C00-000");
    }*!/
}*/

/*function focus(event) {
    let id = $("#customerId").val();
    let name = $("#nameOfCustomer").val();
    let gender = $("#gender").val();
    let contact = $("#contact").val();
    let nic = $("#nic").val();
    let address = $("#address").val();
    let email = $("#email").val();

    if (regExCusID.test(id)){
        if (event.key=="Enter") {
            $("#nameOfCustomer").focus();
        }
    }else if (regExCusName.test(name)) {
        if (event.key == "Enter") {
            $("#gender").focus();
        }
    }else if (regExCusGender.test(gender)) {
        if (event.key == "Enter") {
            $("#contact").focus();
        }
    }else if (regExCusContact.test(contact)) {
        if (event.key == "Enter") {
            $("#nic").focus();
        }
    }else if (regExCusNIC.test(nic)) {
        if (event.key == "Enter") {
            $("#address").focus();
        }
    }else if (regExCusAddress.test(address)) {
        if (event.key == "Enter") {
            $("#email").focus();
        }
    }

    /!*if (regExCusID.test(id)){
        if (event.key=="Enter"){
            $("#nameOfCustomer").focus();
            if (regExCusName.test(name)){
                if (event.key=="Enter"){
                    $("#gender").focus();
                    if (regExCusGender.test(gender)){
                        if (event.key=="Enter"){
                            $("#contact").focus();
                            if (regExCusContact.test(contact)){
                                if (event.key=="Enter"){
                                    $("#nic").focus();
                                    if (regExCusNIC.test(nic)){
                                        if (event.key=="Enter"){
                                            $("#address").focus();
                                            if (regExCusAddress.test(address)){
                                                if (event.key=="Enter"){
                                                    $("#email").focus();
                                                    if (regExCusEmail.test(email)){
                                                        if (event.key=="Enter"){
                                                            loadAll();
                                                        }
                                                    }else {
                                                        /!*$("#email").focus();*!/
                                                    }
                                                }
                                            }else {
                                                /!*$("#address").focus();*!/
                                            }
                                        }
                                    }else {
                                        /!*$("#nic").focus();*!/
                                    }
                                }
                            }else {
                                /!*$("#contact").focus();*!/
                            }
                        }
                    }else {
                        /!*$("#gender").focus();*!/
                    }
                }
            }else {
                /!*$("#nameOfCustomer").focus();*!/
            }
        }
    }else {
        /!*$("#customerId").focus();*!/
    }*!/
}*/

/*function loadAll() {

    let text = "Do you really want to save this Customer?";
    if (confirm(text) == true) {
        let cusId = $("#customerId").val();
        let cusName = $("#nameOfCustomer").val();
        let cusGender = $("#gender").val();
        let cusContact = $("#contact").val();
        let cusNIC = $("#nic").val();
        let cusAddress = $("#address").val();
        let cusEmail = $("#email").val();
        let raw = `<tr><td> ${cusId} </td><td> ${cusName} </td><td> ${cusGender} </td><td> ${cusContact} </td><td> ${cusNIC} </td><td> ${cusAddress} </td><td> ${cusEmail} </td></tr>`;
        $("#tblCustomer tbody").append(raw);

        $("#customerId").val("");
        $("#nameOfCustomer").val("");
        $("#gender").val("");
        $("#contact").val("");
        $("#nic").val("");
        $("#address").val("");
        $("#email").val("");

        $("#customerId").css('border', '2px solid transparent');
        $("#nameOfCustomer").css('border', '2px solid transparent');
        $("#gender").css('border', '2px solid transparent');
        $("#contact").css('border', '2px solid transparent');
        $("#nic").css('border', '2px solid transparent');
        $("#address").css('border', '2px solid transparent');
        $("#email").css('border', '2px solid transparent');
    }
}*/

var tblCustomerRow;

$("#btnSaveCustomer").click(function () {

    $("#tblCustomer tbody > tr").off("click");
    $("#tblCustomer tbody > tr").off("dblclick");

    if($("#errorId").text()!=""||$("#errorName").text()!=""||$("#errorGender").text()!=""||$("#errorContact").text()!=""||$("#errorNIC").text()!=""||$("#errorAddress").text()!=""||$("#errorEmail").text()!=""||
        $("#customerId").val()==""||$("#nameOfCustomer").val()==""||$("#gender").val()==""||$("#contact").val()==""||$("#nic").val()==""||$("#address").val()==""||$("#email").val()=="") {
        $("#btnSaveCustomer").disable();

    }else {

        let text = "Do you really want to save this Customer?";

        if (confirm(text) == true) {

            let cusId = $("#customerId").val();
            let cusName = $("#nameOfCustomer").val();
            let cusGender = $("#gender").val();
            let cusContact = $("#contact").val();
            let cusNIC = $("#nic").val();
            let cusAddress = $("#address").val();
            let cusEmail = $("#email").val();

            var cusDetails={
                id:cusId,
                name:cusName,
                gender:cusGender,
                contact:cusContact,
                nic:cusNIC,
                address:cusAddress,
                email:cusEmail
            }

            var ifDuplicate=false;

            var id=$("#customerId").val();
            var trim = $.trim(id);

            for (var j = 0; j < customerDB.length; j++) {
                if (trim == customerDB[j].id){
                    ifDuplicate = true;
                }else {
                    ifDuplicate = false;
                }
            }

            if (ifDuplicate == false){
                customerDB.push(cusDetails);
                $("#tblCustomer tbody").empty();

                for (var i = 0; i < customerDB.length; i++) {
                    let raw = `<tr><td> ${customerDB[i].id} </td><td> ${customerDB[i].name} </td><td> ${customerDB[i].gender} </td><td> ${customerDB[i].contact} </td><td> ${customerDB[i].nic} </td><td> ${customerDB[i].address} </td><td> ${customerDB[i].email} </td></tr>`;
                    $("#tblCustomer tbody").append(raw);
                }

                $("#customerId").val("");
                $("#nameOfCustomer").val("");
                $("#gender").val("");
                $("#contact").val("");
                $("#nic").val("");
                $("#address").val("");
                $("#email").val("");

                $("#customerId").css('border','2px solid transparent');
                $("#nameOfCustomer").css('border','2px solid transparent');
                $("#gender").css('border','2px solid transparent');
                $("#contact").css('border','2px solid transparent');
                $("#nic").css('border','2px solid transparent');
                $("#address").css('border','2px solid transparent');
                $("#email").css('border','2px solid transparent');

            }else {
                alert("Already Exists");
            }

        } else {

        }
    }

    $("#tblCustomer tbody > tr").click(function () {

        tblCustomerRow=$(this);

        var id=tblCustomerRow.children(':nth-child(1)').text();
        var trim1 = $.trim(id);
        var name=tblCustomerRow.children(':nth-child(2)').text();
        var trim2 = $.trim(name);
        var gender=tblCustomerRow.children(':nth-child(3)').text();
        var trim3 = $.trim(gender);
        var contact=tblCustomerRow.children(':nth-child(4)').text();
        var trim4 = $.trim(contact);
        var nic=tblCustomerRow.children(':nth-child(5)').text();
        var trim5 = $.trim(nic);
        var address=tblCustomerRow.children(':nth-child(6)').text();
        var trim6 = $.trim(address);
        var email=tblCustomerRow.children(':nth-child(7)').text();
        var trim7 = $.trim(email);

        $("#customerId").val(trim1);
        $("#nameOfCustomer").val(trim2);
        $("#gender").val(trim3);
        $("#contact").val(trim4);
        $("#nic").val(trim5);
        $("#address").val(trim6);
        $("#email").val(trim7);

    });

    $("#tblCustomer tbody > tr").dblclick(function () {

        let text = "Are you sure you want to delete this Customer?";
        if (confirm(text) == true) {
            tblCustomerRow.remove();

            var index=-1;
            var id=$("#customerId").val();
            var trim=$.trim(id);

            for (var i = 0; i < customerDB.length; i++) {
                if (trim==customerDB[i].id){
                    index=i;
                }
            }
            customerDB.splice(index,1);

            $("#customerId").val("");
            $("#nameOfCustomer").val("");
            $("#gender").val("");
            $("#contact").val("");
            $("#nic").val("");
            $("#address").val("");
            $("#email").val("");
        } else {

        }
    });

});

$("#btnClearCustomer").click(function () {
    $("#customerId").val("");
    $("#nameOfCustomer").val("");
    $("#gender").val("");
    $("#contact").val("");
    $("#nic").val("");
    $("#address").val("");
    $("#email").val("");
    $("#searchCustomer").val("");

    $("#customerId").css('border', '2px solid transparent');
    $("#nameOfCustomer").css('border', '2px solid transparent');
    $("#gender").css('border', '2px solid transparent');
    $("#contact").css('border', '2px solid transparent');
    $("#nic").css('border', '2px solid transparent');
    $("#address").css('border', '2px solid transparent');
    $("#email").css('border', '2px solid transparent');
});

$("#btnDeleteCustomer").click(function () {

    if($("#errorId").text()!=""||$("#errorName").text()!=""||$("#errorGender").text()!=""||$("#errorContact").text()!=""||$("#errorNIC").text()!=""||$("#errorAddress").text()!=""||$("#errorEmail").text()!=""||
        $("#customerId").val()==""||$("#nameOfCustomer").val()==""||$("#gender").val()==""||$("#contact").val()==""||$("#nic").val()==""||$("#address").val()==""||$("#email").val()==""){
        $("#btnDeleteCustomer").disable();
    }else {

        let text = "Are you sure you want to delete this Customer?";
        if (confirm(text) == true) {
            tblCustomerRow.remove();

            var index=-1;
            var id=$("#customerId").val();
            var trim=$.trim(id);

            for (var i = 0; i < customerDB.length; i++) {
                if (trim==customerDB[i].id){
                    index=i;
                }
            }
            customerDB.splice(index,1);

            $("#customerId").val("");
            $("#nameOfCustomer").val("");
            $("#gender").val("");
            $("#contact").val("");
            $("#nic").val("");
            $("#address").val("");
            $("#email").val("");
        } else {

        }
    }

});

$("#btnEditCustomer").click(function () {

    if($("#errorId").text()!=""||$("#errorName").text()!=""||$("#errorGender").text()!=""||$("#errorContact").text()!=""||$("#errorNIC").text()!=""||$("#errorAddress").text()!=""||$("#errorEmail").text()!=""||
        $("#customerId").val()==""||$("#nameOfCustomer").val()==""||$("#gender").val()==""||$("#contact").val()==""||$("#nic").val()==""||$("#address").val()==""||$("#email").val()==""){
        $("#btnEditCustomer").disable();
    }else {

        let text = "Do you really want to update this Customer?";

        if (confirm(text) == true) {
            let cusId = $("#customerId").val();
            let cusName = $("#nameOfCustomer").val();
            let cusGender = $("#gender").val();
            let cusContact = $("#contact").val();
            let cusNIC = $("#nic").val();
            let cusAddress = $("#address").val();
            let cusEmail = $("#email").val();

            $(tblCustomerRow).children(':nth-child(1)').text(cusId);
            $(tblCustomerRow).children(':nth-child(2)').text(cusName);
            $(tblCustomerRow).children(':nth-child(3)').text(cusGender);
            $(tblCustomerRow).children(':nth-child(4)').text(cusContact);
            $(tblCustomerRow).children(':nth-child(5)').text(cusNIC);
            $(tblCustomerRow).children(':nth-child(6)').text(cusAddress);
            $(tblCustomerRow).children(':nth-child(7)').text(cusEmail);

            var count=-1;
            for (var i = 0; i < customerDB.length; i++) {

                var id=$("#customerId").val();
                var trim=$.trim(id);

                if (trim == customerDB[i].id){
                    customerDB[i].id=cusId;
                    customerDB[i].name=cusName;
                    customerDB[i].gender=cusGender;
                    customerDB[i].contact=cusContact;
                    customerDB[i].nic=cusNIC;
                    customerDB[i].address=cusAddress;
                    customerDB[i].email=cusEmail;
                }
            }

            $("#customerId").val("");
            $("#nameOfCustomer").val("");
            $("#gender").val("");
            $("#contact").val("");
            $("#nic").val("");
            $("#address").val("");
            $("#email").val("");

            $("#customerId").css('border', '2px solid transparent');
            $("#nameOfCustomer").css('border', '2px solid transparent');
            $("#gender").css('border', '2px solid transparent');
            $("#contact").css('border', '2px solid transparent');
            $("#nic").css('border', '2px solid transparent');
            $("#address").css('border', '2px solid transparent');
            $("#email").css('border', '2px solid transparent');

        } else {

        }
    }
});

$("#btnSearchCustomer").click(function () {
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#searchCustomer").val()==customerDB[i].id){
            $("#customerId").val(customerDB[i].id);
            $("#nameOfCustomer").val(customerDB[i].name);
            $("#gender").val(customerDB[i].gender);
            $("#contact").val(customerDB[i].contact);
            $("#nic").val(customerDB[i].nic);
            $("#address").val(customerDB[i].address());
            $("#email").val(customerDB[i].email);
        }else {
            alert("No Such Customer");
        }
    }
});