import formStateMock from "./formState.js";
import fileUploadMock from "./fileUpload.js";
import submitFormMock from "./submitForm.js";

const mocks = [formStateMock, fileUploadMock, submitFormMock];

export default function setupMocker(app) {
  mocks.forEach(mock => mock.setup(app));
}