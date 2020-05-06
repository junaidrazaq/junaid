let city = document.getElementById("place")

//Function for getting the api data. What the user inputs will go into the api link where the city name needs to be
function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value},uk&APPID=e7621fb707f97ad903c01feb6a18e235&units=metric`)
    //Once the data is received, convert it to json
    .then(res => {return res.json()})
    //now pass data to function so i can manipulate the data
    .then(data => {editData(data);
    })
}

//function which has the api data passed through the parameters
function editData(data){
    //assigning the weather description to a variable to make things look less cluttered
    let desc = data.weather[0].description;
    //Here, data is gathered from the api and used to, in the future, 
    //output it in to the display
output =   `<div class="weatherDetails">
            <h1>City: ${data.name}</h1>
            <h1>Description: ${desc}</h1>
            <h1>Temperature: ${Math.round(data.main.temp)}&deg<sup>c</sup></h1>
            </div>`

            //if description is "whats in these quotes", a selected image is made as the background
            switch(desc){
                case "clear sky":
                    document
                break;
                case "broken clouds":
                case "scattered clouds":
                case "overcast clouds":
                    document.body.style.backgroundImage = "url('css/images/img1.jpg')";
                break;
                case "few clouds":
                    document.body.style.backgroundImage = "url(css/images/img2.jpg)";
                break;
                case "heavy intensity rain":
                case "very heavy rain":
                case "extreme rain":
                case "shower rain":
                case "heavy intensity shower rain":
                case "ragged shower rain":
                    document.body.style.backgroundImage = "url(css/images/img3.jpg)"
                case "light rain":
                case "moderate rain":
                    document.body.style.backgroundImage = "url(css/images/img4.jpg)"
            }
    
    //info is an empty div in the index.html file. this line will add the html created in to this div
    document.getElementById("info").innerHTML = output

}