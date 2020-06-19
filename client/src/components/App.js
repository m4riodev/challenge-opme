import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { 
  Container, 
  Segment, 
  Header, 
  Icon 
} from 'semantic-ui-react';
import Home from './Home';
import Users from './Users';
import User from './User';

const App = () => {
  return (
    <Router>
      <Container style={{padding: '10px 0'}}>
        <Segment style={{minHeight: 'calc(100vh - 20px)'}}>
          <Header as="h1" textAlign="center" icon>
            <Icon name="code" />
            Challenge - GitHub API
          </Header>
          <Switch>
            <Route path="/user/:username?" children={<User />} />
            <Route path="/users/:page?" children={<Users />} />
            <Route path="/" children={<Home />} />
          </Switch>
        </Segment>
      </Container>
    </Router>
  );
}

export default App;