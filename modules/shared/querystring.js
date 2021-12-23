const express = require("express");

express.request.getFromQueryString = function(parameterName) {
    for (let key in this.query)
    {
        if(key.toLowerCase() === parameterName.toLowerCase())
        {
            return this.query[key];
        }
    }
};
    
