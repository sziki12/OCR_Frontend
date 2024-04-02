import {AdvancedMarker, APIProvider, Map, Marker, Pin} from '@vis.gl/react-google-maps';

export default function GoogleMap(props)
{
    //props.markers
        const defaultLocation = {lat: 61.2176, lng: -149.8997};
        let markers = props.markers || [defaultLocation]

        return (
            <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
                <div style={{height:"50vh", width:"50%"}}>
                    <Map
                        mapId={"3d321da67ef9306"}
                        defaultCenter={markers[0]}
                        defaultZoom={15}>
                        {
                            markers.map((marker)=>{
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