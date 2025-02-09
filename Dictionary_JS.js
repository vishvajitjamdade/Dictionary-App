async function searchWord() {
    const word = document.getElementById('word').value;
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';

    if (!word.trim()) {    //if we donot enter anything
        alert('Please enter a word.');
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Word not found.');
        }

        const data = await response.json();

        data.forEach(entry => {
            const meanings = entry.meanings;
            meanings.forEach(meaning => {
                const definition = meaning.definitions[0].definition;
                const listItem = document.createElement('li');
                listItem.textContent = definition;
                resultsList.appendChild(listItem);
            });
        });
    } catch (error) {
        const errorItem = document.createElement('li');
        errorItem.textContent = error.message;
        resultsList.appendChild(errorItem);
    }
}