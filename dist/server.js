"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get("/items", function (req, res) {
    res.status(200).send([
        { id: "1", name: "User Name: 1", description: "This is a description for: 1" }
    ]);
});
exports.app.post("/items", function (req, res) {
    var _a, _b;
    res.status(201).send({ id: "1", name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name, description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.description });
});
exports.app.get("/items/:itemId", function (req, res) {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    }
    else {
        res.status(200).send({ id: req.params.itemId, name: 'Philip', description: 'This is a description' });
    }
});
exports.app.put("/items/:itemId", function (req, res) {
    var _a, _b;
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    }
    else {
        res.status(200).send({ id: req.params.itemId, name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name, description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.description });
    }
});
exports.app.delete("/items/:itemId", function (req, res) {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    }
    else {
        res.sendStatus(204);
    }
});
