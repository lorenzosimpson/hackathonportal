import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardBody, Row, Container} from 'reactstrap';
import { Form, TextArea, Button, Header } from 'semantic-ui-react';
import { DateTimePicker, Textarea } from 'react-rainbow-components';
import history from '../history';
import { UserContext } from '../contexts/UserContext';

function CreateHackathonForm(props) {
    const [hackathonData, setHackathonData] = useState({})
    const [startDate, changeStartDate] = useState(new Date())
    const [endDate, changeEndDate] = useState(new Date());
    const { user } = useContext(UserContext);

    function handleChange(e) {
        setHackathonData({
            ...hackathonData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const submitData = {
            ...hackathonData,
            start_date: startDate,
            end_date: endDate,
            organizer_id: user.id
        }
        axios.post('/hackathon', submitData)
        .then(response => {
            history.push(`/hackathons/${response.data._id}`)
        })
        .catch(err => console.log(err))
    }


    return (
        <Container className="mb-4 mt-5">
            <Header as="h1">New Hackathon</Header>
            <Row className="justify-content-center">
                <Card className="w-100">
                    <CardBody>
                       <Form onChange={handleChange} onSubmit={handleSubmit}  >
                              <Form.Field>
                                <label for="name">Name</label>
                                <input id="name"  name="name" required
                                placeholder="UCLA Spring Hackathon, etc." />
                            </Form.Field>
                           <Form.Field>
                                <label for="location">Location</label>
                                <input id="location"  name="location"
                                required
                                placeholder="Address, Online/Remote, etc." />
                            </Form.Field>
                            <Form.Field>
                                <label for="about">Details</label>
                                <TextArea
                                name="description"
                                id="about"
                                required
                                placeholder="Tell potential participants about this hackathon" />
                            </Form.Field>

                            <Form.Field>
                                <label for="image">Image URL</label>
                                <input
                                name="image"
                                id="image"
                                placeholder="http://imagelocation.com/image"
                                />
                            </Form.Field>

                           <Form.Field>
                            <label>Start Date</label>
                                <DateTimePicker
                                    id="startDate"
                                    name="startDate"
                                    onChange={changeStartDate}
                                    value={startDate}
                                    minDate={new Date()}
                                    label="Start Date"
                                    labelAlignment="left"
                                    hideLabel
                                />
                
                            </Form.Field>

                            <Form.Field>
                                <label for="endDate">End Date</label>
                                <DateTimePicker
                                    name="endDate"
                                    onChange={changeEndDate}
                                    value={endDate}
                                    minDate={new Date()}
                                    placeholder="Choose End Date and Time"
                                    label="End Date"
                                    labelAlignment="left"
                                    hideLabel
                                />
                            </Form.Field>

                            <div className="d-flex justify-content-end">
                                <Button primary type="submit">Submit</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    );
}

export default CreateHackathonForm;