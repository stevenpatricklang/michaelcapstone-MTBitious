import GoogleMapReact from 'google-map-react';
import {Paper, Typography,useMediaQuery} from "@mui/material";
import LocationOnOutLinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

export default function Map({setCoordinates, setBounds,places}){

    const classes = useStyles();

    const isDesktop = useMediaQuery("(min-width:600px)");

    const coordinates = {lat :40.058629, lng : -82.650012 }

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={10}
                margin={[50,50,50,50]}
                options={""}
                onChange={(e) =>{
                    console.log(e)
                    setCoordinates({lat: e.center.lat,lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                } }
                // onChildClick={}
            >
                {places?.map((place,i) => (
                    <div classeName={classes.markerContainer}
                    lat={Number(place.lat)}
                    lng={Number(place.lon)}
                    key={i}>
                        {!isDesktop ? (
                            <LocationOnOutLinedIcon color="primary" fontSize="large"/>
                        ) : (
                            <Paper elevation={3} className = {classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img className={classes.pointer} src={place.thumbnail ? place.thumbnail : "https://www.ridemorebikes.com/wp-content/uploads/2011/07/whistler-bike-park-bline.jpg"} alt={place.name}/>
                            <Rating size="small" value={Number(place.rating)} readOnly/>
                            </Paper>
                        )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}