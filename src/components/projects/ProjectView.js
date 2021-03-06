import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Grid, Header, Segment, Menu, Icon, Label } from 'semantic-ui-react';
import { Button } from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';
import InnerLoader from '../load/InnerLoader';
import ProjectCard from './ProjectCard';
import NoProjects from './NoProjects';
import history from '../../history';

const divideArrayIntoRows = (columns, arr) => {
    var R = [];
    for (var i = 0; i < arr.length; i += columns)
        R.push(arr.slice(i, i + columns));
    return R;
}

function ProjectView(props) {
    const [projects, setProjects] = useState([])
    const hackathon_id = props.hackathonId;
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext);
    const { alreadyParticipatingInAProject, isOrganizer, hackathon } = props;
    const [pendingProjects, setPendingProjects] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`/project/${hackathon_id}`)
            .then(response => {
                setProjects(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/project/pending/${hackathon_id}`)
            .then(response => {
                setPendingProjects(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    const dividedRows = divideArrayIntoRows(3, projects)

    if (loading) return <InnerLoader />

    return (
        <div className="mb-5">
            <Segment>
                <Segment clearing>
                    <Header as="h2" floated='left'>
                        Projects
                </Header>
                    <Header floated='right' className="d-flex">
                        <Button
                            color='primary'
                            onClick={() => {
                                history.push({
                                    pathname: '/project',
                                    state: {
                                        hackathon: hackathon
                                    }
                                })
                            }}>
                            <Icon name='plus' />
                     Create</Button>
                        {(isOrganizer) ? (

                            <Button outline color='danger' className='ml-2' onClick={() => history.push(`/approve/${hackathon_id}`)}>
                                <Icon name='clock outline' /> Pending
                                {(pendingProjects.length > 0) && (
                                    <div id="pending-length">{pendingProjects.length}</div>
                                )}
                            </Button>


                        ) : null}
                    </Header>
                </Segment>
                {projects.length ? (
                    <Segment>
                        <Grid columns="three" stackable>
                            {dividedRows.map(row => (
                                <Grid.Row>
                                    {row.map(project => {
                                        return (
                                            <Grid.Column>
                                                <ProjectCard
                                                    project={project}
                                                    header={project.name}
                                                    description={project.description}
                                                    image={project.image}
                                                    extra={project.participants.length}
                                                    project_id={project._id}
                                                    setProjects={setProjects}
                                                    alreadyParticipatingInAProject={alreadyParticipatingInAProject}
                                                    isOrganizer={isOrganizer}
                                                />
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid.Row>
                            ))}
                        </Grid>
                    </Segment>
                ) : (
                    <NoProjects hackathon={hackathon} />
                )}
            </Segment>
        </div>
    );
}

export default ProjectView;