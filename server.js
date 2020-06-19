const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3030;
const clientId = '940b2aaa385ae699df91';
const clientSecret = 'd4c9aaec3452fc25bb15429c79ccd63d0a0b24dc';

let token = false;

app.use(cors());

app.get('/api/auth', (req, res) => {
    if(!token) 
        res.redirect(308, `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`);
    else
        res.json({ ok: 1 });
});

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
            res.json({ ok: 1 });
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

if(process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
        
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});