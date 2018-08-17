'use strict';

const os = require('os');
const express = require('express');
const morgan = require('morgan');
const redis_client = require("redis").createClient(6379, 'redis');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(morgan('combined'))

app.get('/', (req, res) => {
  let total_requests = 0;

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  redis_client.incr("requests", (err, reply) => {
    total_requests = reply; // stash response in outer scope
  });
  redis_client.hincrby("ip", req.connection.remoteAddress, 1);
  redis_client.hgetall("ip", function (err, reply) {
    // This is the last reply, so all of the previous replies must have completed already
    res.write("This page was generated after talking to redis!!!!.\n\n" +
                   "Application Build: 1" + "\n\n" + 
                   "Server from: " + os.hostname() + "\n\n" +
                   "Total requests: " + total_requests + "\n\n" +
                   "IP count: \n");
    Object.keys(reply).forEach((ip) => {
      res.write("    " + ip + ": " + reply[ip] + "\n");
    });
    res.end();
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
