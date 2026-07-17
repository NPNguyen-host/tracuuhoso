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

    // Kiểm tra dữ liệu nhập
   if (mahs === "") {

    document.getElementById("thongbao").innerHTML = `
    document.getElementById("ketqua").innerHTML = "";
        <div class="alert alert-warning">
            Vui lòng nhập số Căn cước công dân của thí sinh cần tra cứu.
        </div>
    `;

    input.focus();
    return;
}
    
    if (!/^\d{12}$/.test(mahs)) {

    document.getElementById("thongbao").innerHTML = `
    document.getElementById("ketqua").innerHTML = "";
    <div class="alert alert-danger">
        Số Căn cước công dân phải gồm đúng 12 chữ số.
    </div>`;

    input.focus();
    return;
}

// Xóa thông báo khi hợp lệ
document.getElementById("thongbao").innerHTML = "";

    // Hiện spinner
    loading.style.display = "inline-block";
    btnText.innerHTML = "ĐANG TRA CỨU";
    btn.disabled = true;

    // Giả lập thời gian xử lý (300ms)
    setTimeout(() => {

        // Tìm trong file JSON
        const ketQua = danhSachHoSo.find(item => item.CCCD === mahs);

        // Ẩn spinner
        loading.style.display = "none";
        btnText.innerHTML = "TRA CỨU";
        btn.disabled = false;

        // Hiển thị kết quả
        if (ketQua) {

            document.getElementById("ketqua").innerHTML = `
                <div class="card shadow mt-4">
                    <div class="card-body">

                        <h4 class="text-primary text-center mb-3">
                            KẾT QUẢ TRA CỨU
                        </h4>

                        <table class="table table-bordered">

                            <tr>
                                <th>Họ và tên</th>
                                <td>${ketQua.HOTEN}</td>
                            </tr>

                            <tr>
                                <th>Ngày sinh</th>
                                <td>${ketQua.NGAYSINH}</td>
                            </tr>

                            <tr>
                                <th>Giới tính</th>
                                <td>${ketQua.GIOITINH}</td>
                            </tr>

                            <tr>
                                <th>Trường THCS</th>
                                <td>${ketQua.TRUONGTHCS}</td>
                            </tr>

                            <tr>
                                <th>Điểm xét tuyển</th>
                                <td>${ketQua.DIEMXETTUYEN}</td>
                            </tr>

                                <td>${ketQua.KETQUA === "Trúng tuyển"
                                ? '<span class="badge bg-success fs-6">TRÚNG TUYỂN</span>'
                                : '<span class="badge bg-danger fs-6">KHÔNG TRÚNG TUYỂN</span>'
                                }
                            </td>

                        </table>

                    </div>
                </div>
            `;

        } else {

    // Xóa kết quả cũ
    document.getElementById("ketqua").innerHTML = "";

    // Hiển thị thông báo ngay dưới ô nhập
    document.getElementById("thongbao").innerHTML = `
        <div class="alert alert-danger text-center">
            <strong>Không tìm thấy thông tin!</strong><br>
            Vui lòng kiểm tra lại số Căn cước công dân.
        </div>
    `;

}

    }, 300);

};
