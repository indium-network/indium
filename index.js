import express from "express";
import http from "node:http";
import path from "node:path";
import fs from 'fs';
import ip from 'ip';
import { join } from "node:path";
import { hostname } from "node:os";
import { createBareServer } from "@tomphttp/bare-server-node";
import request from "@cypress/request";
import basicAuth from 'express-basic-auth';
import config from "./password.js"


 
const __dirname = path.resolve();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

if (config.challenge) {

  app.use(basicAuth({ users: config.users, challenge: true }))
}

app.use(express.static(path.join(__dirname, "static")));

// req.isAuthenticated is provided from the auth router
app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.get('/!', (req, res) => {
  res.sendFile(path.join(__dirname, './static/loader.html'));
});
app.get('/~', (req, res) => {
  res.sendFile(path.join(__dirname, './static/apps.html'));
});
app.get('/0', (req, res) => {
  res.sendFile(path.join(__dirname, './static/gms.html'));
});
app.get('/=', (req, res) => {
  res.sendFile(path.join(__dirname, './static/settings.html'));
});
app.get('/mobile-lock', (req, res) => {
  res.sendFile(path.join(__dirname, './static/mobile.html'));
});
app.get('/d3', (req, res) => {
  res.sendFile(path.join(__dirname, './static/gmsd3.html'));
});
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, './static/privacy.html'));
});

app.get('/@', (req, res) => {
  res.sendFile(path.join(__dirname, './static/agloader.html'));
});
app.get('/credits', (req, res) => {
  res.sendFile(path.join(__dirname, './static/credits.html'));
});
app.get("/worker.js", (req, res) => {
res.sendFile(path.join(__dirname, './static/worker.js'));
});
app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(__dirname, './static/404.html'))
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8000;

server.on("listening", async () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const localVersion = packageJson.version;
    const versionTxt = fs.readFileSync('./static/version.txt', 'utf8').trim();

    if (localVersion !== versionTxt) {
      console.log('\x1b[32m[Indium] Update is available ' + versionTxt + '. Check the GitHub for more info.\x1b[0m');
      startServer();
    } else {
      console.log('\x1b[32m[Indium] Your up to date!\x1b[0m');
      console.log('\x1b[32m_____________________________\x1b[0m');
      startServer();
    }
  } catch (error) {
    console.error('\x1b[31mError checking for updates:', error, '\x1b[0m');
    startServer();
  }
});

function startServer() {
  const address = server.address();
  const ipAddress = ip.address();
  const hostName = hostname();

  console.log("Indium is running on:");
  if (hostName.includes("codespaces")) {
   
    console.log('I see that you are in a codespace. Please follow the instructions below: \n')
    console.log("1. Click Make Public In the bottom right corner");
    console.log('2. Click Ports on the top bar')
    console.log('3. Ctrl click the forwarded address')
    console.log('4. Enjoy!')
  } else {
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostName}:${address.port}`);
    if (address.family === "IPv4") {
      console.log(`\thttp://${ipAddress}:${address.port}`);
    } else {
      console.log(`\thttp://${ipAddress}:${address.port}`);
    }
  }

 
  
  console.log('\x1b[32m_____________________________\x1b[0m');
}


server.listen({
  port,
});
