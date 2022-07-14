import axios from "axios";
import { useEffect, useState } from "react";
import {Card, Container, Form, Stack, ListGroup, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function Tiles({obj}){
  return(
    <div>
      <Card style={{ width: '18rem', margin:'auto'}}>
        <Card.Img variant="top" src={obj.flags} />
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Area: {obj.area} sq km</ListGroup.Item>
            <ListGroup.Item>Continent: {obj.continents}</ListGroup.Item>
            <ListGroup.Item>Currency: {Object.values(obj.currencies)[0] && Object.values(obj.currencies)[0].name} ({Object.values(obj.currencies)[0] && Object.values(obj.currencies)[0].symbol})</ListGroup.Item>
            <ListGroup.Item>Languages: {Object.values(obj.languages).map(i=><i>{i} </i>)}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

export default function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then((res) => {
      //console.log(res.data);
      setCountries([])
      let cons = res.data;
                cons.map(con=>
                    // console.log(con);
                    setCountries(prevLoad=>[...prevLoad,con])
                )
    });
    
  }, [name]);
  return (
    <div className="App">
      <Stack gap={3}>
        <Form.Control size="" type="text" placeholder="Enter Country Name" style={{margin:'4rem', width:'auto'}} onChange={(e)=>setName(e.target.value)}/>
      <Container fluid className="justify-content-center">
      
      <Row xs={1} md={3} className="g-4">
      {
      countries &&
        countries.map((l, i) =>{

          let obj = {
             name:l.name.common? l.name.common : "",
             flags:l.flags.png? l.flags.png : "",
             area:l.area? l.area : "",
             continents:l.continents[0]? l.continents[0] : "",
             currencies:l.currencies? l.currencies : "",
             languages:l.languages? l.languages : ""
          }
          return (<Tiles key={i} obj={obj} />)
        })
      }
      </Row>
      </Container>
      </Stack>
    </div>
  );
}
