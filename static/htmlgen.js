//localstorage to save the html of the page
localstorageContainer.innerHTML = localStorage.getItem("localstorageContainer") || "";
document.body.style.backgroundColor = localStorage.getItem("bgColor") || "#ffffff";

//function for clearing Local Storage if needed
document.getElementById("clearLocalStorage").addEventListener("click", function(){
    localStorage.clear(); 
});

//function to clear the content of the html page/ localstorageContainer div
document.getElementById("clearPage").addEventListener("click", function(){
    const clear = document.getElementById("localstorageContainer");
    clear.innerHTML = "";
});


//function to change the background color of the page
function ColorChange() {    
    const color = document.getElementById("bgColor").value;
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

//function to change the text color of the page
document.getElementById("addText").addEventListener("click", function(){
    var p = document.createElement("p");
    var text = document.createTextNode(document.getElementById("addPTag").value);
    p.appendChild(text);
    document.getElementById("localstorageContainer").appendChild(p);

    p.style.webkitTextFillColor = document.getElementById("textColor").value;

    localstorageContainer.appendChild(p);
    localStorage.setItem("localstorageContainer", localstorageContainer.innerHTML);

}
);

//function to change the button text of the h tag depending on what size is selected
document.getElementById("hSize").addEventListener("change", function(){
    const size = this.value;
    document.getElementById("changeSizeText").innerHTML = "Add " + size + " Tag";

})

//function to add a header to the page
document.getElementById("addHeader").addEventListener("click", function(){
    
    const size = document.getElementById("hSize").value;
    const text = document.createTextNode(document.getElementById("addHTag").value);
    const h = document.createElement(size);
    h.appendChild(text);
    document.getElementById("localstorageContainer").appendChild(h);

    h.style.webkitTextFillColor = document.getElementById("headerColor").value;

    localstorageContainer.appendChild(h);
    localStorage.setItem("localstorageContainer", localstorageContainer.innerHTML);
}
);

document.getElementById("insertImage").addEventListener("click", function(){
    fetch("../modals/imagePopup.html")
});

