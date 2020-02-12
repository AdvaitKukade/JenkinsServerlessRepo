'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

module.exports.save = (event, context, callback) => {
  console.log('Event : ', event );
  fetch('https://unsplash.com/photos/9b5dvrjb05g')
    .then((response) => {
      console.log('response from fetch : ', response)
      if (response.ok) {
        return response;             
      }
    })
    .then(response => {
      // console.log('response from fetch : ', response)
      return response.buffer()
    })
    .then(buffer => {
      return buffer;
    } )
    .then( (buffer) => {
      return putS3Object(buffer, event)
    })
    .then(v => callback(null, v), callback);
};


function putS3Object( buffer,event){
  console.log("buffer : ", buffer)
  const current_date = new Date();
  return new Promise((resolve, reject) => {
    const s3Params = {
      Bucket:"codefrontbucket",
      Key: `assets/${current_date}.jpg`,
      Body: buffer
    };
    console.log('params to s3 : ', s3Params)
    s3.putObject(s3Params, (error, data) => {
      if(error) {
        reject(error);
      }
      resolve(data);
    })
  })
}