const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'config.ACCESS_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded===totalImages){
        ready = true;
        console.log('ready', ready);

    }
}

// Helper Function to set attributes for DOM elements
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create html elements for links and photos, for the DOM

function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total images', totalImages);

    // RUn function for each object in photosArray
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

        // Event listener, check when each image is loaded
        img.addEventListener('load', imageLoaded);




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

//  Scroll Event Listener

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false;
        imagesLoaded=0;
        displayPhotos();
    }
})

// On Load
getPhotos();