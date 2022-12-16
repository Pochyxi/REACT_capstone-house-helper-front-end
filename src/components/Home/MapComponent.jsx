import React , { useEffect , useState } from 'react';
import {
    GoogleMap ,
    useLoadScript ,
    Marker ,
    InfoWindow ,
} from "@react-google-maps/api";
import usePlacesAutocomplete , {
    getGeocode ,
    getLatLng ,
} from "use-places-autocomplete";
import {
    Combobox ,
    ComboboxInput ,
    ComboboxPopover ,
    ComboboxList ,
    ComboboxOption ,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import './MapComponent.css'
import { Col , Container , Row } from "react-bootstrap";
import { Button , Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

const libraries = [ "places" ];
const mapContainerStyle = {
    height : "50vh" ,
    width : "100vw" ,
}

// Le opzioni della mappa
const options = {
    // styles: mapStyle,
    disableDefaultUI : false ,
    zoomControl : true ,
};


const MapComponent = () => {
    const [ myCords , setMyCords ] = useState ( null )

    const geoFindMe = () => {

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setMyCords ( {
                lat : latitude ,
                lng : longitude
            } )

            console.log ( myCords )

        }

        function error() {
            console.log ( 'Impossibile trovare la località' )
        }

        if ( !navigator.geolocation ) {
        } else {
            navigator.geolocation.getCurrentPosition ( success , error );
        }

    }

    useEffect ( () => {
        geoFindMe ()
    } , [] )


    const {isLoaded , loadError} = useLoadScript ( {
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY ,
        libraries ,
    } );
    const [ markers , setMarkers ] = React.useState ( [] );
    const [ selected , setSelected ] = React.useState ( null );

    const onMapClick = React.useCallback ( (e) => {

        setMarkers ( (current) => [
            ...current ,
            {
                lat : e.latLng.lat () ,
                lng : e.latLng.lng () ,
                time : new Date () ,
            } ,
        ] );
    } , [] );

    const mapRef = React.useRef ();
    const onMapLoad = React.useCallback ( (map) => {
        mapRef.current = map;
    } , [] );

    const panTo = React.useCallback ( ({lat , lng}) => {
        mapRef.current.panTo ( {lat , lng} );
        mapRef.current.setZoom ( 17 );
    } , [] );

    if ( loadError ) return "Error";
    if ( !isLoaded ) return "Loading...";

    function Locate({panTo}) {
        return (
            <Button
                className="locate"
                variant={ 'contained' }
                onClick={ () => {
                    navigator.geolocation.getCurrentPosition (
                        (position) => {
                            panTo ( {
                                lat : position.coords.latitude ,
                                lng : position.coords.longitude ,
                            } );
                        } ,
                        () => null
                    );
                } }
            >
                <NearMeOutlinedIcon/>
            </Button>
        );
    }

    function Search({panTo}) {
        const {
            ready ,
            value ,
            suggestions : {status , data} ,
            setValue ,
            clearSuggestions ,
        } = usePlacesAutocomplete ( {
            requestOptions : {
                location : {lat : () => myCords.lat , lng : () => myCords.lng} ,
                radius : 1000 ,
                type : [ 'all' ]
            } ,
        } );

        // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

        const handleInput = (e) => {
            console.log ( e )
            setValue ( e.target.value );
        };

        const handleSelect = async (address) => {
            setValue ( address , false );
            clearSuggestions ();

            try {
                const results = await getGeocode ( {address} );
                const {lat , lng} = await getLatLng ( results[0] );
                panTo ( {lat , lng} );
                setMarkers ( (current) => [
                    ...current ,
                    {
                        lat : lat ,
                        lng : lng ,
                        time : new Date () ,
                    } ,
                ] )
            } catch ( error ) {
                console.log ( "😱 Error: " , error );
            }
        };

        return (
            <Row className={ 'justify-content-center' }>
                <Combobox onSelect={ handleSelect }>
                    <TravelExploreOutlinedIcon fontSize={ 'large' }/>
                    <ComboboxInput
                        value={ value }
                        onChange={ handleInput }
                        disabled={ !ready }
                        placeholder="Cerca luoghi..."
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            { status === "OK" &&
                                data.map ( ({id , description} , index) => {
                                    return (
                                        <ComboboxOption key={ index } value={ description }/>
                                    )
                                } ) }
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </Row>
        );
    }

    return (
        <Row style={ {
            borderLeft : '5px solid #6610f2' ,
            borderBottom: '1px solid #6610f2'
        } }>
            <Row >
                <Col xs={ 12 } md={ 6 }>
                    {/*<Card className={ 'p-2' }>*/}
                        <Row className={ 'justify-content-between text-start mb-3 text-nowrap' }>
                            <Col className={'mt-2'} xs={4} md={6}>
                                <ShoppingCartOutlinedIcon
                                    style={ {
                                        backgroundColor : "royalblue" ,
                                        color : 'white' ,
                                        borderRadius : '50%' ,
                                        padding : '5px'
                                    } }
                                    fontSize={ 'large' }
                                /> Supermercati
                            </Col>
                            <Col className={'mt-2'} xs={4} md={6}>
                                <EmailOutlinedIcon
                                    style={ {
                                        backgroundColor : "darkgrey" ,
                                        color : 'white' ,
                                        borderRadius : '50%' ,
                                        padding : '5px'
                                    } }
                                    fontSize={ 'large' }
                                /> Poste
                            </Col>
                            <Col className={'mt-2'} xs={4} md={6}>
                                <RestaurantOutlinedIcon
                                    style={ {
                                        backgroundColor : "orange" ,
                                        color : 'white' ,
                                        borderRadius : '50%' ,
                                        padding : '5px'
                                    } }
                                    fontSize={ 'large' }
                                /> Ristoranti
                            </Col>
                            <Col className={'mt-2'} xs={4} md={6}>
                                <LocalMallOutlinedIcon
                                    style={ {
                                        backgroundColor : "dodgerblue" ,
                                        color : 'white' ,
                                        borderRadius : '50%' ,
                                        padding : '5px'
                                    } }
                                    fontSize={ 'large' }
                                /> Negozi
                            </Col>
                        </Row>
                        <Row className={ 'justify-content-between align-items-center' }>
                            <Col className={ 'ms-2' }>
                                <Search panTo={ panTo }/>
                            </Col>
                            <Col className={ 'text-end' }>
                                <Locate panTo={ panTo }/>
                            </Col>
                        </Row>
                    {/*</Card>*/}
                </Col>

                <Col xs={ 12 } md={ 6 }>

                    <Card>
                        <Row className={ 'justify-content-center' }>
                            {
                                myCords && (
                                    <GoogleMap
                                        id="map"
                                        mapContainerStyle={ mapContainerStyle }
                                        zoom={ 16 }
                                        center={ myCords }
                                        options={ options }
                                        // onClick={ onMapClick } // al click della mappa verà aggiunto un marker
                                        onLoad={ onMapLoad }
                                    >
                                        { markers.map ( (marker) => (
                                            <Marker
                                                key={ `${ marker.lat }-${ marker.lng }` }
                                                position={ {lat : marker.lat , lng : marker.lng} }
                                                onClick={ () => {
                                                    setSelected ( marker );
                                                } }
                                                // icon={{
                                                //     // url : '',
                                                //     scaledSize: new window.google.maps.Size(30,30)
                                                // origin: new window.google.maps.Point(0,0)
                                                // anchor: new window.google.maps.Point(15,15)
                                                // }}
                                            />
                                        ) ) }

                                        { selected ? (
                                            <InfoWindow
                                                position={ {lat : selected.lat , lng : selected.lng} }
                                                onCloseClick={ () => {
                                                    setSelected ( null );
                                                } }
                                            >
                                                <div>
                                                    <h2>
                                                        Luogo selezionato
                                                    </h2>
                                                    <p>{ formatRelative ( selected.time , new Date () ) }</p>
                                                </div>
                                            </InfoWindow>
                                        ) : null
                                        }
                                    </GoogleMap>
                                )
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>

        </Row>

    );
};


export default MapComponent;