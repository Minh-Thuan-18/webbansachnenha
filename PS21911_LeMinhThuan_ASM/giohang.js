var arrGH = [];
getDuLieu();

function luuDuLieu() {
    window.localStorage.setItem("giohang", JSON.stringify(arrGH));
}

function getDuLieu() {
    var dulieu = window.localStorage.getItem("giohang");
    arrGH = JSON.parse(dulieu);
    if(arrGH == null){
        arrGH = [];
    }
    loadGH();
}

function them(obj) {
    var row = obj.parentNode.parentNode;
    var ten = row.children[0].innerText;
    var giasp = row.children[1].innerText;
    var sl = 1;
    var gia = giasp.substr(0,5);

    var idx = arrGH.findIndex(item =>  {
        return (item.tensp == ten);
    });

    if(idx < 0) {
        var sp = {
            tensp: ten,
            gia: gia,
            soluong: sl
        };
        arrGH.push(sp);
    }
    else {
        arrGH[idx].soluong += 1;
    }
    loadGH();
    luuDuLieu();
    
}

function loadGH() {
    var str = `
    <tr>
        <th>Tên Sản Phẩm</th>
        <th>Giá Tiền</th>
        <th>Số Lượng</th>
        <th>Tùy Chọn</th>
    </tr>`;
    arrGH.forEach((item) => {
        str += `
        <tr>
            <td>${item.tensp}</td>
            <td>${item.gia}</td>
            <td>
                <label onclick="giamSL(this, '${item.tensp}');">-</label>
                <input type="number" value="${item.soluong}">
                <label onclick="tangSL(this, '${item.tensp}');">+</label>
            </td>
            <td>
                <button type="button" onclick="xoa('${item.tensp}');">Xóa</button>
            </td>
        </tr>`;
    });

    document.getElementById("tblGioHang").innerHTML = str;
    tinhTong();
}

function tinhTong() {
    var tong = 0;
    arrGH.forEach((item) => {
        tong += item.gia * item.soluong;
    });
    document.querySelector("span").innerHTML =  + tong +"đ̲";
}

function xoa (tenSp) {
    var idx = arrGH.findIndex((item) =>  {
        return (item.tensp == tenSp);
    });
    if(idx < 0) {
        alert("Không Có Sản Phẩm");
    }
    else {
        if(confirm("Bạn có muốn xóa sản phẩm này")){
           arrGH.splice(idx, 1); 
        }
        
    }
    loadGH();
    luuDuLieu();
}

function giamSL(btnGiam, tenSp) {
    var inputSL = btnGiam.parentNode.children[1];
    var sl = inputSL.value;
    sl--;
    if(sl <= 0){
        xoa(tenSp);
    }
    btnGiam.parentNode.children[1].value = sl;
    var idx = arrGH.findIndex((item) =>  {
        return (item.tensp == tenSp);
    });
    arrGH[idx].soluong = sl;
    tinhTong();
    luuDuLieu();
}

function tangSL(btnTang, tenSp) {
    var inputSL = btnTang.parentNode.children[1];
    var sl = inputSL.value;
    sl++;
    btnTang.parentNode.children[1].value = sl;
    var idx = arrGH.findIndex((item) =>  {
        return (item.tensp == tenSp);
    });
    arrGH[idx].soluong = sl;
    tinhTong();
    luuDuLieu();
}