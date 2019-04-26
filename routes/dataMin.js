// middleware to query the 5 minute data from IBM DB2 database
// and send to the index.ejs file

var express = require('express')
var dataRouterMin = express.Router()
var ibmdb = require('ibm_db');


dataRouterMin.get('/', function(req, res) {
  ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=hmr17396;PWD=tdb^q406wq1qsqn2;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
    if (err) {
        return console.log(err);
    }
    conn.query('select * from SUMMARY_DATA WHERE INTERVAL_LEN=30 and TRIAL_SESSION_ID=17 ORDER BY ID DESC LIMIT 6', function (errq, data) {
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


module.exports = dataRouterMin;


// var getMinData = function(){

//   dataRouter.route('/')
//   .get(function(req, res, next) {
//     ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=hmr17396;PWD=tdb^q406wq1qsqn2;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
//       if (err) {
//           return console.log(err);
//       }
//       conn.query('select * from SUMMARY_DATA WHERE INTERVAL_LEN=30 and TRIAL_SESSION_ID=17 ORDER BY ID DESC LIMIT 6', function (errq, data) {
//         if (errq) console.log(errq);
//         else {
//           //console.log(data);
//           res.send(data);
          
//         }
//         conn.close(function () {
//           console.log('done');
//         });
//       });
//     });
//   });
//   return dataRouter;
// }

// var getDayData = function(){

//   dataRouter.route('/')
//   .get(function(req, res, next) {
//     ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=hmr17396;PWD=tdb^q406wq1qsqn2;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
//       if (err) {
//           return console.log(err);
//       }
//       conn.query('SELECT * FROM SUMMARY_DATA WHERE INTERVAL_LEN=30 and TRIAL_SESSION_ID=17', function (errq, data) {
//         if (errq) console.log(errq);
//         else {
//           //console.log(data);
//           res.send(data);

//         }
//         conn.close(function () {
//           console.log('done');
//         });
//       });
//     });
//   });
//   return dataRouter;
// }

// module.exports = {getMinData: getMinData, getDayData: getDayData};