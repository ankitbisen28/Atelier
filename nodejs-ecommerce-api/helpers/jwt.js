const jwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/projects(.*)/, methods: ['GET', 'OPTIONS', 'POST', 'DELETE', 'PUT'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS', 'POST', 'DELETE', 'PUT'] },
            { url: /\/api\/v1\/users\/[0-9a-fA-F]{24}/, methods: ['GET', 'DELETE', 'POST', 'DELETE', 'PUT'] },
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/orders`,
            `${api}/users`,
            `${api}/categories`,
            `${api}/projects`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
       return done(null, true)
    }

    done();
}

module.exports = authJwt;