function encode(str) {
  if (!str) return str;
  return encodeURIComponent(
      str
          .toString()
          .split('')
          .map((char, ind) =>
              ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
          )
          .join('')
  );
}

function openAg(url, ag) {
localStorage.setItem("currentAg", ag)

agU = encode(url);
localStorage.setItem('agUrl', agU);
location.href = '/@';
}



      // Fetch game data from the separate JSON file
      fetch("/assets/json/apps.json")
  .then(response => response.json())
  .then(data => {
      const gameList = document.getElementById("app-list");
      const searchInput = document.getElementById("searchInput");

      // Function to filter games based on search query
      const filterGames = () => {
          const searchTerm = searchInput.value.toLowerCase();

          // Filter broken games and non-broken games
          const brokenGames = data.filter(game =>
              game.name.toLowerCase().includes(searchTerm) && game.broken
          );
          const nonBrokenGames = data.filter(game =>
              game.name.toLowerCase().includes(searchTerm) && !game.broken
          );

          // Clear existing game list
          gameList.innerHTML = "";

          

          // Display non-broken games
          nonBrokenGames.forEach(game => {
              displayGame(game);
          });
          // Display broken games
          brokenGames.forEach(game => {
              displayGame(game);
          });
      };

      // Function to display a game card
      const displayGame = (game) => {
        const isBroken = game.broken === true;
              const titleColor = isBroken ? 'red' : 'inherit'; // Set title color based on broken status
          const gameCard = document.createElement("div");
          gameCard.innerHTML = `
              <div data-url="${game.url}" data-name="${game.name}" class="app-card">
                  <img class="app-image" src="${game.imageSrc}" alt="">
                  <br>
                  <h1 style="color: ${titleColor};" class="title">${game.name}</h1>
                  <p class="description">
                      ${game.description}
                  </p>
                  <button class="btn btn-success" id="launchapp">Launch</button>
              </div>
          `;
          // if (game.broken == true) {
          //       document.getElementById('title').style.color = 'red';
          //     }
          gameList.appendChild(gameCard);
      };

      // Initial display of all games
      filterGames();

      // Event listener for search input
      searchInput.addEventListener("input", filterGames);
  })
  .catch(error => console.error("Error loading JSON:", error));



  


  // Event listener for the "Launch" button click
  document.addEventListener("click", function(event) {
      if (event.target && event.target.id === "launchapp") {
          // Find the parent node (game card) of the clicked button
          const gameCard = event.target.closest(".app-card");

          // Extract URL and name from the game card
          const gameUrl = gameCard.getAttribute("data-url");
          const gameName = gameCard.getAttribute("data-name");

          // Call the openAg function with the extracted URL and name
          openAg(gameUrl, gameName);
      }
  });