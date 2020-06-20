import React from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react';

const clientId = '940b2aaa385ae699df91';

const Home = () => { 
  const history = useHistory();
  const parsed = queryString.parse(window.location.search);

  const callback = (code) => {
    fetch(`/api/callback/${code}`);
    history.push('/users');
  }

  if(parsed.code){
    callback(parsed.code);

    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    )
  } else {  
    return (
      <div style={{paddingTop: '50px', textAlign: 'center'}}>
        <Button icon primary as="a" href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`} size='massive' labelPosition='left'>
          <Icon name='github alternate' />Log with GitHub
        </Button>
      </div>
    )
  }
}

export default Home;
