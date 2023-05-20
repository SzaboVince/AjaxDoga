const url="https://retoolapi.dev/YGTHAD/customers";

$(function(){
    listazas();
    $("#person").submit(function(a){
        a.preventDefault();
        const name=$("#name").val();
        const address=$("#address").val();
        const email=$("#email").val();
        const faszi={
            name:name,
            address:address,
            email:email
        }
        $.post(url,faszi,
            function(data,textStatus,jqXHR){
                if (textStatus==="success"){
                    $("#name").val("");
                    $("#address").val("");
                    $("#email").val("");
                    listazas();
                }
            },
            "json"
            )
    })
})

function listazas(){
    $.get(url,function(data,textStatus){
        let html=""
        data.forEach(faszi => {
            html+=`<tr>
            <td>${faszi.id}</td>
            <td>${faszi.name}</td>
            <td>${faszi.address}</td>
            <td>${faszi.email}</td>
            <td>
            <i onclick="deletePerson(${faszi.id})" class="fa fa-remove"></i>
            </td>
            </tr>`;
        });
        $("#table").html(html);
    },
    "json");
}


function deletePerson(personId) {
    $.ajax({
        type: "DELETE",
        url: `${url}/${personId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listazas();
            }
        }
    });
}