const express = require('express');
const path = require("path");
const fs = require("fs");
const ip = require("ip");
const chokidar = require('chokidar');
const app = express();
const port = 3000;

const cc = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    mag: "\x1b[35m",
    cy: "\x1b[36m",
    _green: "\x1b[42m",
    _yellow: "\x1b[43m",
    _red: "\x1b[41m"
};

const bindJsonEndpoint = (filePath) => {
    const fileName = path.basename(filePath, '.json');
    const urlPathName = fileName.replace(" ", "_");
    app.get('/' + urlPathName, function (req, res) {
        console.log(`${cc.green}~~~${cc.reset} new request for ${cc.yellow}${fileName}.json${cc.reset}`);
        const mock = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const delay = mock.delay || 0;
        setTimeout(() => {
            res.json(mock.response)
        }, delay);
    });

    chokidar.watch(filePath).on('change', () => {
        console.log(`${cc.yellow}+++${cc.reset} updated ${cc.yellow}${fileName}.json${cc.reset}`);
    });

    const mockPath = "http://" + ip.address() + ":" + port + "/" + urlPathName;
    console.log(`>>> Serving file ${cc.yellow}${fileName}.json${cc.reset}\tin path: ${cc.green}${mockPath}${cc.reset}`);
};

chokidar.watch(__dirname + '/endpoints/*.json').on('add', path => {
    bindJsonEndpoint(path)
});

chokidar.watch(__dirname + '/endpoints/*.json').on('unlink', filePath => {
    const fileName = path.basename(filePath, '.json');
    console.log(`${cc.red}xxx${cc.reset} mock for ${cc.yellow}${fileName}.json${cc.reset} no longer available`);
});

app.listen(port, () => {
    console.log(`Micro Mock running on port: ${port}!`);
    console.log(" --- ");
});
