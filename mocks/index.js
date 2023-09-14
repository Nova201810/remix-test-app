import formStateMock from "./formState.js";

const mocks = [formStateMock];

export default function setupMocker(app) {
  mocks.forEach(mock => mock.setup(app));
}