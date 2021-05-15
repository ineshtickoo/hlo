import React from 'react'
import L from 'leaflet'
import { v4 as uuidv4 } from 'uuid';
import {MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle, Rectangle, SVGOverlay, Tooltip} from 'react-leaflet'


const GetIcon=(_iconsize,)=>{
    // const iconstring =""
    return L.icon({
        iconUrl: "./assets/pin.png",
        iconSize: [_iconsize]
    })
}

export default function MapSection() {
    const position=[-8.7832, -0.09] //singapore
    const iconLocations =[
        {"name":"west", "position":[1.35735, 103.7], "size":40,"icon":"💜"},
        {"name":"east", "position":[1.35735, 103.94], "size":40, "icon":"💜"},
        {"name":"sout", "position":[1.3435, 103.94], "size":40, "icon":"💜"},
        {"name":"north", "position":[1.5, 103.94], "size":40, "icon":"💜"},

    ]


    const rectangle =  [
        [-8.505, -0.90],
        [-8.333, -0.60]  
           ]

    const rectangle2 =  [
    [-8.600, 0.41],
    [-8.413, 0.60]  
        ]

        const rectangle2_2 =  [
            [-8.505, 0.30],
            [-8.333, 0.60]  
                ]

    const rectangle2_3 =  [
        [-8.600, 0.41],
        [-8.413, 0.60]  
            ]

    const rectangle3 =  [
        [-9.200, -0.90],
        [-9.050, -0.75]  
            ]

    const rectangle4 =  [
        [-9.200, -0.65],
        [-9.050, -0.50]  
            ]

    const rectangle4_1 =  [
        [-8.700, 0.41],
        [-8.880, 0.60]  
            ]

    return (
        <MapContainer className="map"
        center={position}
        zoom={10}
        style={{height: "100vh", width:"100%"}}
        >
             <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  />
  {iconLocations.map((location)=>(
  <Marker key={uuidv4()} position={location.position} 
  icon={GetIcon(40)}
  >
      <Popup>
       {location.name}
      </Popup>
    </Marker>))}

    <Marker key={uuidv4()} position={position} 
  icon={GetIcon(40)}
  >
      <Tooltip direction="top" permanent>
       You are here
      </Tooltip>
    </Marker>


    <MapContainer className="map"
        center={position}
        zoom={10}
        style={{height: "100vh", width:"100%"}}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
        >

<FeatureGroup 
pathOptions={{color: "#633CFF",
    fillOpacity: "21%",
    stroke: 0}}
>
      <Popup>Popup in FeatureGroup</Popup>
      <Rectangle bounds={rectangle}
       center={[51.505, -0.09]}
    //    style={{fillOpacity: 1}}
       />
       <SVGOverlay attributes={{ stroke: 'red' }} 
       bounds={rectangle}
       >
      {/* <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <circle r="5" cx="10" cy="10" fill="red" /> */}
      <image href={"./assets/icon1.png"}  x="15px" y="15px" />
      <text x="40%" y="50%" style={{fontSize:"2em", stroke:"none", fill:"white"}}>
        Food Court
      </text>
    </SVGOverlay>
    </FeatureGroup>

    <FeatureGroup 
pathOptions={{color: "#633CFF",
fillOpacity: "21%",
stroke: 0}}
>
      <Popup>Popup in FeatureGroup 2</Popup>
      <Rectangle bounds={rectangle2}/>
      <SVGOverlay attributes={{ stroke: 'red' }} 
       bounds={rectangle2}
       >
      <image href={"./assets/icon2.png"}  x="30%" y="30%" height="60px" />
    </SVGOverlay>
    </FeatureGroup>
    

    {/* <FeatureGroup 
pathOptions={{color: "#633CFF",
fillOpacity: "21%",
stroke: 0}}
>
      <Popup>Popup in FeatureGroup 2</Popup>
      <Rectangle bounds={rectangle2_2}/>
    </FeatureGroup> */}





    <FeatureGroup 
pathOptions={{color: "#633CFF",
fillOpacity: "21%",
stroke: 0}}
>
      <Popup>Popup in FeatureGroup 3</Popup>
      <Rectangle bounds={rectangle3}/>
      <SVGOverlay attributes={{ stroke: 'red' }} 
       bounds={rectangle3}
       >
      {/* <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <circle r="5" cx="10" cy="10" fill="red" /> */}
      <image href={"./assets/icon2.png"}  x="25%" y="25%" height="50px" />
    </SVGOverlay>
    </FeatureGroup>

    <FeatureGroup 
pathOptions={{color: "#633CFF",
    fillOpacity: "21%",
    stroke: 0}}
>
      <Popup>Popup in FeatureGroup 4</Popup>
      <Rectangle bounds={rectangle4}/>
      <SVGOverlay attributes={{ stroke: 'red' }} 
       bounds={rectangle4}
       >
      <image href={"./assets/icon3.png"}  x="20%" y="5%" height="100px" />
    </SVGOverlay>
    </FeatureGroup>


    <FeatureGroup 
pathOptions={{color: "#633CFF",
    fillOpacity: "21%",
    stroke: 0}}
>
      <Popup>Popup in FeatureGroup 4_1</Popup>
      <Rectangle bounds={rectangle4_1}/>
      <SVGOverlay attributes={{ stroke: 'red' }} 
       bounds={rectangle4_1}
       >
      <image href={"./assets/icon4.png"}  x="20%" y="25%" height="60px" />
    </SVGOverlay>
    </FeatureGroup>


    </MapContainer>

            
        </MapContainer>
    )
}
