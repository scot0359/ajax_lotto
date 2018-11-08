document.addEventListener("DOMContentLoaded", init);

let pages = [];

function init() {

    pages = document.querySelectorAll(".page");
    console.log(pages);

    document.getElementById("btnBack").addEventListener("click", function () {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
        deleteNums();
    });

    document.getElementById("btnSend").addEventListener("click", function () {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
    });

    document.getElementById("btnSend").addEventListener("click", getData);
}

function getData() {

    let formdata = new FormData();
    formdata.append("digits", document.getElementById("digits").value);
    formdata.append("max", document.getElementById("max").value);

    let request = new Request("https://davidst.edumedia.ca/mad9014/nums.php?", {
        method: "POST",
        mode: "cors",
        body: formdata
    });

    fetch(request)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            results(data.numbers);
        })
        .catch(function (err) {
            alert("error: ", err.message);
        });

    let digits = document.getElementById("digits");
    let max = document.getElementById("max");

    if (digits.value.length == 0) {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
        alert("You must enter a number");
        digits.focus();
        return;
    } else if (max.value.length == 0) {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
        alert("You must enter a number max value");
        max.focus();
        return;
    }
}

function results(data) {
    let ul = document.querySelector("ul"); 
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.id = "number" + i;
        //li.classname = "lottoNum";
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
    }
}

function deleteNums() {
    console.log("fuction called");
    let ul = document.querySelector("ul");
    let list = document.querySelectorAll("li");
    for (let li of list){
        ul.removeChild(li);
    }
}
