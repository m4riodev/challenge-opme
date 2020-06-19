import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dimmer, Loader, Card, Icon, Image } from 'semantic-ui-react';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  
  const getUser = async () => {
    await fetch('/api/auth');
    
    const response = await fetch(`/api/users/${username}/details`);
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    
    setUser(body);
  }

  useEffect(() => { getUser() }); 
  
  console.log(user);
  // if(Object.keys(user).length === 0 && user.constructor === Object){
    return (
      <Card centered style={{marginTop: '50px'}}>
        <Image src={user.avatar_url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{user.name} || {user.login}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>{user.bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            <Icon name='numbered list' />
            {user.id}
          </p>
          <p>
            <Icon name='map outline' />
            {user.location}
          </p>
          <p>
            <Icon name='building outline' />
            {user.company}
          </p>
          <p>
            <a href={user.blog} target="_blank">
              <Icon name='github' />
              {user.html_url}
            </a>
          </p>
          <p>
            <a href={user.blog} target="_blank">
              <Icon name='blogger' />
              {user.blog}
            </a>
          </p>
          <p>
            <Icon name='twitter' />
            {user.twitter_username}
          </p>
        </Card.Content>
      </Card>
    )
  // } else {
  //   return (
  //     <Dimmer active inverted>
  //       <Loader inverted />
  //     </Dimmer>
  //   )
  // }
}

export default User;
