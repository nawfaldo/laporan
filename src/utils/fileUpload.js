const aws = require('aws-sdk'); // import aws-sdk
// Setting aws configurations
aws.config.update({
  secretAccessKey: 'yCfngZNMlVDiAcR12PJ0TC2HQupE09cPLXiuUFTR',
  accessKeyId: 'AKIAT3RALZNPA743G6FB',
  region: 'ap-southeast-1',
});
// Decent bucket name
const bucketName = 'database-website';
// Initiating S3 instance
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});
// Options you can choose to set to accept files upto certain size limit
const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
// The heart
// "Key" accepts name of the file, keeping it a timestamp for simplicity
// "Body" accepts the file
async function upload(file) {
  const params = {
    Bucket: bucketName,
    Key: `${Date.now().toString()}`,
    Body: file,
  };
  let fileResp = null;
  await s3
    .upload(params, options)
    .promise()
    .then((res) => {
      fileResp = res;
    });
  return fileResp;
}
module.exports = upload;
