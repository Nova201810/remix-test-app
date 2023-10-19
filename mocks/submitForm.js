import bodyParser from "body-parser";

import { delay } from "./helpers.js";

const apiUrl = '/api/submit';
const applicationNumber = '1234567890';

const parseJSONMiddleware = bodyParser.json();
const urlencodedMiddleware = bodyParser.urlencoded({extended: true});
const baseRequestArgs = [apiUrl, parseJSONMiddleware, urlencodedMiddleware];

const submitFormMock = {
  setup(app) {
    app.post(...baseRequestArgs, async ({ body }, response) => {
      console.log({body})
      await delay();
      response.json({ applicationNumber });
    });
  }
};

export default submitFormMock;
