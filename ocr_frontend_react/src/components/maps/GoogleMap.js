import { Loader } from "@googlemaps/js-api-loader"
import {AdvancedMarker, APIProvider, Map, Marker, Pin} from '@vis.gl/react-google-maps';

export default function GoogleMap(props)
{
    //props.markers
        const position = {lat: 61.2176, lng: -149.8997};
        return (
            <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
                <div style={{height:"80vh", width:"100%"}}>
                    <Map
                        mapId={"3d321da67ef9306"}
                        defaultCenter={position}
                        defaultZoom={10}>
                        {
                            props.markers.map((marker)=>{
                                return(
                                    <AdvancedMarker key={marker.id} position={marker.location}>
                                    </AdvancedMarker>
                                )
                            })
                        }

                    </Map>
                </div>
            </APIProvider>
        );
}