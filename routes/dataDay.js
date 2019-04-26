// middleware to query the daily data from IBM DB2 database
// and send to the index.ejs file

var express = require('express')
var dataRouterDay = express.Router()
var ibmdb = require('ibm_db');



dataRouterDay.get('/', function(req, res) {
  ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=hmr17396;PWD=tdb^q406wq1qsqn2;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
    if (err) {
        return console.log(err);
    }
    conn.query('SELECT * FROM SUMMARY_DATA WHERE INTERVAL_LEN=1800 and TRIAL_SESSION_ID=17', function (errq, data) {
      if (errq) console.log(errq);
      else {
        //console.log(data);
        res.send(data);
        
      }
      conn.close(function () {
        //console.log('done');
      });
    });
  });
});


module.exports = dataRouterDay;