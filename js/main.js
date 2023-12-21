"use strict";

let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");
let btnSubmit = document.querySelector(".submit");
let btnDel = document.querySelector(".delete");
let btnClose= document.querySelector(".close");
let message = document.querySelector("#message")

let data = [];

if (localStorage.getItem("data") !=null){
    data=JSON.parse(localStorage.getItem("data"));
    display(data);
}



function createData() {
    if (validateName()==true && validateUrl()==true) {
    let dataInfo = {
        name : siteName.value ,
        url : siteUrl.value,
    }
    data.push(dataInfo);
    localStorage.setItem("data",JSON.stringify(data));
    }else {
        message.classList.replace("d-none" , "d-flex")
    }
}


btnSubmit.addEventListener("click",function (e) {
    createData();
    display(data);
    clear();

})


function display(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td><a class="btn btn-warning" href="http://${data[i].url}" target="_blank">Visit</a></td>
        <td><button class="btn btn-danger delete" onclick="deleteSite(${i})">Delete</button></td>
        </tr>`
    }
    document.querySelector("#content").innerHTML=cartona;
}

function clear() {
    siteName.value="";
    siteUrl.value="";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}

function deleteSite(index) {
    data.splice(index , 1)
    localStorage.setItem("data",JSON.stringify(data));
    display(data)
}


function validateName() {
    let regex = /^[A-Z][a-z]{3,8}$/;
        if (regex.test(siteName.value)==true) {
            siteName.classList.add("is-valid");
            siteName.classList.remove("is-invalid");
            return true
        }else {
            siteName.classList.add("is-invalid");
            siteName.classList.remove("is-valid");
            return false
        }
}

function validateUrl() {
    let regex =/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^?\s])?(?:\?[^#\s])?(?:#.*?)?$/;
    if (regex.test(siteUrl.value)==true) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        return true
    }else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        return false
    }
}


function closeMessege() {
    message.classList.replace("d-flex" , "d-none")
}


btnClose.addEventListener("click",closeMessege);
