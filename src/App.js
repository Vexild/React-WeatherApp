import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl}  from 'react-bootstrap'
import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityCard from './components/citycard'
import axios from 'axios'

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [invalidError, setInvalidError] = useState('');

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }
  const getData = () => {
    const resource = JSON.parse(localStorage.getItem('data'));
    resource ? setSearchArray(resource) : (
        console.log("ERROR: No localstorage")
    )
}
  const searchRequest = (event) =>{
    event.preventDefault();
    setInvalidError('');
    axios.get("http://api.openweathermap.org/data/2.5/weather?q="+searchWord.toLowerCase()+"&appid="+process.env.REACT_APP_WEATHER_API)
      .then(response =>{
         if(!String(searchArray).includes(JSON.stringify(response.data))){
           setSearchArray([...searchArray, JSON.stringify(response.data)])

          }else{
            setInvalidError("This city is already displayed")
          }          
      })
      .catch(err =>{
        console.log("error", err)
        setInvalidError(String(err))
      })
  }
  
  const deleteCityFromState = (city) => {
    const newList = searchArray.filter((item) => 
      JSON.parse(item).name !== city
    );
    setSearchArray(newList);
  }

  useEffect(() => {
    getData()
  },[]);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(searchArray))
    setSearchWord('')
  }, [searchArray]);

  return (
    <Container fluid className="mainframe">
      <Col className="centered">
        <h1>Sää</h1>
      </Col>
      <Col>
        <form onSubmit={searchRequest}>

        <label htmlFor="basic-url">Etsi paikan nimellä:</label>
          <InputGroup className="mb-3">
            <FormControl 
            autoComplete="off"
            id="basic-url" 
            aria-describedby="basic-addon3"
            onChange={handleSearchChange}
            value={searchWord} />
            <Button type="submit" >Etsi</Button>
          </InputGroup>
        </form>
      </Col>
      <Col>
            <Row>
              {invalidError ? ( <p>Error! {invalidError}</p>) : (<p></p>) }       
            </Row>
            <Row className="citylisting">
              {searchArray.map(elem =>{
                return (
                    <CityCard data={elem} deletecity={deleteCityFromState} />
                )
              })}
            </Row>
      </Col>
      <div>Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Container>
  );
}
export default App;