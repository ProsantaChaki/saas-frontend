import AWS from 'aws-sdk';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from './constantData/constants';

export async function uploadImageOnS3(file) {
  const s3bucket = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    Bucket: 'easywintest',
    signatureVersion: 'v4',
  });
  let contentType = 'image/jpeg';
  let contentDeposition = 'inline;filename="' + file.name + '"';
  const base64 = await fs.readFile(file.uri, 'base64');
  const arrayBuffer = decode(base64);
  let upload = await new Promise((resolve, reject) => {
    s3bucket.createBucket(async () => {
      const params = {
        Bucket: 'easywintest',
        Key: file.name,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err);
          //console.log('error in callback');
        } else if (data) {
          resolve(data.Location);
          //imageUpload({profile_image: data.Location});
        }
      });
    });
  });
  return upload;
}
