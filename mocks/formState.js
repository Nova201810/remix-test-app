const initialState = {};
let state = initialState;

const apiUrl = '/api/state';

const formStateMock = {
  setup(app) {
    app.get(apiUrl, async (_, response) => {
      response.json(state);
    });

    app.put(apiUrl, async ({ body }, response) => {
      state = { ...state, ...body };
      response.json(state);
    });

    app.delete(apiUrl, async (_, response) => {
      state = initialState;
      response.json(state);
    })
  }
};

export default formStateMock;
