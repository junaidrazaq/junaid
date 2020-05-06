//defining the updated disply(top) and current display(below)
let updatedDisplay = document.getElementById("updateDisplay");
let display = document.getElementById("display");



//function for when a number or an operator(eg/ subtract) is clicked.
function insert(num){
    /*Whatever button is clicked, the content of the button will display onto the current display.
    So for example, if 5 is clicked, that will be inputted in to the displayinnerhtml, followed by 
    whatever is clicked next. This will continue until another function is called(equals, or C).*/ 
    display.innerHTML += num;
}

//function for when the equals button is clicked
function equals(){
    /*if the updatedDisplays innerHTML contains 'Start!'(which i made as its default),
    only then will the program calculate the result of the display content. This was done 
    because i only need the current display to calculate when there is no result in the
    updated display. Once the calculation is completed, the word "Start!" will not appear
    again, so the calculateBoth() function will infinitely be called from now on*/
    if(updatedDisplay.innerHTML=== 'Start!'){
    updatedDisplay.innerHTML = eval(display.innerHTML);
    display.innerHTML = ""
    }
    else{
      calculateBoth();
    }
}

//function for when the first initial calculation is completed
function calculateBoth(){
    /*if the current display begins with an operator, ('*' or '/' or '-' or '+'), then the 
    program will calculate the updated display with the current display, else, the current 
    display will get calculated*/
    if(display.innerHTML.startsWith('*') || display.innerHTML.startsWith('/') || display.innerHTML.startsWith('-') || display.innerHTML.startsWith('+')){
    const result = eval(updatedDisplay.innerHTML + display.innerHTML);
    updatedDisplay.innerHTML = result;
    display.innerHTML = "";
    } else{
        updatedDisplay.innerHTML = eval(display.innerHTML);
        display.innerHTML = ""
    }
}

/*function for when the 'C' button is clicked. This will make the display, display nothing, 
and make the updated display, display "Start!"", so the first part of the equals function 
can be called again*/
function empty(){
    display.innerHTML = "";
    updatedDisplay.innerHTML = "Start!";
}

/*function for when the "del" button is clicked. When this is clicked, the current displays
last individual string will delete*/ 
function backSpace(){
    display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
}















/*  JQuery Code 
 function insert(num){
    $("#display").val($("#display").val()+num)
}

function equals(){
    $("#display").val(eval($("#display").val()))
}

function empty(){
    $("#display").val("")
}

function backSpace(){
    value = $("#display").val()
    $("#display").val(value.substring(0, value.length - 1))
}
*/