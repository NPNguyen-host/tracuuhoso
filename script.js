const input = document.getElementById("mahoso");

const btn = document.getElementById("btnSearch");

const loading = document.getElementById("loading");

const btnText = document.getElementById("btnText");


// Tự chuyển thành chữ in hoa
input.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});


// Enter để tra cứu
input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        btn.click();

    }

});


// Tra cứu
btn.onclick = function () {

    let mahs = input.value.trim();

    if (mahs == "") {

        alert("Vui lòng nhập mã hồ sơ!");

        input.focus();

        return;

    }

    // Hiện spinner
    loading.style.display = "inline-block";

    btnText.innerHTML = "ĐANG TRA CỨU";

    btn.disabled = true;

    // Giả lập thời gian tra cứu
    setTimeout(function () {

        loading.style.display = "none";

        btnText.innerHTML = "TRA CỨU";

        btn.disabled = false;

        alert("Đã tìm mã: " + mahs);

    },1000);

};
