import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus , FiArrowRight} from 'react-icons/fi';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';

import mapMarkerImg from '../Images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';

const mapIcon = leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap (){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(()=> {
        api.get('orphanages').then(response => {
             setOrphanages(response.data);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong> Rio do Sul</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <MapContainer center= {[-23.6404601,-46.6122262]} zoom={15} style = {{ width: '100%', height: '100%' }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />   

                {orphanages.map(orphanage =>{
                   return(
                   <Marker key={orphanage.id} icon ={mapIcon} position={[orphanage.latitude,orphanage.longitude]}>
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </Popup>   
                    </Marker> 
                   )
                })}            
            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;