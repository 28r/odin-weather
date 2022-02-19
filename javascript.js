async function GetWeatherData(location) {
    let apistring = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=5a25c78aa652856a65886422d6707dbe";
    try {
        const response = await fetch(apistring, {mode: "cors"});
        return response.json();
    } catch(error) {
        console.error(`Error. For reference: "${error}"`);
    }
}

async function GetGif(query) {
    let apistring = "https://api.giphy.com/v1/gifs/translate?api_key=NgfxIJlXTBpkrkfy42MZsfM5zJB1QNQb&s=" + query;
    try {
        const response = await fetch(apistring, {mode: "cors"});
        return response.json();
    } catch(error) {
        console.error(`Error. For reference: "${error}"`);
    }
}

function MainFunction(location, forc) {
    GetWeatherData(location).then(WeatherData => {
        console.log(WeatherData);
        EmptyResults();
        let cityName = WeatherData.name;
        AddToDOM('cityName', cityName);
        let country = WeatherData.sys.country;
        AddToDOM('country', country);
        let weatherDescription = WeatherData.weather[0].description;
        AddToDOM('weatherdescription', weatherDescription);
        let weatherMain = WeatherData.weather[0].main;
        AddToDOM('weathermain', weatherMain);
        let temp = WeatherData.main.temp;
        let tempmin = WeatherData.main.temp_min;
        let tempmax = WeatherData.main.temp_max;
        if (forc === 'C') {
            temp = KelvinToC(temp);
            tempmin = KelvinToC(tempmin);
            tempmax = KelvinToC(tempmax);
        }
        else if (forc === 'F') {
            temp = KelvinToF(temp);
            tempmin = KelvinToF(tempmin);
            tempmax = KelvinToF(tempmax);
        }
        else {
            temp = KelvinToC(temp);
            tempmin = KelvinToC(tempmin);
            tempmax = KelvinToC(tempmax);
        }
        AddToDOM('temp', temp);
        AddToDOM('tempmin', tempmin);
        AddToDOM('tempmax', tempmax);
        let displayarea = document.getElementById('weatherdata');
        displayarea.classList.remove('invisible');
        GetGif(weatherMain).then(returnvalue => {
            console.log(returnvalue);
            let source = returnvalue.data.images.downsized.url;
            let gifarea = document.getElementById('gif');
            let image = document.createElement('img');
            image.classList.add('gif');
            image.src = source;
            gifarea.appendChild(image);
            gifarea.classList.remove('invisible');
        });
    });
}

function AddToDOM(id, variable) {
    let area = document.getElementById(id);
    let result = document.createElement('span');
    result.classList.add('result');
    result.innerHTML = variable;
    area.appendChild(result);
}

function EmptyResults() {
    const results = document.querySelectorAll('.result');
    results.forEach(result => {
    result.remove();
    });
    const gifs = document.querySelectorAll('.gif');
    gifs.forEach(gif => {
    gif.remove();
    });
}

function KelvinToF(value) {
    value = parseFloat(value);
    return (((value-273.15)*1.8)+32).toFixed(1);
}

 function KelvinToC(value) {
    value = parseFloat(value);
    return (value-273.15).toFixed(1);
}

function RunJS(forc) {
    let field = document.getElementById('input').value;
    if (!field) {
        return;
    }
    MainFunction(field, forc);
}