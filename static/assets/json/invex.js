const fs = require('fs');
const https = require('https');
const path = require('path');

// Read game data from a JSON file
let games = require('./games.json');

// Function to download an image from a URL and save it to a file
function downloadImage(url, filename, directory, gameName) {
    const extension = path.extname(filename);
    const baseName = path.basename(filename, extension);
    let uniqueFilename = filename;
    let counter = 1;

    // Check if the file already exists
    while (fs.existsSync(path.join(directory, uniqueFilename))) {
        uniqueFilename = `${baseName}_${gameName}_${counter}${extension}`;
        counter++;
    }

    const filePath = path.join(directory, uniqueFilename);
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(filePath);
                });
            } else {
                reject(new Error(`Failed to download image. HTTP status code: ${response.statusCode}`));
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}

// Function to download all images from the games array
async function downloadImages(directory) {
    const updatedGames = [];
    for (const game of games) {
        const imageUrl = game.imageSrc;

        // Skip downloading if image source already starts with '/assets'
        if (imageUrl.startsWith('/assets')) {
            console.log(`Skipping download for ${game.name}. Image source already starts with '/assets'.`);
            updatedGames.push(game);
            continue;
        }

        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        const gameName = game.name.replace(/\s/g, '_').toLowerCase(); // Convert game name to lowercase and replace spaces with underscores
        try {
            const downloadedFilePath = await downloadImage(imageUrl, filename, directory, gameName);
            const updatedImageUrl = `/assets/${directory}/${path.basename(downloadedFilePath)}`;
            const updatedGame = { ...game, imageSrc: updatedImageUrl }; // Update imageSrc with the new URL
            updatedGames.push(updatedGame);
            console.log(`Image downloaded successfully for ${game.name}`);
        } catch (error) {
            console.error(`Error downloading image for ${game.name}: ${error.message}`);
            updatedGames.push(game); // Add the game with the original image URL
        }
    }
    console.log('All images downloaded.');
    return updatedGames;
}

// Specify the directory where you want to save the images
const downloadDirectory = './images';

// Create the download directory if it doesn't exist
if (!fs.existsSync(downloadDirectory)) {
    fs.mkdirSync(downloadDirectory);
}

// Call the function to start downloading images to the specified directory
downloadImages(downloadDirectory)
    .then(updatedGames => {
        // Update the game data with the new image URLs
        games = updatedGames;

        // Write the updated game data back to the JSON file
        fs.writeFileSync('./games.json', JSON.stringify(games, null, 2));
        console.log('Game data updated with new image URLs.');
    })
    .catch(error => console.error('Error downloading images:', error));
