// =========================
// HỆ THỐNG TRA CỨU HỒ SƠ
// THPT NGUYỄN QUANG DIÊU
// =========================

// Danh sách hồ sơ
let danhSachHoSo = [];

// Lấy các thành phần trên giao diện
const input = document.getElementById("mahoso");
const btn = document.getElementById("btnSearch");
const loading = document.getElementById("loading");
const btnText = document.getElementById("btnText");
const ketqua = document.getElementById("ketqua");
const thongbao = document.getElementById("thongbao");


// =========================
// ĐỌC FILE JSON
// =========================

fetch("data/data.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Không tìm thấy data.json");
        }

        return response.json();

    })

    .then(data => {

        danhSachHoSo = data;

        console.log("Đã tải", danhSachHoSo.length, "hồ sơ.");

    })

    .catch(error => {

        console.error(error);

        thongbao.innerHTML = `
            <div class="alert alert-danger text-center">
                Không thể tải dữ liệu tra cứu.
            </div>
        `;

    });


// =========================
// CHỈ CHO NHẬP SỐ
// =========================

input.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

    if (this.value.length > 12) {

        this.value = this.value.slice(0, 12);

    }

});


// =========================
// NHẤN ENTER ĐỂ TRA CỨU
// =========================

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        btn.click();

    }

});


// =========================
// TRA CỨU
// =========================

btn.onclick = function () {

    const mahs = input.value.trim();

    // Xóa thông báo và kết quả cũ
    thongbao.innerHTML = "";
    ketqua.innerHTML = "";

    // Kiểm tra dữ liệu đã tải chưa
    if (danhSachHoSo.length === 0) {

        thongbao.innerHTML = `
            <div class="alert alert-warning text-center">
                Dữ liệu đang được tải, vui lòng thử lại sau vài giây.
            </div>
        `;

        return;

    }

    // Kiểm tra bỏ trống
    if (mahs === "") {

        thongbao.innerHTML = `
            <div class="alert alert-warning text-center">
                Vui lòng nhập số Căn cước công dân của thí sinh cần tra cứu.
            </div>
        `;

        input.focus();

        return;

    }

    // Kiểm tra đúng 12 số
    if (!/^\d{12}$/.test(mahs)) {

        thongbao.innerHTML = `
            <div class="alert alert-danger text-center">
                Số Căn cước công dân phải gồm đúng 12 chữ số.
            </div>
        `;

        input.focus();

        return;

    }

    // Hiện spinner
    loading.style.display = "inline-block";
    btnText.innerHTML = "ĐANG TRA CỨU";
    btn.disabled = true;

    // Giả lập thời gian xử lý
    setTimeout(() => {

        const hs = danhSachHoSo.find(item => item.CCCD === mahs);

        // Ẩn spinner
        loading.style.display = "none";
        btnText.innerHTML = "TRA CỨU";
        btn.disabled = false;

        // =========================
        // TÌM THẤY
        // =========================

        if (hs) {

            ketqua.innerHTML = `

                <div class="card shadow">

                    <div class="card-body">

                        <h4 class="text-primary text-center mb-4">

                            KẾT QUẢ TRA CỨU

                        </h4>

                        <table class="table table-bordered align-middle">

                            <tr>

                                <th width="35%">Họ và tên</th>

                                <td>${hs.HOTEN}</td>

                            </tr>

                            <tr>

                                <th>Ngày sinh</th>

                                <td>${hs.NGAYSINH}</td>

                            </tr>

                            <tr>

                                <th>Giới tính</th>

                                <td>${hs.GIOITINH}</td>

                            </tr>

                            <tr>

                                <th>Trường THCS</th>

                                <td>${hs.TRUONGTHCS}</td>

                            </tr>

                            <tr>

                                <th>Điểm xét tuyển</th>

                                <td>${Number(hs.DIEMXETTUYEN).toFixed(2)}</td>

                            </tr>

                            <tr>

                                <th>Kết quả</th>

                                <td>

                                    ${
                                        hs.KETQUA === "Trúng tuyển"

                                        ? '<span class="badge bg-success fs-6">TRÚNG TUYỂN</span>'

                                        : '<span class="badge bg-danger fs-6">KHÔNG TRÚNG TUYỂN</span>'
                                    }

                                </td>

                            </tr>

                        </table>

                    </div>

                </div>

            `;

        }

        // =========================
        // KHÔNG TÌM THẤY
        // =========================

        else {

            thongbao.innerHTML = `

                <div class="alert alert-danger text-center">

                    <strong>Không tìm thấy thông tin!</strong>

                    <br>

                    Vui lòng kiểm tra lại số Căn cước công dân.

                </div>

            `;

        }

    }, 300);

};
