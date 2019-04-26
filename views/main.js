express = require('express')
dataRouter = express.Router()

var ibmdb = require('ibm_db');
var myrows = [];
ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=hmr17396;PWD=tdb^q406wq1qsqn2;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
  if (err) {
      return console.log(err);
  }
  conn.query('select * from SUMMARY_DATA WHERE INTERVAL_LEN=30 and TRIAL_SESSION_ID=17 ORDER BY ID DESC LIMIT 6', function (err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      data.forEach(function(row) {
        myrows.push(row);
      });
      console.log(myrows)
      %("#results").text(myrows);
    }
    conn.close(function () {
      console.log('done');
    });
  });
});
