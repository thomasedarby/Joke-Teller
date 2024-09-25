const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
 

// Disable/enable Button
function toggleButton() { 
    button.disabled = !button.disabled;
}

// Passing The Joke to Our Voice RSS API
function tellMe(joke) { 
    VoiceRSS.speech({
        key: '1cceceeb74db49b3a49dbc7f17c59469',
        src: joke,
        hl: 'en-us',
        v: 'Mike',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes From Joke API
async function getJokes() { 
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?blacklistFlags=racist'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) { 
            joke = `${data.setup} ... ${data.delivery}`;
        } else { 
            joke = data.joke;
        }
        // Text to Speech
        tellMe(joke); 
        //Disable Button 
        toggleButton();

        
    } catch (error) {
        // Catch Errors Here
        console.log('Whoops', error);
    }
}

// Event Listeners 
button.addEventListener('click', getJokes, );
audioElement.addEventListener('ended', toggleButton );
