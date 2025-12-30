//We use EyeDropper API for picking colors , then we store the picked colors to local Storgae and display them in the list

const colorButton = document.querySelector("#color-picker");

//JSON parse converts JSON formatted string to javascript value
const colorsPicked = JSON.parse(localStorage.getItem("picked-colors") || "[]"); //used as a fallback can be empty
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");

const copyColor = (e) =>{
    e.innerText = "Copied";
    //saves the color code to clipboard 
    navigator.clipboard.writeText(e.dataset.color); // dataset ->DOMStringMap reads only keys and mutable
    setTimeout(() => e.innerText = e.dataset.color,1000);
}

const showColor = () =>{ 
    if(!colorsPicked.length) return; //This prevents rendering avoids useless DOM work
    //Transforms each picked color to HTML string
    colorList.innerHTML = colorsPicked.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc":color}"></span>
            <span class="value hex" data-color="${color}">${color}</span> 
        </li>
    `).join(""); //it returns an array that map() has stored it
    //This implies only when the shown datas were exist (UI starts hidden)
    document.querySelector(".picked-colors").classList.remove("hide");
    document.querySelectorAll(".color").forEach(li =>{
        //currentTarget - event listener attched to and lastElementChild refers to the second spa for storing the hex value
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}

const activateEyeDropper = () => {
    document.body.style.display = "none"; //It instabtly hides the entire UI
    setTimeout(async() =>{
        try{
            const eyeDropper = new EyeDropper();
            //await -> it pauses the execution and waits for suer interaction
            const {sRGBHex} = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);
            //it prevents the dupliacet color and ensures the uniqueness in the list
            if(!colorsPicked.includes(sRGBHex)){
                colorsPicked.push(sRGBHex);
                localStorage.setItem("picked-colors",JSON.stringify(colorsPicked));
                showColor();
            }
        } catch(error){
            alert("Failed to copy the color code!");
        }
        document.body.style.display = "block";
    },10);
}
//for clearing the history of picked colors
const clearAllColors =() =>{
    colorsPicked.length =0;
    localStorage.setItem("picked-colors",JSON.stringify(colorsPicked));
    document.querySelector(".picked-colors").classList.add("hide");
}
clearAll.addEventListener("click", clearAllColors);
colorButton.addEventListener("click", activateEyeDropper);



