const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10
const apiKey = config.ACCESS_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Create html elements for links and photos, for the DOM

function displayPhotos(){
    photosArray.forEach(photo => {

        // create <a> to link to Unsplash image location
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // create <img> for photo
        const img = document.createElement('img');        
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // insert the <img> inside <a>, then insert both into the imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photos from Unsplash API

async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    }catch (error){

    }
}


// On Load
getPhotos();