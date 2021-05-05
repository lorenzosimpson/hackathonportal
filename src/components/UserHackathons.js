import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';
import { Container } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import SearchComponent from './Search';
import useAuthentication from '../utils/useAuthentication';


function UserHackathons(props) {
    // const { user } = useContext(SessionContext);
    const [user] = useAuthentication();
    const [hackathons, setHackathons] = useState([])
    const [noResults, setNoResults] = useState(false)

    useEffect(() => {
        if (user.hasOwnProperty('id')) {
        console.log('use effect called')
        axios.get(`/hackathon/u/${user.id}`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
            if (!res.data.length) setNoResults(true)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }
    }, [user])
    return (
        <>
        <Container className="my-5">
            <Header as="h1"
            content="My Hackathons"
            subheader="Events you're participating in and organizing are listed here."
            />
            <SearchComponent source={hackathons}
            searchURL={`/hackathon/u/${user.id}`}
             noResults={noResults}
              setNoResults={setNoResults} />
        </Container>
        </>
    );
}

export default UserHackathons;