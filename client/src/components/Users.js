import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { 
  Segment, 
  Dimmer, 
  Loader, 
  Item, 
  Icon, 
  Button 
} from 'semantic-ui-react';

const Users = () => {
  const history = useHistory(); 
  const params = useParams();
  const page = params.page ? params.page : 1;
  const [users, setUsers] = useState([]);
  
  const getUsers = async () => {
    const since = ((page ? page : 1) - 1) * 30;
    const response = await fetch(`/api/users/${since}`);
    const body = await response.json();
    
    if (response.status !== 200) throw history.push('/');
    
    setUsers(body);
  }

  useEffect(() => { getUsers() }, [page]); 
  
  if(users.length > 0){
    return (
      <>
        <Segment style={{marginTop: '50px'}}>
          <Item.Group divided as="ul" style={{padding: 0}}>
            { users.map((value, index) => (
              <Item key={index} as="li">
                <Item.Image size="tiny" src={value.avatar_url} />
                <Item.Content verticalAlign="middle">
                  <Item.Header>
                    <Icon name="github alternate" />
                    {value.login}
                  </Item.Header>
                  <Item.Extra>
                    <Icon name="numbered list" />
                    {value.id}
                  </Item.Extra>
                  <Button as={Link} to={`/user/${value.login}`} basic color='blue' floated='right'>
                    More info
                    <Icon name='right chevron' />
                  </Button>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
        { page > 1 && <Button as={Link} to={`/users/${(parseInt(page) - 1)}`} onClick={() => window.scrollTo(0, 0)} secondary icon labelPosition='left'><Icon name='left arrow' />Previous</Button> }
        <Button as={Link} to={`/users/${(parseInt(page) + 1)}`} onClick={() => window.scrollTo(0, 0)} primary icon labelPosition='right'>Next<Icon name='right arrow' /></Button>
      </>
    )
  } else {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    )
  }
}

export default Users;
