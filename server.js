var http = require('http');
var request = require('request');


var slackHookUrl = process.env.SLACK_HOOK_URL;
var brewingPath = process.env.BREWING_PATH;
var readyPath = process.env.READY_PATH;
var slackChannel = process.env.SLACK_CHANNEL;


http.createServer(function(req, res) {
    var url = req.url;
    console.log(url);

    if (url === brewingPath) {
        brewing(res);
    } else if (url === readyPath) {
        ready(res);
    }
}).listen(9999);


function brewing(res) {
    postMessage('Coffee is brewing!', res);
}

function ready(res) {
    postMessage('Coffee is ready!', res);
}

function postMessage(text, res) {
    var payload = {
        channel: slackChannel,
        username: 'drippy',
        text: text,
        icon_emoji: ':coffee:',
    };

    request.post({
        url: baseUrl,
        json: payload,
    }, function(err, response, body) {
        console.log('body: ', body);
        if (body === 'ok') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
        }
        res.end();
    });
}
