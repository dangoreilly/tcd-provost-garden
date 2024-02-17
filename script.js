
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

    // When the map is clicked, print the coordinates to the console
    // And reset all the icons 
    map.on('click', function(e){
        console.log([e.latlng['lat'], e.latlng['lng']]);
        resetAllIcons(markers);
        updateCard();
    });
    
    // Create an array for the markers
    let markers = [];

    // Loop through the data and add the markers
    for (let i = 0; i < data.length; i++){
        // Create a divIcon for the marker
        let icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='marker-pin'><div class='marker-text'>" + data[i].id + "</div></div>"
        });

        // Create the marker
        let marker = L.marker(data[i].coordinates, {icon: icon}).addTo(map);
        markers.push({marker : marker, data: data[i]});

        // Add the click event
        marker.on('click', function(e){
            // Update the card with the new information
            updateCard(
                data[i].image,
                data[i].title,
                data[i].species,
                data[i].description,
                data[i].carbon,
                data[i].age
            );

            // Make a pulsing version of the marker's icon
            let pulsingIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div class='marker-pin marker-flash'><div class='marker-text'>" + data[i].id + "</div></div>"
            });

            // Set the marker to the pulsing icon
            marker.setIcon(pulsingIcon);

        });
    }
    
    // When the map is clicked, print the coordinates to the console
    // And reset all the icons 
    map.on('click', function(e){
        console.log([e.latlng['lat'], e.latlng['lng']]);
        resetAllIcons(markers);
    });

    // Check the url for a query string
    let url = new URL(window.location.href);
    let query = url.searchParams.get("id");
    if (query != null){
        // Find the marker with the matching id
        for (let i = 0; i < markers.length; i++){
            if (markers[i].data.id == query){
                // Update the card with the new information
                updateCard(
                    markers[i].data.image,
                    markers[i].data.title,
                    markers[i].data.species,
                    markers[i].data.description,
                    markers[i].data.carbon,
                    markers[i].data.age
                );

                // Pan to the marker
                map.panTo(markers[i].data.coordinates);

                // Make a pulsing version of the marker's icon
                let pulsingIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: "<div class='marker-pin marker-flash'><div class='marker-text'>" + markers[i].data.id + "</div></div>"
                });

                // Set the marker to the pulsing icon
                markers[i].marker.setIcon(pulsingIcon);
            }
        }
    }

}

function resetAllIcons(markers, data){
    // Loops through all the markers and resets their icons
    for (let i = 0; i < markers.length; i++){

        let icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='marker-pin'><div class='marker-text'>" + markers[i].data.id + "</div></div>"
        });
        markers[i].marker.setIcon(icon);
    }
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