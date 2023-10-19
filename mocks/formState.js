import bodyParser from "body-parser";

import { delay } from "./helpers.js";

const initialState = {};
let state = initialState;

const apiUrl = '/api/state';

const parseJSONMiddleware = bodyParser.json();
const urlencodedMiddleware = bodyParser.urlencoded({extended: true});
const baseRequestArgs = [apiUrl, parseJSONMiddleware, urlencodedMiddleware];

const formStateMock = {
  setup(app) {
    app.get(...baseRequestArgs, async (_, response) => {
      await delay();
      response.json(state);
    });

    app.put(...baseRequestArgs, async ({ body }, response) => {
      state = { ...state, ...body };
      await delay();
      response.json(state);
    });

    app.delete(...baseRequestArgs, async (_, response) => {
      state = initialState;
      await delay();
      response.json(state);
    })
  }
};

export default formStateMock;
