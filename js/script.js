
wordp = document.querySelector("#wordp");
phspan = document.querySelector("#phspan");
audiob = document.querySelector(".audiob");
definitionp = document.querySelector("#definitionp");
examples = document.querySelector("#examples");
synonymsp = document.querySelector("#synonymsp");



async function getDetails(word) {

    try {

        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        data = await data.json();

        wordp.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i> <span>${data[0].word}</span>`;

        phspan.innerHTML = `  (${data[0].phonetic})`;

        audiob.setAttribute("src", `${data[0].phonetics[0].audio}`)

        const definitionsArray = [];
        data[0].meanings.forEach(ex => {
            if (ex.definitions[0].definition !== undefined) {
                definitionsArray.push(ex.definitions[0].definition);
            }

        });


        definitionp.innerHTML = "";
        definitionsArray.forEach((def) => {
            definitionp.innerHTML += `<p><i class="fas fa-long-arrow-alt-right"></i> <span>${def}</p></span>`;
        });

        const examplesArray = [];
        data[0].meanings.forEach(ex => ex.definitions.forEach(defs => {
            if (defs.example !== undefined) {
                examplesArray.push(defs.example);
            }

        }));


        examples.innerHTML = "";

        examplesArray.forEach((def) => {
            examples.innerHTML += `<p><i class="fas fa-long-arrow-alt-right"></i> <span>${def}</p></span>`;
        });

        let synonyms = [];
        data[0].meanings.forEach(ex => ex.definitions.forEach(defs => {
            synonyms = synonyms.concat(defs.synonyms);

        }));

        synonymsp.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i> `;


        if (synonyms.length !== 0) {
            synonymsp.innerHTML += `<span>${synonyms.join(", ")}</span>`;
        }
        else {
            synonymsp.innerHTML += "N/A";
        }

    }
    catch (err) {
        alert(err);
        reload();
    }








}







function submitted(event) {
    let input = document.querySelector(".wordip");

    getDetails(input.value);



    event.preventDefault();

}


function reload() {
    // window.location.reload();
    wordp.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i>`;
    audiob.setAttribute("src", "");
    phspan.innerHTML = "";
    definitionp.innerHTML = `<p><i class="fas fa-long-arrow-alt-right"></i>`;
    examples.innerHTML = `<p><i class="fas fa-long-arrow-alt-right"></i>`;
    synonymsp.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i> `;
    let input = document.querySelector(".wordip");
    input.value = "";
}

