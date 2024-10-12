function initialize() {
    // crÃ©ation de la carte et paramÃ©trage gÃ©nÃ©ral : centre et niveau de zoom
    var map = L.map('mapid').setView([48.862162, 2.345818], 12);

    // crÃ©ation d'une couche "osmLayer"
    var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: 'Â© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });
        
    // la couche "osmLayer" est ajoutÃ©e Ã  la carte		
    map.addLayer(osmLayer);
    
    // crÃ©ation d'une couche "watercolorLayer"
    var watercolorLayer = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Â© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });
     
    // la couche "watercolorLayer" est ajoutÃ©e Ã  la carte			 
    map.addLayer(watercolorLayer);
    
    // crÃ©ation d'une couche geoJson qui appelle le fichier "arrondissement.geojson"			
    var arrondissement = $.getJSON("arrondissement.geojson",function(dataArrondissement)
                {L.geoJson( dataArrondissement, 
                    {style: function(feature)
                        {	
                        // paramÃ©trage de la symbologie de la couche "arrondissement"
                        return { color: "#046380", weight: 1, fillColor: '#4BB5C1', fillOpacity: .5 };
                        },
    onEachFeature: function( feature, layer )
            {
            // paramÃ©trage de la popup de la couche "arrondissement"	
            layer.bindPopup( "<b><u>Description de l'arrondissement</u></b><br><b> Arrondissement nÂ° </b>" + feature.properties.c_ar )
            }
    }).addTo(map);
    });
                                                        
    // crÃ©ation d'une couche geoJson qui appelle le fichier "cinema.geojson"													
    var cinema= $.getJSON("cinema.geojson",function(dataCinema)
                                    // icone Clap	
                                    {var iconeCinema = L.icon({
                                                iconUrl: 'style/Clap.png',
                                                iconSize: [19, 21]
                                                                });
    // fon ction pointToLayer qui ajoute la couche "cinema" Ã  la carte, selon la symbologie "iconeCinema", et paramÃ¨tre la popup
    L.geoJson(dataCinema,{
        pointToLayer: function(feature,latlng){
            var marker = L.marker(latlng,{icon: iconeCinema});
            marker.bindPopup('<b><u>Description du cinÃ©ma</u></b><br>'
                           + "<b>Nom : </b>" + feature.properties.nom_etabli+ '<br>' 
                           + "<b>Nombre d'Ã©crans : </b>" + feature.properties.ecrans+ '<br>' 
                           + "<b>Nombre de fauteuils : </b>" + feature.properties.fauteuils+ '<br>'
                           + "<b>Arts et essais ? </b>" + feature.properties.art_et_ess+ '<br>'
                           + "<b>Adresse : </b>" + feature.properties.adresse+ '<br>'
                           + "<b>Arrondissement : </b>" + feature.properties.arrondisse
                           );
            return marker;
            }
                    }).addTo(map);
                                    });				
                                                        
    // crÃ©ation d'un contrÃ´le des couches pour modifier les couches de fond de plan	
    var baseLayers = {
        "OpenStreetMap": osmLayer,
        "Watercolor" : watercolorLayer
    };
    L.control.layers(baseLayers).addTo(map);
}