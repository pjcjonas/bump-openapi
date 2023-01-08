import express from "express";

export const app = express();

app.use(express.json())

app.get("/items", (req, res) => {
    res.status(200).send([
        { id: "1", name: "User Name: 1", description: "This is a description for: 1" }
    ]);
});

app.post("/items", (req, res) => {
    res.status(201).send({ id: "1", name: req.body?.name, description: req.body?.description });
});

app.get("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    } else {
        res.status(200).send({ id: req.params.itemId, name: 'Philip', description: 'This is a description' });
    }
});

app.put("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    } else {
        res.status(200).send({ id: req.params.itemId, name: req.body?.name, description: req.body?.description });
    }
});

app.delete("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found");
    } else {
        res.sendStatus(204);
    }
});

