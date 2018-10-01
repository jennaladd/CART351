alert("hello you are now entering paralleling alternatives")
 {"browser":"google chrome"}
// moving box
window.onload = function()
{
  let diffX = 0, diffY = 0, previousX = 0, previousY = 0;
  let onBox = false;

/* function to be triggered when mouse is down */
let handleDown = function (event)
{
  //if we are down & have not been down then update the prevX,Y vars
  // otherwise they will contain mouse positions from a while back
  if(onBox ==false) {
  previousX = event.clientX;
  previousY = event.clientY;
}
  console.log("down");
  //make boolean true
  onBox =true;

};
 /* function to be triggered when mouse is up */
let handleUp = function (event){
  console.log("up");
  //make boolean true
    onBox =false;
 };
 /* function to be triggered for move */
let handleMove = function (event)
{
  if(onBox ==true)
  {
    console.log("move");
    let theElement = document.getElementById("c");
    // calculate difference between previous mouseX and current mouseX pos
    let diffX = event.clientX-previousX;
    // calculate difference between previous mouseY and current mouseY pos
    let diffY =  event.clientY-previousY;
    //store in previous the current mouse pos
    previousX = event.clientX;
    previousY = event.clientY;
    // set the element's new position:
  /*https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect*/
   var rect = theElement.getBoundingClientRect();
  // set the new left/top to the old+diff...
   theElement.style.left = ((rect.left+diffX)+"px");
   theElement.style.top = ((rect.top+diffY)+"px");
 }

};

let boxC = document.getElementById("c");
boxC.addEventListener('mousedown', handleDown);
window.addEventListener('mouseup', handleUp);
window.addEventListener('mousemove', handleMove);

 }

</script>
