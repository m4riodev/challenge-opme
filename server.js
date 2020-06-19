const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3030;
const clientId = '940b2aaa385ae699df91';
const clientSecret = 'd4c9aaec3452fc25bb15429c79ccd63d0a0b24dc';

let token = false;

app.use(cors());

app.get('/callback', (req, res) => {
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
        then(res => res.data['access_token']).
        then(_token => {
            token = _token;
            res.redirect('http://localhost:3000/users');
        }).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/users/:since', (req, res) => {
    const opts = { headers: { accept: 'application/json', authorization: `token ${token}` } };
    axios.get(`https://api.github.com/users?since=${req.params.since}`, opts).
        then(res => res.data).
        then(users => res.json(users)).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/users/:username/details', (req, res) => {
    const opts = { headers: { accept: 'application/json', authorization: `token ${token}` } };
    axios.get(`https://api.github.com/users/${req.params.username}`, opts).
        then(res => res.data).
        then(user => res.json(user)).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/user', (req, res) => {
    const opts = { headers: { accept: 'application/json', authorization: `token ${token}` } };
    axios.get(`https://api.github.com/user`, opts).
        then(res => res.data).
        then(user => res.json(user)).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/users/:username/repos', (req, res) => {
    const opts = { headers: { accept: 'application/json', authorization: `token ${token}` } };
    axios.get(`https://api.github.com/users/${req.params.username}/repos`, opts).
        then(res => res.data).
        then(repos => res.json(repos)).
        catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/user/repos', (req, res) => {
    const opts = { headers: { accept: 'application/json', authorization: `token ${token}` } };
    axios.get(`https://api.github.com/user/repos`, opts).
        then(res => res.data).
        then(repos => res.json(repos)).
        catch(err => res.status(500).json({ message: err.message }));
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
        
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});