const application = require("../app");
const request = require("supertest");
const { TestWatcher } = require("jest");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { db_insertTestData } = require("../database"); 

let user = {
  id: 1,
  email: "employer01@example.com",
  first_name: "Test",
  last_name: "Employer01",
  role: "Employer",
};
let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
let userToken = "Bearer " + accessToken;

describe("GET /jobs", () => {
  test("valid request", async () => {
    const res = await request(application)
      .get("/jobs")
      .set("Authorization", userToken);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.any(Array));
  });

  test("unauthenticated request", async () => {
    const res = await request(application).get("/jobs");

    expect(res.status).toBe(403);
  });
});

describe("GET /jobs/getAll", () => {
  test("valid request", async () => {
    const res = await request(application)
      .get("/jobs/getAll")
      .set("Authorization", userToken);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.any(Array));
  });

  test("unauthenticated request", async () => {
    const res = await request(application).get("/jobs/getAll");

    expect(res.status).toBe(403);
  });
});

describe("POST /jobs", () => {
  let requestBody;

  beforeEach(() => {
    requestBody = {
        title: 'Job created during automated testing',
        description: 'Job created during automated testing'
    };
  });

  test("valid data", async () => {
    const res = await request(application)
      .post("/jobs")
      .send(requestBody)
      .set("Authorization", userToken);

    expect(res.status).toBe(201);
  });

  test("body without title", async () => {
    delete requestBody.title;
    const res = await request(application)
      .post("/jobs")
      .send(requestBody)
      .set("Authorization", userToken);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "Title and Description are mandatory fields."
    );
  });

  test("body without description", async () => {
    delete requestBody.description;
    const res = await request(application)
      .post("/jobs")
      .send(requestBody)
      .set("Authorization", userToken);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "Title and Description are mandatory fields."
    );
  });

  test("unauthenticated request", async () => {
    
    const res = await request(application).post("/jobs").send(requestBody);

    expect(res.status).toBe(403);
  });
});

describe("PUT /jobs", () => {
  let requestBody;

  beforeEach(() => {
    requestBody = {
        title: 'Job created during automated testing',
        description: 'Job created during automated testing'
    };
  });

  test("valid request", async () => {
    const res = await request(application)
      .put("/jobs/1")
      .send(requestBody)
      .set("Authorization", userToken);

    expect(res.status).toBe(200);
  });

  test("empty request body", async () => {
    delete requestBody.title;
    delete requestBody.description;

    const res = await request(application)
      .put("/jobs/1")
      .send(requestBody)
      .set("Authorization", userToken);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Title and Description are mandatory fields.");
  });

  test("unauthenticated request", async () => {
    const res = await request(application)
      .put("/jobs/1")
      .send(requestBody);

    expect(res.status).toBe(403);
  });
});
