'use strict';
let saveButton = document.getElementById('btnSave');
let masv = document.getElementById('masv');
let ho = document.getElementById('ho');
let ten = document.getElementById('ten');
let lop = document.getElementById('lop');
let email = document.getElementById('email');
let display = document.querySelector('#display');
let chkNN = document.querySelector('#chkNN');
let chkTH = document.querySelector('#chkTH');
let chkQPAN = document.querySelector('#chkQPAN');


const inDanhSachSV = arr => {
    let stt = 0;
    const trstring = arr.map(item =>
        `<tr>
            <td>${++stt}</td>
            <td>${item.ma}</td>
            <td>${item.ho} ${item.ten}</td>
            <td>${item.lop}</td>
            <td>${item.email}</td>
            <td>${item.gioitinh}</td>
            <td>${item.ngoaingu ? "<span class='text-success'>Có</span>" : "<span class='text-danger'>Không</span>"}</td>
            <td>${item.tinhoc ? "<span class='text-success'>Có</span>" : "<span class='text-danger'>Không</span>"}</td>
            <td>${item.qpan ? "<span class='text-success'>Có</span>" : "<span class='text-danger'>Không</span>"}</td>
            <td><button type='button'  class="btn btn-primary" onclick='suaSV("${item.ma}")'>Sửa</button>
            <button type='button' class="btn btn-danger"  onclick='xoaSV("${item.ma}")'>Xoá</button></td>
        </tr>`).join('');
    // console.log(trstring);
    display.innerHTML = trstring;
}

let dsSV = localStorage.getItem("dssv") ? JSON.parse(localStorage.getItem("dssv")) :[];
inDanhSachSV(dsSV);
console.log(dsSV);
let isUpdate = false;
saveButton.addEventListener('click', function () {
    let gioitinh = document.querySelector('input[name="gioitinh"]:checked').value;
    let formData = {
        ma: masv.value,
        ho: ho.value,
        ten: ten.value,
        lop: lop.value,
        email: email.value,
        gioitinh: gioitinh,
        ngoaingu: chkNN.checked,
        tinhoc: chkTH.checked,
        qpan: chkQPAN.checked,
    }
    console.log(formData);
    //kiem tra dữ liệu nhập có hợp lệ

    if (!isUpdate)
    //them vao dsSV
        dsSV.push(formData);
    else {
        //cap nhat
        let editSV = dsSV.find(item => item.ma == formData.ma);
        editSV.ho = formData.ho;
        editSV.ten = formData.ten;
        editSV.lop = formData.lop;
        editSV.email = formData.email;
        editSV.gioitinh = formData.gioitinh;
        editSV.ngoaingu = formData.ngoaingu;
        editSV.tinhoc = formData.tinhoc;
        editSV.qpan = formData.qpan;
    }
    //cap nhat vao localstorage
    localStorage.setItem("dssv", JSON.stringify(dsSV));
    //hien thi danh sách sinh viên
    inDanhSachSV(dsSV);

    //reset form
    xoaForm();
});

const xoaForm = () => {
    masv.value = '';
    ho.value = '';
    ten.value = '';
    lop.value = '';
    email.value = '';
    //reset radio button
    let gts = document.getElementsByName("gioitinh");
    for (let i = 0; i < gts.length; i++)
        gts[i].checked = false;
    //xoa checkbox
    chkNN.checked = false;
    chkTH.checked = false;
    chkQPAN.checked = false;
    
    //tra lại hiện trạng ban đầu
    //cap nhat trang thai - isUpdate = true
    isUpdate = false;
    saveButton.textContent = "Thêm mới";
    masv.disabled = false;
}

const suaSV = id => {
    console.log(id);
    let sv = dsSV.find(item => item.ma == id);
    masv.value = sv.ma;
    ho.value = sv.ho;
    ten.value = sv.ten;
    lop.value = sv.lop;
    email.value = sv.email;
    //check radio 
    let gts = document.getElementsByName("gioitinh");
    for (let i = 0; i < gts.length; i++)
        if (gts[i].value == sv.gioitinh)
            gts[i].checked = true;
    //cac checkbox
    chkNN.checked = sv.ngoaingu;
    chkTH.checked = sv.tinhoc;
    chkQPAN.checked = sv.qpan;

    //cap nhat trang thai - isUpdate = true
    isUpdate = true;
    saveButton.textContent = "Cập nhật";
    masv.disabled = true;
}

const xoaSV = id => {
    console.log(id);
    console.log(dsSV);
    let cf = confirm("Ban muon xoa?");
    if (cf){
        //tim trong array va xoa
        dsSV = dsSV.filter(item => item.ma != id);
        //cap nhat vao localstorage
        localStorage.setItem("dssv", JSON.stringify(dsSV));
        inDanhSachSV(dsSV);
    }
}