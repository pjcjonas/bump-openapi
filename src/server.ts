import express from "express";

export const app = express();

app.use(express.json())

// Get a list of items
app.get("/items", (req, res) => {
    res.status(200).send([
        { id: "1", name: "User Name: 1", description: "This is a description for: 1" }
    ]);
});

// Post a new item and return the added item
app.post("/items", (req, res) => {
    res.status(201).send({ id: "1", name: req.body?.name, description: req.body?.description });
});

// Get a single Item back using a itemId
app.get("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found"); // Testing: pass false instead of a actual id to get a 404 response
    } else {
        res.status(200).send({ id: req.params.itemId, name: 'Philip', description: 'This is a description' });
    }
});

// Put a update to an existing item and return the updated item back
app.put("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found"); // Testing: pass false instead of a actual id to get a 404 response
    } else {
        res.status(200).send({ id: req.params.itemId, name: req.body?.name, description: req.body?.description });
    }
});

// Delete a single item and return a empty 204 response
app.delete("/items/:itemId", (req, res) => {
    if (req.params.itemId === "false") {
        res.status(404).send("Not found"); // Testing: pass false instead of a actual id to get a 404 response
    } else {
        res.sendStatus(204);
    }
});

