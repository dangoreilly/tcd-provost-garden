
function initMap(MAP_SIZE, BUFFER, BACKGROUND_IMAGE, data) {


    // Create the new map
    let map_size = [[0,0], MAP_SIZE]
    // Get the bounds by adding padding around the edges
    // Without this padding, it's not always possible to zoom into the edges
    let map_bounds = [[-BUFFER, -BUFFER],
        [MAP_SIZE[0] + BUFFER,
        MAP_SIZE[1] + BUFFER]
    ]

    let map_center = [MAP_SIZE[0]/2, MAP_SIZE[1]/2]

    let map = L.map('map', {
        crs: L.CRS.Simple,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        maxBounds: map_bounds,
        maxZoom: 20,
        minZoom: -1,
        renderer: L.canvas({padding: 1})
    }).fitBounds(map_size);

    // Create the image overlay
    let background = L.imageOverlay(BACKGROUND_IMAGE, map_bounds).addTo(map);

    map.on('click', function(e){
        console.log(e.latlng.lat, e.latlng.lng);
    });

    //TEST: Update the card
    // updateCard(
    //     "images/oregon-maple.png",
    //     "oregon maple",
    //     "treeus latinus",
    //     "it's a tree",
    //     17,
    //     240
    
    // );

}

function updateCard(image=null, title, species, description, carbon, age){
    // Update the card with the new information
    let card_image = document.getElementById('asset-image');
    // sensible default
    if (image == null){image = "images/TCD-logo.png";}
    card_image.src = image;

    let card_title = document.getElementById('asset-title');
    if (title == null){title = "Provost Garden Information";}
    card_title.innerHTML = title;

    let card_species = document.getElementById('asset-species');
    if (species == null){species = "Welcome to the Provost Garden";}
    card_species.innerHTML = species;

    let card_description = document.getElementById('asset-description');
    if (description == null){description = "Tap on the icons in the interactive map to see information about the plants and habitats";}
    card_description.innerHTML = description;

    let card_carbon = document.getElementById('asset-carbon');
    if (carbon == null){carbon = "--";}
    card_carbon.innerHTML =  carbon + " kg of sequestered carbon";
    
    let card_age = document.getElementById('asset-age');
    if (age == null){age = "--";}
    card_age.innerHTML = age + " years old";
}