import React, { useEffect, useState} from 'react'
import { Row, Col }  from 'react-bootstrap'
import Chart from "react-google-charts";
import axios from 'axios'

const WeatherChart = (props) =>{
    const lon = props.lon
    const lat = props.lat 
    
    // h_ = history, f_ forecast 24h, fd_ forecast 5 days
    const [h_tempArray, h_setTempArray] = useState([])
    const [h_humidArray, h_setHumidArray] = useState([])
    const [h_pressureArray, h_setPressureArray] = useState([])
    const [h_windSpeedArray, h_setWindSpeedArray] = useState([])
    const [f_tempArray, f_setTempArray] = useState([])
    const [f_humidArray, f_setHumidArray] = useState([])
    const [f_pressureArray, f_setPressureArray] = useState([])
    const [f_windSpeedArray, f_setWindSpeedArray] = useState([])
    const [fd_tempArray, fd_setTempArray] = useState([])
    const [fd_humidArray, fd_setHumidArray] = useState([])
    const [fd_pressureArray, fd_setPressureArray] = useState([])
    const [fd_windSpeedArray, fd_setWindSpeedArray] = useState([])

    const getHistoryData = () => {    
        const thisdate = new Date()
        thisdate.setDate((thisdate.getDate() - 1));
        const targetDate = Math.floor(thisdate / 1000);
        axios.get("http://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+lat+"&lon="+lon+"&dt="+targetDate+"&appid="+process.env.REACT_APP_WEATHER_API)
        .then(response =>{
            let h_tempResult = [['x', 'ºC']]
            let h_humidResult = [['x', '%']]
            let h_pressureResult = [['x', 'hPa']]
            let h_windSpeedResult = [['x', 'm/s']]
            response.data.hourly.map((elem) =>{
                let date = new Date(elem.dt * 1000)
                h_tempResult.push([ `${date.getHours()}:${date.getMinutes()}`, Math.floor(elem.temp - (273.15))])
                h_humidResult.push([ `${date.getHours()}:${date.getMinutes()}`, Math.floor(elem.humidity)])
                h_pressureResult.push([ `${date.getHours()}:${date.getMinutes()}`, elem.pressure])
                h_windSpeedResult.push([ `${date.getHours()}:${date.getMinutes()}`, elem.wind_speed])
            })
            h_setTempArray(h_tempResult)            
            h_setHumidArray(h_humidResult)
            h_setPressureArray(h_pressureResult)
            h_setWindSpeedArray(h_windSpeedResult)
        })
        .catch(err =>{
            console.log("error", err)
            return err;

        })
    }
    const getForecastData = () => {    
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=current,minutely,alerts&appid="+process.env.REACT_APP_WEATHER_API)
        .then(response =>{
            // f_ = forecast 24h, fd_ = forecast 5 days
            let f_tempResult = [['x', 'ºC']]
            let f_humidResult = [['x', '%']]
            let f_pressureResult = [['x', 'hPa']]
            let f_windSpeedResult = [['x', 'm/s']]
            let fd_tempResult = [['x', 'ºC']]
            let fd_humidResult = [['x', '%']]
            let fd_pressureResult = [['x', 'hPa']]
            let fd_windSpeedResult = [['x', 'm/s']]
            // first the hourly chart
            response.data.hourly.map((elem) =>{
                let date = new Date(elem.dt * 1000)
                f_tempResult.push([ `${date.getHours()}:${date.getMinutes()}`, Math.floor(elem.temp - (273.15))])
                f_humidResult.push([ `${date.getHours()}:${date.getMinutes()}`, Math.floor(elem.humidity)])
                f_pressureResult.push([ `${date.getHours()}:${date.getMinutes()}`, elem.pressure])
                f_windSpeedResult.push([ `${date.getHours()}:${date.getMinutes()}`, elem.wind_speed])
            })
            // next the daily chart
            response.data.daily.map((elem) =>{
                let date = new Date(elem.dt * 1000)
                fd_tempResult.push([ `${date.getDate()}.${date.getMonth() +1}.${date.getFullYear()}`, Math.floor(elem.temp.day - (273.15))])
                fd_humidResult.push([ `${date.getDate()}.${date.getMonth() +1}.${date.getFullYear()}`, Math.floor(elem.humidity)])
                fd_pressureResult.push([ `${date.getDate()}.${date.getMonth() +1}.${date.getFullYear()}`, elem.pressure])
                fd_windSpeedResult.push([ `${date.getDate()}.${date.getMonth() +1}.${date.getFullYear()}`, elem.wind_speed])
            })
            f_setTempArray(f_tempResult)            
            f_setHumidArray(f_humidResult)
            f_setPressureArray(f_pressureResult)
            f_setWindSpeedArray(f_windSpeedResult)
            fd_setTempArray(fd_tempResult)            
            fd_setHumidArray(fd_humidResult)
            fd_setPressureArray(fd_pressureResult)
            fd_setWindSpeedArray(fd_windSpeedResult)
        })
        .catch(err =>{
            console.log("error", err)
            return err;
        })
    }

    useEffect(() => {
        getHistoryData();
        getForecastData();
    },[])

    return(
        <Col>
            <h5>24h ennuste</h5>
            <Row>
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={f_tempArray}
                    options={{
                        hAxis: {
                        title: 'Aika'
                        },
                        vAxis: {
                        title: 'Lämpö'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={f_humidArray}
                    options={{
                        hAxis: {
                        title: 'Aika'
                        },
                        vAxis: {
                        title: 'Kosteus'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                   className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={f_pressureArray}
                    options={{
                        hAxis: {
                        title: 'Aika'
                        },
                        vAxis: {
                        title: 'Paine'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={f_windSpeedArray}
                    options={{
                        hAxis: {
                        title: 'Aika'
                        },
                        vAxis: {
                        title: 'Tuuli'
                        },
                        curveType: 'function'
                    }}
                />
            </Row>
            <h5>5 päivän ennuste</h5>
            <Row>
                <Chart
                   className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={fd_tempArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Lämpö'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={fd_humidArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Kosteus'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={fd_pressureArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Paine'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={fd_windSpeedArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Tuuli'
                        },
                        curveType: 'function'
                    }}
                />
            </Row>
            <h5>Päivä historia</h5>
            <Row>
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={h_tempArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Lämpö'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={h_humidArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Kosteus'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={h_pressureArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Paine'
                        },
                        curveType: 'function'
                    }}
                />
                <Chart
                    className="custom-chart"
                    chartType="LineChart"
                    loader={<div>Ladataan... </div>}
                    data={h_windSpeedArray}
                    options={{
                        hAxis: {
                        title: 'Aika', 
                        slantedText:true, 
                        slantedTextAngle:45
                        },
                        vAxis: {
                        title: 'Tuuli'
                        },
                        curveType: 'function'
                    }}
                />
            </Row>
        </Col>
    )
}
export default WeatherChart;