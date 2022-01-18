// See the timer increment every second once the page has loaded.
// Manually increment and decrement the counter using the plus and minus buttons.
// "Like" an individual number of the counter. I should see the count of the number of "likes" associated with that number displayed.
// Pause the counter, which should:
// pause the counter
// disable all buttons except the pause button
// switch the label on the button from "pause" to "resume"
// Click the "restart" button to restart the counter and re-enable the buttons.
// Leave comments on my gameplay, such as: "Wow, what a fun game this is."


// 1. Timer Incrementation:
//find timer dom element
const timer = document.getElementById('counter');
let timerValue = parseInt(timer.textContent);;

//used for like counter later
let likeCounter = 0;

//create function to increase the timer variable
const counterFunction = () => {
    timerValue++;
    timer.textContent=`\n    ${timerValue}\n  `
    //used in like counter later
    likeCounter =0;
}

//create setInterval to automatically run function 
let begin=!0;
let timerInterval = setInterval(counterFunction,1000)
if (begin){
    begin = timerInterval};

// 2. Manual Increase and Decrease Timer

// find plus/minus buttons
const increase = document.getElementById('plus');
const decrease = document.getElementById('minus');

//add events to increase/decrease
increase.addEventListener('click', counterFunction);

decrease.addEventListener('click',()=>{
    timerValue--;
    timer.textContent=`\n    ${timerValue}\n  `
})


// 3. Like Button:

// find heart button and like list:
const heart = document.getElementById('heart');
const likeList = document.getElementsByClassName('likes')[0];

//add event to heart button

heart.addEventListener('click', ()=> {
    likeCounter++;
    //check to see if a like message for the current time is already available
    // if not, create new list element with the id of this current time 
    // set text content to number of likes
    // if there is a like message for the current time, update the message
    if (!document.getElementById(`likesAt${timerValue}`)){
        const aLike = document.createElement('li');
        aLike.id=`likesAt${timerValue}`;
        aLike.textContent= likeAdder();
        likeList.appendChild(aLike);
    } else {
        const newLike = document.getElementById(`likesAt${timerValue}`);
        newLike.textContent = likeAdder();
    }
})

// determines Like message based on number of likes 
const likeAdder = () => {
    if (likeCounter===1){
        return `${timerValue}: ${likeCounter} like`
    } else {
        return `${timerValue}: ${likeCounter} likes`
    }
}

///// 4. Pause Counter 

// find pause button
const pause = document.getElementById('pause');

//collect the other three buttons and create functions to disable on command
const triButton = [increase,decrease,heart];
const disableButtons = () => triButton.forEach(button=>button.disabled=true)
const enableButtons = () => triButton.forEach(button=>button.disabled=false)

//add event to pause 
let paused = 0;
pause.addEventListener('click', ()=>{
    //checks to see if the timer is paused or not
    if (paused===0){
        clearInterval(timerInterval)
        pause.textContent='resume';
        paused=1;
        disableButtons();
    } else if (paused===1){
        timerInterval = setInterval(counterFunction,1000);
        pause.textContent='pause'
        paused=0;
        enableButtons();
    }
})

////// 5. Comments

// get form and comment list
const form = document.getElementById('comment-form');
const commentList = document.getElementById('list');

//add comment adding event to form if the comment is not empty
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const comment = event.target['comment-input'].value;
    if (comment!==''){
        const li = document.createElement('li');
        li.textContent=comment;
        commentList.append(li);
    }
    form.reset();

})