import React from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Segment, Button, Icon, Dimmer, Loader } from 'semantic-ui-react';

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
      <div style={{ margin: '0 auto', paddingTop: '10px', maxWidth: '500px', textAlign: 'center' }}>
        <Segment color="blue" style={{ marginBottom: '30px', textAlign: 'left' }}>
          <p>The master in the art of living makes little distinction between his work and his play, his labor and his leisure, his mind and his body, his education and his recreation, his love and his religion. He hardly knows which is which. He simply pursues his vision of excellence at whatever he does, leaving others to decide whether he is working or playing. To him he is always doing both.</p>
          <small style={{ display: 'block', textAlign: 'right' }}>-James Michener</small>
        </Segment>
        <Button icon primary as="a" href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`} size='massive' labelPosition='left'>
          <Icon name='github alternate' />Log with GitHub
        </Button>
      </div>
    )
  }
}

export default Home;
