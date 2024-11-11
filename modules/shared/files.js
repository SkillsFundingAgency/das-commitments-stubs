module.exports = {
    sendFile: function(res, filename) {

        const path = require('path');
        const process = require('process');

        const root = process.cwd();
        
        res.header("Content-Type",'application/json');
        res.sendFile(path.join(root, filename));
    },

    sendResponseFile :function(res, url, method) {

        const path = require('path');
        const process = require('process');
        const fs = require('fs');
        
        const root = process.cwd();
        
        const filename = ("responses" + url.replace(/\/$/, '') + '_' + method + '.json').toLowerCase();

        console.log("Processing request for " + path.join(root, filename));

        if(!fs.existsSync(filename))
        {
            res.status(404).send('No such file: ' + filename);
            return;
        }

        res.header("Content-Type",'application/json');
        res.sendFile(path.join(root, filename));
    },

    getFileAsJson : function(url, method){
        const filename = ("responses" + url.replace(/\/$/, '') + '_' + method + '.json').toLowerCase();

        const fs = require('fs');
        const path = require('path');
        const process = require('process');
        const root = process.cwd();

        const data = fs.readFileSync(path.join(root, filename), 'utf8');
        const json = JSON.parse(data);
        return json;
    }
};

