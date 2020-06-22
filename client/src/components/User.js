import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Dimmer, 
  Loader, 
  Card,
  Button, 
  Icon, 
  Image, 
  Table, 
  Grid } from 'semantic-ui-react';
import Moment from 'react-moment';

const User = () => {
  const btRef = useRef();
  const { username } = useParams();
  const history = useHistory(); 
  const [user, setUser] = useState({});
  
  const getUser = async () => {
    const path = username ? `/api/users/${username}/details` : '/api/user';
    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) throw history.push('/');
    
    const pathRepos = username ? `/api/users/${username}/repos` : '/api/user/repos';
    const repos = await fetch(pathRepos);
    const bodyRepos = await repos.json();

    body.repos = bodyRepos;

    setUser(body);
  }

  useEffect(() => { return getUser() }, []); 
  
  if(Object.keys(user).length !== 0 && user.constructor === Object){
    return (
      <Grid style={{marginTop: '50px'}}>
        <Grid.Column floated='left' width={5}>
          <Card>
            <Image src={user.avatar_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{user.name} || {user.login}</Card.Header>
              <Card.Meta>
                <span className='date'>
                  Joined in <Moment format="MM/DD/YYYY">{user.created_at}</Moment>
                </span>
              </Card.Meta>
              <Card.Description>{user.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>
                <Icon name='numbered list' />
                {user.id}
              </p>
              { user.location && <p>
                <Icon name='map outline' />
                {user.location}
              </p> }
              { user.company && <p>
                <Icon name='building outline' />
                {user.company}
              </p> }
              { user.html_url && <p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  <Icon name='github' />
                  {user.html_url}
                </a>
              </p> }
              { user.blog && <p>
                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                  <Icon name='blogger' />
                  {user.blog}
                </a>
              </p> }
              { user.twitter_username && <p>
                <Icon name='twitter' />
                {user.twitter_username}
              </p> }
            </Card.Content>
          </Card>
          <Button ref={btRef} onClick={() => history.goBack()}>Back</Button>
        </Grid.Column>
        <Grid.Column floated='right' width={11}>
          <Table basic='very' style={{width:'100%'}} celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>REPO</Table.HeaderCell>
                <Table.HeaderCell>URL</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { user.repos.map((value, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{value.id}</Table.Cell>
                  <Table.Cell>{value.name}</Table.Cell>
                  <Table.Cell><a href={value.html_url} target="_blank" rel="noopener noreferrer">{value.html_url}</a></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    )
  } else {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    )
  }
}

export default User;
