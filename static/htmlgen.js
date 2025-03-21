//localstorage to save the html of the page
localstorageContainer.innerHTML = localStorage.getItem("localstorageContainer") || ""; //local storage for text
document.body.style.backgroundColor = localStorage.getItem("bgColor") || "#ffffff"; //local storage for background color
document.getElementById("localstorageContainer").innerHTML = localStorage.getItem("localstorageContainer") || ""; //local storage for images

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
    const color = document.getElementById("bgColor").value; //retrives the id "bgColor" and turns it into a const
    document.body.style.backgroundColor = color; //assigns a DOM element to the const

    localStorage.setItem("bgColor", color); //local storage for background color
}

//function to add a p tag to the page and to change the text color of the p tag
document.getElementById("addText").addEventListener("click", function(){
    const tagSwitch = document.getElementById("tagSwitch");
    const li = document.createElement("li")
    const p = document.createElement("p");
    const text = document.createTextNode(document.getElementById("addPTag").value); //Makes a text node from the input value and saves it in the const text
    p, li.appendChild(text); //adds the "text" node inside the "p" element
    document.getElementById("localstorageContainer").appendChild(p, li); //appends the p tag inside the element with ID localStorageContainer

    p, li.style.webkitTextFillColor = document.getElementById("textColor").value; //Sets the text fill color 

    //local storage for p tags
    localstorageContainer.appendChild(p);
    localStorage.setItem("localstorageContainer", localstorageContainer.innerHTML);

}
);

document.getElementById("tagSwitch").addEventListener("change", function(){
    const tagSwitch = this.value
    document.getElementById("changeTagText").innerHTML = "Add" + tagSwitch + "Tag"
})

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

//function to get the url of the designated page, show dark container and a button to close
function imageInsert() {

    loadPopUp("./modals/imagePopUp.html", "darkContainer", function() {

        document.getElementById("darkContainer").style.display = "block";

        //cancel and confirm button to close the dark container
        document.getElementById("cancelButton").addEventListener("click", function() {
            document.getElementById("darkContainer").style.display = "none"
        })
        document.getElementById("confirmButton").addEventListener("click", function() {
            document.getElementById("darkContainer").style.display = "none";
            const container = document.getElementById("localstorageContainer");
            container.innerHTML += "<img src='" + document.getElementById("imgsource").src + "' alt='image'>";
            localStorage.setItem("localstorageContainer", container.innerHTML);
        });
        

        document.getElementById("fileUpload").addEventListener("change", function() {
            const file = this.files[0]
            const fileReader = new FileReader()

            fileReader.addEventListener(
                "load",
                () => {
                  // convert image file to base64 string
                  document.getElementById("imgsource").src = fileReader.result;
                },
                false,
              );
        
            if (file) {
              fileReader.readAsDataURL(file);
            }
        })
        
        
    })
}

//function to load the html page into the designated div
function loadPopUp(htmlPath, insertDiv, onload = function() {}) {
    
    fetch(htmlPath, {
        method: "GET",
        credentials: "same-origin"
    })

    .then(response => response.text())

    .then(response => {
        document.getElementById(insertDiv).innerHTML = response;
    })

    .finally(() => {
        onload();
    })

    .catch(error => {
        console.error(error)
    })
}

