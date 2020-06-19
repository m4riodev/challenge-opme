const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 3030;
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const appUrl = process.env.APP_URL;

let token = false;

app.use(cors());

app.get('/api/callback/:code', (req, res) => {
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.params.code
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
        then(res => res.data['access_token']).
        then(_token => {
            token = _token;
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