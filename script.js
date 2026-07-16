console.log("Website hoạt động");
const input = document.getElementById("mahoso");

input.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        document.getElementById("btnSearch").click();

    }

});

document.getElementById("btnSearch").onclick=function(){

    let mahs=input.value.trim();

    if(mahs===""){

        alert("Vui lòng nhập mã hồ sơ!");

        input.focus();

        return;

    }

    alert("Bạn vừa nhập: "+mahs);

}
