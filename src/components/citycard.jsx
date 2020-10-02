import React, { useState} from 'react';
import { Container, Row, Col, Button, Image, InputGroup, FormControl}  from 'react-bootstrap'
import '../index.css';
import Modal from 'react-modal';
import WeatherChart from './chart'

//massive image import
import cloudy from '../media/001-cloud.png'
import rain from '../media/002-rainy.png'
import rainbow from '../media/004-rainbow.png'
import clear from '../media/005-sun.png'
import warm from '../media/007-hot.png'
import cold from '../media/008-cold.png'
import thunder from '../media/013-thunder.png'
import windy from '../media/014-windy.png'
import tornado from '../media/015-tornado.png'
import mist from '../media/016-mist.png'
import umbrella from '../media/017-umbrella.png'
import sunset from '../media/018-sunset.png'
import sunrise from '../media/019-sunrise.png'
import humidity from '../media/022-humidity.png'
import snow from '../media/025-snow.png'


const CityCard = (props) => {
    const prospData = props.data;
    const deletecity = props.deletecity;
    const cardObject = JSON.parse(prospData);

    const [dataModal, setdataModal] = useState(false)
    const [lon, setLon] = useState("")
    const [lat, setLat] = useState("")

    const formatedRiseTime = new Date(cardObject.sys.sunrise * 1000)
    const formatedSetTime = new Date(cardObject.sys.sunrise * 1000)

    const closeDataModal = () => {
        setdataModal(false)
    }
    const removeCity = () =>{
        deletecity(cardObject.name)
    }
    const getDescriptionIcon = () => {
        const desc = cardObject.weather[0].main;
        switch (desc){
            case "Clouds":
                return cloudy;
            case "Clear":
                return clear;
            case "Rain":
                return rain;
            case "Thunderstorm":
                return thunder;
            case "Drizzle":
                return rain;
            case "Snow":
                return snow;
            case "Atmosphere":
                const id = cardObject.weather[0].id;
                switch(id){
                    case 701:
                        return mist;
                    case 711:
                        return umbrella;
                    case 721:
                        return mist;
                    case 731:
                        return windy;
                    case 741:
                        return mist;
                    case 751:
                        return windy;
                    case 761:
                        return windy;
                    case 762:
                        return umbrella;
                    case 771:
                        return windy;
                    case 781:
                        return tornado;
                    default: 
                        return rainbow;
                }
            default:
                return clear;
        }
    }
    const openData = () => {
        setLon(cardObject.coord.lon)
        setLat(cardObject.coord.lat)
        setdataModal(true)
    }

    return(
        <div className="city-card" >
                <Col>
                    <Row >
                        <div className="centered">
                            <h5>{cardObject.name}</h5>
                            <Image src={getDescriptionIcon()} className="large-icon"/>
                        </div>
                        
                        <div className="custom-flexbox">
                            <Col>
                                { ( cardObject.main.temp - (273.15) > 0) ? ( 
                                    <Image src={warm} className="icon"/>
                                    ) : (
                                        <Image src={cold} className="icon"/>
                                        )
                                    }
                                <p className="nowrap-line">{(cardObject.main.temp - (273.15)).toFixed(1)} ºC</p>
                                <Image src={sunset} className="icon"/>
                                <p className="nowrap-line">{`${formatedSetTime.getHours()}:${formatedSetTime.getMinutes()}`}</p>
                            </Col>
                            <Col>
                                <Image src={humidity} className="icon"/>
                                <p className="nowrap-line">{cardObject.main.humidity}%</p>
                                <Image src={sunrise} className="icon"/>
                                <p className="nowrap-line">{`${formatedRiseTime.getHours()}:${formatedRiseTime.getMinutes()}`}</p>
                            </Col>
                        </div>
                    </Row >
                </Col>
                    <div className="custom-flexbox">
                        <Button className="centered" onClick={event => removeCity(event)}>Poista</Button>
                        <Button className="centered" onClick={event => openData()}>Infoa</Button>
                    </div>
            <Modal 
                isOpen={dataModal}
                onRequestClose={closeDataModal}>
                <h3>Sää tiedot</h3>
                <h5>{cardObject.name}</h5>
                <p>Lämpö: {String( (cardObject.main.temp - (273.15)).toFixed(1) )} ºC</p>
                <p>Kosteus: {String(cardObject.main.humidity)}%</p>
                <p>{new Date().toLocaleDateString('fi')}</p>
                <WeatherChart lon={lon} lat={lat}/>
                <Button onClick={closeDataModal} >Sulje</Button>
            </Modal>
        </div>
    )
}
export default CityCard;