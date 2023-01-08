import jestOpenApi from "jest-openapi";
import { ItemSchema, NewItemSchema } from "openapi-client-ts";
import path from 'path'
import request from "supertest"
import { app } from "./mock-server/server";

jestOpenApi(path.join(__dirname, "../openapi.yaml"));

const payload: NewItemSchema = { name: 'Philip', description: 'This is a description' };
const itemCreateResponse: ItemSchema = { id: "1", name: 'Philip', description: 'This is a description' };
const ItemGetPutDeleteResponse: ItemSchema = { id: "222", name: 'Philip', description: 'This is a description' };

describe("Describe it all", () => {
  it("200 - GET - Get a list of items", async () => {
    const res = await request(app).get('/items');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res).toSatisfyApiSpec();
  })

  it("201 - POST - Post and return the added object", async () => {
    const res = await request(app)
      .post('/items')
      .send(payload);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      id: itemCreateResponse.id,
      name: itemCreateResponse.name,
      description: itemCreateResponse.description
    });
    expect(res).toSatisfyApiSpec();
  })

  it('200 - GET - Get a single item back', async () => {
    const res = await request(app).get('/items/222');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("name")
    expect(res.body).toHaveProperty("description")
    expect(res.body.description).toEqual(ItemGetPutDeleteResponse.description)
    expect(res.body.name).toEqual(ItemGetPutDeleteResponse.name)
    expect(res.body.id).toEqual(ItemGetPutDeleteResponse.id)
    expect(res).toSatisfyApiSpec();
  })

  it('404 - GET - Get a single item back', async () => {
    const res = await request(app).get('/items/false');
    expect(res.status).toEqual(404);
  })

  it('200 - PUT - Update a single item', async () => {
    const res = await request(app).put('/items/222').send(payload);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("name")
    expect(res.body).toHaveProperty("description")
    expect(res.body.description).toEqual(ItemGetPutDeleteResponse.description)
    expect(res.body.name).toEqual(ItemGetPutDeleteResponse.name)
    expect(res.body.id).toEqual(ItemGetPutDeleteResponse.id)
    expect(res).toSatisfyApiSpec();
  })

  it('404 - PUT - Update a single item', async () => {
    const res = await request(app).put('/items/false').send(payload);
    expect(res.status).toEqual(404);
  })

  it('204 - DELETE - Delete a single item', async () => {
    const res = await request(app).delete('/items/222');
    expect(res.status).toEqual(204);
  })

  it('404 - DELETE - Delete a single item', async () => {
    const res = await request(app).delete('/items/false');
    expect(res.status).toEqual(404);
  })
})
