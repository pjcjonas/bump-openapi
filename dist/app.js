"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var port = 3000;
server_1.app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
