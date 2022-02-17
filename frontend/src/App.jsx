import React, {useEffect, useState} from 'react';

import {CssBaseline, Grid} from "@material-ui/core";
import Header from "./Components/Header/Header";
import Map from "./Components/Map/Map";
import List from "./Components/List/List";
import {getPlacesData} from "./Services/API_Service";
function App() {

    const [places, setPlaces] = useState([])

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState(null)

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
    //         setCoordinates({lat:latitude,lng:longitude});
    //     })
    // },[]);

    useEffect(() => {

        getPlacesData()
            .then((data) => {
                setPlaces(data)
                console.log("Orte in deiner Nähe", data)
            })
    }, [])

    return (

                <>
                    <CssBaseline/>
                    <Header/>
                    <Grid container spacing={3} style={{width: "100%"}}>
                        <Grid item xs={12} md={4}>
                            <List places={places}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Map
                                setCoordinates={setCoordinates}
                                setBounds={setBounds}
                                coordinates={coordinates}
                                places={places}
                            />
                        </Grid>
                    </Grid>
                </>

    )
}

export default App;
