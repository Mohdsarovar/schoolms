const { request } = require('express');
const pool = require('../config/conn.db')

const mastersModel = {};

let logId =""
// @model-name : createAPILog
// @model-desc : To insert data in api log
mastersModel.createAPILog = async (
    {
        incomingRequest,
        action,
        responce,
        createdAt,
    }
  ) => {
  let sql = `INSERT INTO log(
    log_id,
    action,
    request,
    responce,
    created_at
) VALUES(
    'Null',
    '${action}',
    '${incomingRequest}',
    '${responce}',
    '${createdAt}'
) `
pool.query(sql, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        const lastInsertId = result.insertId;
        // console.log(`Inserted with ID: ${lastInsertId}`);
     return lastInsertId
    }
});
   
  };

  module.exports = {
    mastersModel,
  };