document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://phase-1-project-back-end.vercel.app/characters";
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");  
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    fetch(baseUrl) 
        .then(res => res.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => {
                    showCharacterDetails(character);
                });
                characterBar.appendChild(span);  
            });

            if (characters.length > 0) {  
                showCharacterDetails(characters[0]);
            }
        })
        .catch(err => console.log(err));  
        
    function showCharacterDetails(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        voteCount.textContent = character.vote;
        characterImage.style.display = 'block';
    }

    voteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const votesToAdd = parseInt(voteInput.value) || 0;
        const currentVotes = parseInt(voteCount.textContent);
        voteCount.textContent = currentVotes + votesToAdd;
        voteInput.value = "";
    });

    resetButton.addEventListener("click", () => {  
        voteCount.textContent = "0";
    });
});