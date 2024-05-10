document.onclick = hideMenu; 
document.oncontextmenu = rightClick; 

function hideMenu() { 
  document.getElementById("contextMenu").style.display = "none";
} 

function rightClick(e) { 
  e.preventDefault(); 

  if (document.getElementById("contextMenu").style.display == "block") {
    hideMenu();
  } else { 
    var menu = document.getElementById("contextMenu"); 
    menu.style.display = 'block'; 
    menu.style.left = e.pageX + "px"; 
    menu.style.top = e.pageY + "px"; 
  } 
} 



// ________________________________________________________________
// Adds Game Count to the nav menu
// ________________________________________________________________


fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(data => {
        // Now 'data' contains the parsed JSON data
        let numberOfObjects;

        if (Array.isArray(data)) {
            numberOfObjects = data.length; // If 'data' is an array of objects
        } else if (typeof data === 'object') {
            numberOfObjects = Object.keys(data).length; // If 'data' is an object
        } else {
            console.error('Invalid JSON data format');
            return;
        }

        console.log('Number of objects:', numberOfObjects);
        document.getElementById("objectCount").innerHTML = numberOfObjects;
        // document.getElementsByName('search')[0].placeholder = "Games: " + numberOfObjects;
    })
    .catch(error => console.error('Error reading JSON file:', error));







let startIndex = 0;
    const cardsPerLoad = 20;
    let isLoading = false;

    function displayCards(data) {
        const gameList = document.getElementById("app-list");
    
        // Sort games based on broken status
        data.sort((a, b) => {
            if (a.broken && !b.broken) {
                return 1; // Move broken games to the bottom
            } else if (!a.broken && b.broken) {
                return -1; // Move non-broken games to the top
            } else {
                return 0; // Maintain the order for games with the same broken status
            }
        });
    
        // Display cards based on startIndex and cardsPerLoad
        for (let i = startIndex; i < Math.min(startIndex + cardsPerLoad, data.length); i++) {
            displayGame(data[i]);
        }
    }
    

    // Function to handle loading more cards
    function loadMoreCards(data) {
        if (isLoading) return;

        isLoading = true;
        setTimeout(() => {
            startIndex += cardsPerLoad;
            displayCards(data);
            isLoading = false;

            // Hide the "Load More" button if there are no more cards to display
            if (startIndex >= data.length) {
                document.getElementById("loadMoreButton").style.display = "none";
            }
        }, 1000); // Simulate a delay for demonstration purposes
    }

    // Fetch game data from the separate JSON file
    fetch("/assets/json/games.json")
        .then(response => response.json())
        .then(data => {
            const searchInput = document.getElementById("searchInput");

            // Function to filter games based on search query
const filterGames = () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter games based on search term
    const filteredGames = data.filter(game =>
        game.name.toLowerCase().includes(searchTerm)
    );

    // Clear the game list before displaying filtered games
    const gameList = document.getElementById("app-list");
    gameList.innerHTML = '';

    displayCards(filteredGames);
};

            // Initial display of cards
            filterGames();

            // Event listener for search input
            searchInput.addEventListener("input", filterGames);

            // Event listener for scrolling
            window.addEventListener("scroll", () => {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollableHeight = documentHeight - windowHeight;
                const scrollPercentage = (scrollPosition / scrollableHeight) * 100;

                // Load more cards if user has scrolled near the bottom
                if (scrollPercentage > 50) {
                    loadMoreCards(data);
                }
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

    // Function to display a game card
    function displayGame(game) {
        const gameList = document.getElementById("app-list");
        const isBroken = game.broken === true;
        const titleColor = isBroken ? 'red' : 'inherit'; // Set title color based on broken status

        const gameCard = document.createElement("div");
        gameCard.innerHTML = `
            <div  id="launchgame" data-url="${game.url}" data-name="${game.name}" class="app-card">
                <img class="app-image" id="app-image" src="${game.imageSrc}" alt="">
                <br>
                <h1 style="color: ${titleColor};" id="gme-name" class="title gms-title">${game.name}</h1>
              
            </div>
        `;
        gameList.appendChild(gameCard);
    }


    
    // Event listener for the "Launch" button click
    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "launchgame"|| event.target && event.target.id === "app-image" || event.target && event.target.id === "gme-name") {
            // Find the parent node (game card) of the clicked button
            const gameCard = event.target.closest(".app-card");

            // Extract URL and name from the game card
            const gameUrl = gameCard.getAttribute("data-url");
            const gameName = gameCard.getAttribute("data-name");

            // Call the openAg function with the extracted URL and name
            openAg(gameUrl, gameName);
        }
    });





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
        // Replace index.html with the appropriate file name if it exists in the URL
        const replacedUrl = url.includes("index.html") ? url.replace("index.html", "") : url;
    
        // URLs to try
        const urlsToTry = [
            replacedUrl + "game.html",
            replacedUrl + "file/index.html",
            replacedUrl + "game/index.html"
        ];
    
        // Helper function to try each URL
        const tryUrls = async () => {
            for (const currentUrl of urlsToTry) {
                try {
                    const response = await fetch(currentUrl, { method: 'HEAD' });
                    if (response.ok) {
                        // If the URL exists, proceed to open it
                        localStorage.setItem("currentAg", ag);
                        localStorage.setItem('agUrl', encode(currentUrl));
                        location.href = '/@';
                        return;
                    }
                } catch (error) {
                    console.error("Error checking URL:", error);
                }
            }
            // If all URLs fail, revert to the original URL
            console.error("All URLs failed, reverting to the original URL.");
            localStorage.setItem("currentAg", ag);
            localStorage.setItem('agUrl', encode(replacedUrl));
            location.href = '/@';
        };
    
        // Start trying URLs
        tryUrls();
    }
    
    