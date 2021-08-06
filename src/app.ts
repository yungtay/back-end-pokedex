import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as middleware from './middlewares/middewares'

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.errors)

app.post("/users", userController.signUpUsers);
app.get("/users/", userController.getUsers);
app.get("/users/:email", userController.getUser);

export async function init () {
  await connectDatabase();
}

export default app;
