# coffea

[![NPM version (>=0.4)](https://img.shields.io/npm/v/coffea.svg?style=flat-square)](https://www.npmjs.com/package/coffea) [![Build Status](https://img.shields.io/travis/caffeinery/coffea/master.svg?style=flat-square)](https://travis-ci.org/caffeinery/coffea) [![Dependencies](https://img.shields.io/david/caffeinery/coffea.svg?style=flat-square)](https://david-dm.org/caffeinery/coffea) [![Documentation Status](https://readthedocs.org/projects/coffea/badge/?style=flat-square&version=latest)](https://readthedocs.org/projects/coffea/?badge=latest) [![Code Climate](https://img.shields.io/codeclimate/github/caffeinery/coffea.svg?style=flat-square)](https://codeclimate.com/github/caffeinery/coffea) [![Coverage](https://img.shields.io/coveralls/caffeinery/coffea.svg?style=flat-square)](https://coveralls.io/r/caffeinery/coffea)

_event based and extensible nodejs irc client library with multi-network support_

For support, report an issue on github, join our IRC channel at [![#caffeinery @ chat.freenode.net](https://img.shields.io/badge/IRC-irc.freenode.net%23caffeinery-00a8ff.svg?style=flat-square)](https://webchat.freenode.net/?channels=%23caffeinery&uio=d4) or if you prefer that, write an email to our mailing list: caffeinery@googlegroups.com

If you want to support coffea development, please consider donating (it helps me keeping the project active and alive!): [![https://gratipay.com/omnidan/](https://img.shields.io/gratipay/omnidan.svg?style=flat-square)](https://gratipay.com/omnidan/)

## API

Documentation is available at [coffea.caffeinery.org](https://coffea.caffeinery.org/en/latest/).


## Installation

To install coffea, run: `npm install --save coffea` in your project directory.


## Examples
### Normal Connection (Single network)
```javascript
var client = require('coffea')('chat.freenode.net');
/* full config
var client = require('coffea')({
    host: 'chat.freenode.net',
    port: 6667, // default value: 6667
    nick: 'test', // default value: 'coffea' with random number
    username: 'test', // default value: username = nick
    realname: 'test', // default value: realname = nick
    pass: 'sup3rS3cur3P4ssw0rd' // by default no password will be sent
    nickserv: {
        username: 'test',
        password: 'l33tp455w0rD'
    },
    throttling: 250 // default value: 250ms, 1 message every 250ms, disable by setting to false
});
*/

client.on('motd', function (err, event) {
    client.join(['#foo', '#bar', '#baz']);
});

client.on('message', function (err, event) {
    console.log('[' + event.channel.getName() + '] ' + event.user.getNick() + ': ' + event.message);
    //[#foo] nick: message
    event.reply(event.message); // I'm a parrot
});
```

### Multiple networks
```javascript
var client = require('coffea')(['chat.freenode.net', 'irc.oftc.net']);
/* full config
var client = require('coffea')([
    {
        host: 'chat.freenode.net',
        name: 'freenode', // this is not required but recommended when dealing with multiple networks, by default a numeric id will be assigned
        port: 6667, // default value: 6667
        nick: 'test', // default value: 'coffea' with random number
        username: 'test', // default value: username = nick
        realname: 'test', // default value: realname = nick
        pass: 'sup3rS3cur3P4ssw0rd' // by default no password will be sent
        nickserv: {
            username: 'test',
            password: 'l33tp455w0rD'
        },
        throttling: 250 // default value: 250ms, 1 message every 250ms, disable by setting to false
    },
    {
        host: 'irc.oftc.net',
        name: 'oftc', // this is not required but recommended when dealing with multiple networks, by default a numeric id will be assigned
        port: 6667, // default value: 6667
        nick: 'test', // default value: 'coffea' with random number
        username: 'test', // default value: username = nick
        realname: 'test', // default value: realname = nick
        pass: 'sup3rS3cur3P4ssw0rd' // by default no password will be sent
        nickserv: {
            username: 'test',
            password: 'l33tp455w0rD'
        },
        throttling: 250 // default value: 250ms, 1 message every 250ms, disable by setting to false
    }
]);
*/

// note how we are passing the network here, by default it'll just send to all networks
// by using network you can join specific channels on specific networks
client.on('motd', function (err, event) {
    client.join(['#foo', '#bar', '#baz'], event.network);
});

client.on('message', function (err, event) {
    console.log('[' + event.network + '][' + event.channel.getName() + '] ' + event.user.getNick() + ': ' + event.message);
    //[freenode][#foo] nick: message
    event.reply(event.message); // I'm a parrot
});
```

### Using SSL
```javascript
var client = require('coffea')({
    host: 'chat.freenode.net',
    ssl: true,
    // ssl_allow_invalid: true, // allow invalid/self-signed/expired SSL certs - default value: false
    // port: 6697, // will default to 6697 on ssl
    // nick: 'test', // default value: 'coffea' with random number
    // username: 'test', // default value: username = nick
    // realname: 'test', // default value: realname = nick
    // pass: 'sup3rS3cur3P4ssw0rd' // by default no password will be sent
    // nickserv: {
    //     username: 'test',
    //     password: 'l33tp455w0rD'
    // },
    // throttling: 250 // default value: 250ms, 1 message every 250ms, disable by setting to false
});

client.on('motd', function (err, event) {
    client.join(['#foo', '#bar', '#baz']);
});

client.on('message', function (err, event) {
    console.log('[' + event.channel.getName() + '] ' + event.user.getNick() + ': ' + event.message);
    //[#foo] nick: message
    event.reply(event.message); // I'm a parrot
});
```
