var couchdbConfig, express, fermata, couchdb, personaConfig, persona, couchurl, server, defaultResolve;

// Initialization
couchdbConfig =  {
    url: 'https://ganassi.iriscouch.com', // Iris Couch Hosting.
    lessons: 'lessons'
};

// Load Libraries.
//process = require('./server_process');
express = require('express');
fermata = require('fermata');

//Initialise server and fermata links
couchdb = fermata.json(couchdbConfig.url);

personaConfig = {
    url: 'https://verifier.login.persona.org/verify'
};

persona = fermata.json(personaConfig.url);

server = express();
server.use(express.bodyParser());
//server.use(express.logger());


// internal functions
defaultResolve = function (res) {
    return function (inErr, inResult) {
        if (inErr) {
            console.log('defaultResolve, error:', inErr);
            res.send(inErr);
        } else {
            console.log('defaultResolve, result:', inResult);
            res.send(inResult);
        }
    }
};

// Used by /db/ functions
couchurl = function (req, res) {
    console.log(req.params);
    //var pos = req.params[0].indexOf('/');
    //pos = (pos === -1) ? req.params[0].length : pos;
    //console.log('couchUrl,', req.params[0].slice(0, pos), req.params[0].substr(pos + 1), req.query);
    couchdb(req.params)(req.query).get(defaultResolve(res));
};

/**** ROUTING ****/

// Couchdb, for _utils
server.get('/_*', function (req, res) {
    couchdb['_' + req.params].get(defaultResolve(res));
});

// CouchDB db and items
server.get('/db/*', couchurl);
server.get('/db%2F*', couchurl); // %2F is / urlencoded. To express.js / and %2F are different.

// CouchDB alter/insert documents
server.put('/db/*', function (req, res) {
    couchdb(req.params[0])(req.query).put(req.body, defaultResolve(res));
});

server.put('/db%2F*', function (req, res) {
    var parms = req.params[0].split('/');

    couchdb[parms[0]][parms[1]].put(req.body, defaultResolve(res));
});


// BrowserID / Persona
server.post('/verify', function (req, res) {
    persona.post({assertion: req.body.assertion, audience: req.body.audience}, function (inErr, inResult) {
        if (inErr || inResult.status !== 'okay') {
            console.log(inErr, inResult);
            res.send({status: 'failed'});
        } else {
            res.send(inResult);
        }
    });
});

// frontend serves everything in /home/pietere/Development/Dashboard/Frontend
server.use('/lessen', express.static('/home/pieter/Development/Ganassi'));

// Admin frontend
//server.use('/admin', express.static('/home/pieter/Development/Edcontrols/edbackend/web/app'));

server.listen(3333);
