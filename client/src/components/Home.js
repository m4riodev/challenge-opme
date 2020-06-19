import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const clientId = '940b2aaa385ae699df91';

const Home = () => { 
  return (
    <div style={{paddingTop: '50px', textAlign: 'center'}}>
      <Button icon primary as="a" href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`} size='massive' labelPosition='left'>
        <Icon name='github alternate' />Log with GitHub
      </Button>
    </div>
  )
}

export default Home;
