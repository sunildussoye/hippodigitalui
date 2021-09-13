import React, {useState} from 'react';
import {Button, Form, Row, Col, Table} from 'react-bootstrap';
import axios from 'axios';

const searchtable = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(false);
    let url = "http://localhost:8080/crimebypostcode/";

    const handleSubmit = e => {
        e.preventDefault();
        url = url + searchTerm.replace(/\s+/g, '');
        fetchResults();
    }

    const fetchResults = () => {
        axios.get(url)
            .then(r => setSearchResults(r.data), setSearchError(false))
            .catch(() => setSearchError(true), setSearchResults([]));
    }

    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Control
                            className="mb-6"
                            placeholder='Crime rate by post code'
                            onChange={event => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button variant={'secondary'} type="submit"
                                style = {{margin:"15px"}}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <div> {searchError ? 'Invalid PostCode or Service unavailable' : ""} </div>
                <Row/>
            </Form>

            <Table className='table table-stripped'>
                <thead className={"thead-light"}>
                <tr>
                    <th>Category</th>
                    <th>Force</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>ContextOfCrime</th>
                </tr>
                </thead>
                <tbody>
                {searchResults.map((k) =>
                    <tr key={k.id}>
                        <td>{k.crimeCategory}  </td>
                        <td>{k.forceResponsible}  </td>
                        <td>{k.locationName}  </td>
                        <td>{k.dateOfCrime}  </td>
                        <td>{k.crimeContext}  </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>)
}
export default searchtable;

