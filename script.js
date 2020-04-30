let slideIndex = 0;
let cancel = 0
let slides = document.getElementsByClassName('mySlides');
let styleChange = document.getElementsByClassName("project-text")
showSlides()
let startInterval = setInterval(showSlides, 4000);


//Display images one-by-one functionality
function showSlides(n){

    //Remove all images from display and
    //Make all project-text black
    for(i=0; i < slides.length; i++)
    { slides[i].style.display = 'none'
      styleChange[i].classList.remove("currentSlide") }


    if (slideIndex >= slides.length || n >= slides.length)
    { slideIndex = 0 };

    //Displays currentSlide and 
    //Makes current text red
    if(slideIndex > -1){
        slides[slideIndex].style.display = 'block';
        styleChange[slideIndex].classList.add("currentSlide")
        slideIndex++
    }
}


//Selecting current slide functionality
// function currentSlide(n){
//     if(n >= 0){
//         slides[slideIndex - 1].style.display = 'none'
//         slides[n - 1].style.display = 'block'
//         slideIndex = n
//     } 
//      //Restart timer
//      clearInterval(startInterval);
//      startInterval = setInterval(showSlides, 4000);
// }



//Next and Previous arrow functionality
function plusSlides(n){
    
    //If back arrow is clicked
    if(n == -1){
        //Remove current image from display
        slides[slideIndex - 1].style.display = 'none'
        styleChange[slideIndex- 1].classList.remove("currentSlide")

        //Display previous image
        if(slideIndex <= 1){
            slides[4].style.display = 'block'
            styleChange[4].classList.add("currentSlide")
            slideIndex = 5
        } else{
            slides[slideIndex - 2].style.display = 'block';
            styleChange[slideIndex - 2].classList.add("currentSlide")
            slideIndex -= 1;
        }
    } 

    //If next arrow is clicked
    if(n == 1){
        //Remove current image from display
        slides[slideIndex - 1].style.display = 'none'
        styleChange[slideIndex - 1].classList.remove("currentSlide")
        //Display next image
        if(slideIndex >= 5){
            console.log('nui')
            slides[0].style.display = 'block'
            styleChange[0].classList.add("currentSlide")
            slideIndex = 1;
        } else{
            slides[slideIndex].style.display = 'block';
            styleChange[slideIndex].classList.add("currentSlide")
            slideIndex += 1;
        }
    }
    //Restart timer
    clearInterval(startInterval);
    startInterval = setInterval(showSlides, 4000);
}


//Links 
// document.getElementById("home").addEventListener("click", () => {
//     window.location = "index.html"
// })

// document.getElementById("about").addEventListener("click", () =>{
//     window.location = "about.html"
// })

// document.getElementById("contact").addEventListener("click", () =>{
//     window.location = "contact.html"
// })

// document.getElementById("item--btn").addEventListener("click", () => {
//     window.location = "about.html"
// })



// Direct user to projects
// document.getElementById("weatherApp").addEventListener("click", () => {
//     window.location = "Projects/weatherApp/index.html"
// })

// document.getElementById("calculator").addEventListener("click", () => {
//     window.location = "Projects/calculator/calculator.html"
// })

// document.getElementById("rps").addEventListener("click", () => {
//     window.location = "Projects/RockPaperScissors/index.html"
// })

// document.getElementById("sampleWeb").addEventListener("click", () => {
//     window.location = "Projects/AdumsWebsite/index.html"
// })

// document.getElementById("toDo").addEventListener("click", () => {
//     window.location = "Projects/todoApp/index.html"
// })
