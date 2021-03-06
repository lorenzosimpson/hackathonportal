import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import SearchComponent from '../search/Search';
import ExploreCardContainer from './ExploreCardContainer';


function AllHackathons(props) {
    const [hackathons, setHackathons] = useState([])
    const [noResults, setNoResults] = useState(false)
    useEffect(() => {
        axios.get(`/hackathon/explore`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathons(res.data)
            if (!res.data.length) setNoResults(true)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [])


    return (
        <>
           
        <Container className="my-5">
            <Header as="h1"
            content="Hackathon Events"
            subheader="Browse events here"
            />

            <ExploreCardContainer cards={hackathons} />
            
            <SearchComponent source={hackathons}
            searchURL="/hackathon"
             noResults={noResults} 
             setNoResults={setNoResults} />
        </Container>
        </>
    );
}

export default AllHackathons;