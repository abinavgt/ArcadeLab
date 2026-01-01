const coords={x :0, y:0};
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach((circles, index) =>{
    circles.x =0;
    circles.y =0;
    // Here it refers to repetition of color from the colors code
    circles.style.backgroundColor = colors[index % colors.length];
});

//Track the position of the mouse movement , Every time mouse moves it updates the coordinates
window.addEventListener("mousemove", (e)=>{
    coords.x = e.clientX; //tracks the horizontal position
    coords.y = e.clientY; //tracks the vertical position
});

const animatedCircles = () =>{
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle,index) => {
        //This assumes the overall size of the circle is 24 px, -12 centers the circle on the cursor
        circle.style.left = x-12 + "px";
        circle.style.top = y-12 + "px";
        // This will make the circle smaller , when the index increases
        circle.style.scale = (circles.length - index)/circles.length;

        circle.x = x;
        circle.y = y;
        
        //It tries to get the next circle in the list, if there is no circle left it goes back to the first circle
        const nextCircle = circles[index+1] || circles[0];
        x += (nextCircle.x - x)*0.3; // moves 30% of the distance closer to circle
        y += (nextCircle.y - y)*0.3;

    });
    requestAnimationFrame(animatedCircles);
}
animatedCircles();