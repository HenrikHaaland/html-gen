function ColorChange() {    
    document.body.style.backgroundColor = document.getElementById("bgColor").value;
}

document.getElementById("addText").addEventListener("click", function(){
    var p = document.createElement("p");
    var text = document.createTextNode(document.getElementById("addPTag").value);
    p.appendChild(text);
    document.body.appendChild(p);

    p.style.webkitTextFillColor = document.getElementById("textColor").value;
}
);

document.getElementById("addHeader").addEventListener("click", function(){

    const size = document.getElementById("hSize").value;

    document.getElementById
    
    const text = document.createTextNode(document.getElementById("addHTag").value);
    const h = document.createElement(size);
    h.appendChild(text);
    document.body.appendChild(h);

    h.style.webkitTextFillColor = document.getElementById("headerColor").value;
}
);

