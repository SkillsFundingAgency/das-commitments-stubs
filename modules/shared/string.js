module.exports = {
    format: function (b) {
        let a = arguments;
        return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
            if (b.substring(0, 2) == "{{") return b;
            let c = parseInt(b.match(/\d/)[0]);
            return a[c + 1]
        })
    }
};