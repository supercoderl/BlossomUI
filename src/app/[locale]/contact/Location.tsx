import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationSection = () => {
    const center = {
        lat: 37.437041393899676,
        lng: -4.191635586788259
    };

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    return (
        <section className="relative">
            <div className="flex mx-auto relative">
                <div className="w-full relative flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="h-[662px] grid md:grid-cols-2"> {/* Set explicit height here */}
                                <div className="w-full md:h-full">
                                    <img 
                                        className="w-full md:h-full object-cover" 
                                        decoding="async" 
                                        src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/12/Contact-2.jpg" 
                                        alt="" 
                                    />
                                </div>
                                <div className="w-full md:h-full flex">
                                    <div id="map" className="w-full h-full overflow-hidden relative">
                                        <div className="cursor-grab w-full h-full">
                                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                                                <GoogleMap
                                                    mapContainerStyle={containerStyle}
                                                    center={center}
                                                    zoom={10}
                                                >
                                                    <Marker position={center} />
                                                </GoogleMap>
                                            </LoadScript>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationSection;