/**
 * Proxy server that requires authorization/authorization.
 */

var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    connect = require('connect'),
    httpProxy = require('../../lib/http-proxy');

//
// Server that hands requests off to the proxy, if they pass authorization
//
connect.createServer(
  function (req, res, next) {
      console.log(req.headers);

      if (!req.headers['proxy-authorization']) {
        res.writeHead(407, "Auth required", {
            "Proxy-Authenticate": "Basic realm=\"Proxy\""
        });
      
        res.end("Auth required dude!");
      } else {
          // TODO - actually validate the credentials
          console.log("Got proxy auth: " + req.headers['proxy-authorization']);

          next();
      }
  },
  function (req, res) {
      console.log("url: " + req.url);
    proxy.web(req, res, { target: req.url });
  }
).listen(8013);

//
// Standard HTTP proxy
//
var proxy = httpProxy.createProxyServer({ });

//
// Print some output on startup
//
util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8013'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9013 '.yellow);

