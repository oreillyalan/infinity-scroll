const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10
const apiKey = 'config.ACCESS_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Function to set attributes for DOM elements
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create html elements for links and photos, for the DOM

function displayPhotos(){
    photosArray.forEach(photo => {

        // create <a> to link to Unsplash image location
        const item = document.createElement('a');


        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');        
    
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

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