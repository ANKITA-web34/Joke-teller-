const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//disable button
function toggleButton() {
    button.disabled = !button.disabled;
}


//Passing joke to voiceRss API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: 'd496e42cf3df4e4a85e947cd7db41064',
        src: jokeString,
        hl: 'en-us', //hi-in, en-us
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//get jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
       
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke)

        //disable button
        toggleButton();
    } catch(error) {
        console.error('whoops', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)