const bcrypt = require('bcrypt')
const session = require('express-session');


let users = {
    u1: {
        name: 'fer',
        hash: ''
    },
    u2: {
        name: 'nando',
        hash: ''
    }
};

const bcryptHash = async (options) => {
    const newhash = await bcrypt.hash(options.pass, 10)
    users.u1.hash = newhash
    users.u2.hash = newhash
}

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
}

const authenticate = (username, pass, fn) => {
    let user = Object.values(users).find(i => i.name === username);
    if (!user) return fn(null, null)
    comparePassword(pass, user.hash, (err, result) => {
        if (err) return fn(err);
        if (!result) {
            fn(null, null)
        } else { 
            return fn(null, user)
        }
    });
}

const restrict = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

const getSessions = () => {
    
}   

exports.bcryptHash = bcryptHash
exports.comparePassword = comparePassword
exports.authenticate = authenticate
exports.restrict = restrict
exports.getSessions = getSessions