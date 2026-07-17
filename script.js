// Dữ liệu hồ sơ
let danhSachHoSo = [];

// Đọc file JSON
fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        danhSachHoSo = data;
        console.log("Đã tải", danhSachHoSo.length, "hồ sơ.");
    })
    .catch(error => {
        console.error("Không đọc được data.json:", error);
    });

const input = document.getElementById("mahoso");

const btn = document.getElementById("btnSearch");

const loading = document.getElementById("loading");

const btnText = document.getElementById("btnText");


// Chỉ cho phép nhập số và tối đa 12 chữ số
input.addEventListener("input", function () {

    // Loại bỏ tất cả ký tự không phải số
    this.value = this.value.replace(/\D/g, "");

    // Giới hạn tối đa 12 chữ số
    if (this.value.length > 12) {
        this.value = this.value.slice(0, 12);
    }

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

    if (mahs === "") {
    alert("Vui lòng nhập số Căn cước công dân của thí sinh cần tra cứu!");
    input.focus();
    return;
}

if (!/^\d{12}$/.test(mahs)) {
    alert("Số Căn cước công dân phải gồm đúng 12 chữ số.");
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
