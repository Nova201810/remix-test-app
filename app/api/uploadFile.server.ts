import { ActionArgs, fetch } from "@remix-run/node";

import { FileInfo, FormFields } from "~/@types/form";

const isEnvProduction = process.env.NODE_ENV === 'production';
const originPath = isEnvProduction ? 'https://CHANGE_ME_PROD_PATH' : 'http://localhost:3000';
const uploadPath = `${originPath}/api/upload-file`;

export async function uploadFile(files: File[], field: string) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(field, file, file.name);
  });
  const response = await fetch(uploadPath, {
    method: 'POST',
    body: formData,
  });
  const { data } = await response.json();
  return data as FileInfo<'saved'>[];
}

type Props = {
  files: FormDataEntryValue[];
  request: ActionArgs['request'];
};
export async function updateFilesState({ files, request }: Props) {
  let filesState: FileInfo<'saved'>[] = [];
  if (files?.length) {
    const checkIsFile = (file: unknown) => file instanceof File && file.name;
    const [savedFiles, filesToUpload] = files.reduce((result, file) => {
      if (typeof file === 'string') {
        const parsedFile: FileInfo<'saved'> = JSON.parse(file);
        result[0].push(parsedFile);
      } else if (checkIsFile(file)) {
        // Костыль (самостоятельно кодируем файл в UTF-8, чтобы потом правильно считать)
        // Проброс charset=utf-8 ломает мок, а именно express-fileupload, надо разбираться
        const encodedFile = new File([file], encodeURIComponent(file.name), {
          type: file.type,
          lastModified: file.lastModified,
        });
        result[1].push(encodedFile);
      }
      return result;
    },[[] as FileInfo<'saved'>[], [] as File[]]);

    if (filesToUpload.length) {
      const uploadedFiles = await uploadFile(filesToUpload, FormFields.DOCUMENT);
      // Костыль (самостоятельно декодируем файл из UTF-8, см. проблему выше)
      const decodedFiles = uploadedFiles.map(file => ({ ...file, name: decodeURIComponent(file.name) }));
      filesState = [...savedFiles, ...decodedFiles];
    } else {
      filesState = savedFiles;
    }
    const isUpdateOnlyRequest = request.method === 'PUT';
    if (!isUpdateOnlyRequest) {
      const { searchParams } = new URL(request.url);
      const ignoreFilesToDelete = ({ id }: FileInfo<'saved'>) => {
        return !searchParams.get(id);
      }
      filesState = filesState.filter(ignoreFilesToDelete);
    }
  }
  
  return filesState;
}