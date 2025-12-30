
let input = document.getElementById('inputbox'); /*No need to mention the attribute */
let buttons = document.querySelectorAll('button');

let string =""; /* for storing the result */

let arr = Array.from(buttons); /* This converts list of Buttons to an array */
arr.forEach(buttons =>{
    buttons.addEventListener('click', (e)=>{
        if(e.target.innerHTML == '='){
            string = eval(string);  /*inbuilt libarary*/
            input.value = string;
        }
        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0,string.length-1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})

/* The Explanation of else part , we could not type 2 digit number at once.
 So  (string += e.target.innerHTML) tells, take the input 1 and append to next input so on...*/