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
    const color = document.getElementById("bgColor").value; //retrieves the id "bgColor" and turns it into a const
    document.body.style.backgroundColor = color; //assigns a DOM element to the const

    localStorage.setItem("bgColor", color); //local storage for background color
}

//function to add a p tag and li tag to the page and to change the text color of the p and li tag
document.getElementById("switchTag").addEventListener("change", function(){ //retrieves the id for the select menu
    const tag = this.value; //retrieves the selected tag (either p tag or li tag)
    document.getElementById("addText").innerHTML = "Add " + tag + " Tag"; //updates the button from "add p tag" to "add li tag" and back
});

document.getElementById("addText").addEventListener("click", function(){
    const tag = document.getElementById("switchTag").value; //retrieves the selected value (either p tag or li tag)
    const text = document.createTextNode(document.getElementById("addTag").value); //creates a textnode with the content the user typed in

    if (tag === "li") { //if user chose li, this will happen
        const ul = document.createElement("ul"); //creates the ul element that the li tag needs to be put inside of and assigns it to the const "ul"
        const li = document.createElement("li"); //creates the li element and assigns it to the const "li"
        li.appendChild(text); //adds the text(that the user wrote) inside the li tag
        li.style.webkitTextFillColor = document.getElementById("textColor").value; //applies the selected color to the li element
        ul.appendChild(li); //adds the li element inside of a ul element
        document.getElementById("localstorageContainer").appendChild(ul); //adds the ul element inside of the id/div "localStorageContainer"
    } else { //if user didn't chose li(chose p instead), this will happen
        const p = document.createElement("p"); //creates the p element and assigns it to the const "p"
        p.appendChild(text); //adds the text(that the user wrote) inside the p tag
        p.style.webkitTextFillColor = document.getElementById("textColor").value; //applies the selected color to the p element
        document.getElementById("localstorageContainer").appendChild(p); //adds the p element inside of the id/div "localStorageContainer"
    }

    localStorage.setItem("localstorageContainer", document.getElementById("localstorageContainer").innerHTML); //saves the html inside of "localStorageContainer"
});



//function to change the button text of the h tag depending on what size is selected
document.getElementById("hSize").addEventListener("change", function(){ //retrieves the id for the select menu
    const size = this.value; //retrieves the selected size from the select menu
    document.getElementById("changeSizeText").innerHTML = "Add " + size + " Tag"; //updates the button depending on which h tag you chose
})

//function to add a header to the page
document.getElementById("addHeader").addEventListener("click", function(){
    
    const size = document.getElementById("hSize").value; //retrieves the diffrent size to the h tag and assigns the const "size" to it
    const text = document.createTextNode(document.getElementById("addHTag").value); //creates a textnode with the content the user typed in
    const h = document.createElement(size); //creates the size to the respected h element
    h.appendChild(text); //adds the text(that the user write) into the h element
    document.getElementById("localstorageContainer").appendChild(h); //adds the h element inside of the id/div "localStorageContainer"

    h.style.webkitTextFillColor = document.getElementById("headerColor").value; //applies the selected color to the h element

    localstorageContainer.appendChild(h); //adds the h element inside of the id/div "localStorageContainer"
    localStorage.setItem("localstorageContainer", localstorageContainer.innerHTML); //saves the html inside of "localStorageContainer"
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

