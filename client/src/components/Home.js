import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const login = async () => {
  await fetch('/api/auth');
}

const Home = () => { 
  return (
    <div style={{paddingTop: '50px', textAlign: 'center'}} onClick={() => login()}>
      <Button icon primary  size='massive' labelPosition='left'>
        <Icon name='github alternate' />Log with GitHub
      </Button>
    </div>
  )
}

export default Home;
