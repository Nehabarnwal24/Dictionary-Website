const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

//without accessing button tag we can access it like below
form.addEventListener('submit', (e) => { //whenever submit button is hitted then it will going to be executed
    e.preventDefault(); //it will stop the page from reloading
    getWordInfo(form.elements[0].value); //1st children input tag hai
});

const getWordInfo = async (word)=> {

    //if random word is to be searched
    try {
        resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
        <p><strong>Example:</strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>
        <p><strong>Antonyms:</strong><p>
    `;

    //fetching antonyms
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not found</span>`;
    }
    else{
        for(let i=0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}`; 
        }
    }
    
    //Adding Read More Button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`; //target="_blank" this will always give searches on new tab whenever we click on read more
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`   
    }
    console.log(data);
}