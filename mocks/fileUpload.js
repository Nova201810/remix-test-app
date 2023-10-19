import fileUpload from "express-fileupload";

import { delay } from "./helpers.js";

const apiUrl = '/api/upload-file';
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const fileUploadMiddleware = fileUpload({
  parseNested: true,
  limits: { 
    fileSize: 10 * 1024 * 1024 * 1024 // 10MB max file(s) size
  },
});
const baseRequestArgs = [apiUrl, fileUploadMiddleware];

const savedFiles = {};

const fileUploadMock = {
  setup(app) {
    app.post(...baseRequestArgs, async (request, response) => {
      await delay();
      if (!request.files) {
        response.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        let filesInfo = [];
        const files = request.files.document;
        console.log({files})
        const filesArray = Array.isArray(files) ? files : [files];
        filesArray.forEach(file => {
          const fileId = uid();
          const fileKey = fileId;
          savedFiles[fileKey] = file;
          filesInfo.push({
            name: file.name,
            id: fileId,
          });
        });
        response.send({
          status: true,
          message: 'Files are uploaded',
          data: filesInfo,
        });
      }
    });
  }
};

export default fileUploadMock;
