import { v4 as uuidV4 } from 'uuid';
import AWS from 'aws-sdk';
/*
const AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV = 'radiobaksho-web-dev';
const AWS_S3_REGION = 'ap-south-1';
const AWS_ACCESS_KEY_ID = 'AKIAWWYAX5V45MMRWHUW';
const AWS_SECRET_ACCESS_KEY = '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';
*/

const AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV = 'easywintest';
const AWS_S3_REGION = 'ap-south-1';
const AWS_ACCESS_KEY_ID = 'AKIAQTOVPDKVYCA6K3ER';
const AWS_SECRET_ACCESS_KEY = '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';

AWS.config.update({
  region: AWS_S3_REGION
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

export const createFolder = (folderName: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    folderName = folderName.trim();
    if (!folderName) {
      return reject('Folder names must contain at least one non-space character.');
    }
    let reg = new RegExp('[A-Za-z0-9_].*');
    if (!reg.test(folderName)) {
      return reject('Folder names cannot contain special character.');
    }
    let folderKey = encodeURIComponent(folderName);

    return s3.headObject(
      { Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV, Key: folderKey + '/' },
      function (err, data) {
        if (!err) {
          return reject('Folder already exists.');
        }

        if (err.code !== 'NotFound') {
          return reject('There was an error creating your folder: ' + err.message);
        }

        return s3.putObject(
          { Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV, Key: folderKey + '/', ACL: 'public-read' },
          function (err, data) {
            if (err) {
              return reject('There was an error creating your folder: ' + err.message);
            }
            return resolve('Successfully created folder.');
          }
        );
      }
    );
  });
};

export const checkBucketCors = (): void => {
  let bucketParams = { Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV };
  s3.getBucketCors(bucketParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else if (data) {
      console.log('Success', JSON.stringify(data.CORSRules));
    }
  });
};

export const listFolders = (): Promise<any> => {
  return s3.listObjects({ Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV, Delimiter: '/' }).promise();
};

interface TUploadFileToS3 {
  file: File;
  folder?: string | null;
  fileName?: string | null;
  uuidPrefix?: string | null;
}

/**
 *
 * @param file
 * @param folder
 * @param fileName
 * @param uuidPrefix
 */
export const uploadFileToS3 = ({item, file, folder, fileName, uuidPrefix}: TUploadFileToS3): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {

    let fileExtension = item.node.image.uri.split('.').pop();


    console.log(item)
    let generatedFileName: string = '';
    //let fileExtension = file.name.split('.').pop();

    if (!fileName) {
      generatedFileName = uuidV4() + '.' + fileExtension;
    } else {
      fileName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      generatedFileName = (fileName || '').split(' ').join('_') + '.' + fileExtension;
    }
    if (!generatedFileName.length) {
      reject(new Error('Please specify file name'));
    }
    folder = encodeURIComponent(folder || 'testing') + '/';
    let fileKey = folder + generatedFileName;

    s3.putObject(
      {
        Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV,
        Key: fileKey,
        Body: item.node,
        ContentType: item.node.type,
        ACL: 'public-read'
      },
      (err, data) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        return resolve({
          success: true,
          message: 'File successfully uploaded',
          fileName: generatedFileName,
          fullPath: fileKey,
          fullUrl: getFullS3Url(fileKey)
        });
      }
    );
  });
};

interface TDeleteFileFromS3 {
  fileName: string;
  folder?: string | null;
}

/**
 *
 * @param fileName
 * @param folder
 */
export const deleteFileFromS3 = ({ fileName, folder }: TDeleteFileFromS3): Promise<any> => {
  folder = encodeURIComponent(folder || 'testing') + '/';
  let fileKey = folder + fileName;
  return s3.deleteObject({ Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV, Key: fileKey }).promise();
};

export const checkIfS3FileExist = (fileName: string): Promise<any> => {
  return s3.headObject({ Bucket: AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV, Key: fileName }).promise();
};

export const getFullS3Url = (fileKey: string): string => {
  return (
    s3.endpoint.protocol +
    '//' +
    AWS_S3_BUCKET_RADIO_BAKSHO_WEB_DEV +
    '.' +
    s3.endpoint.hostname +
    '/' +
    fileKey
  );
};
