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
    conn.query("select 7-h.ROWNUMBER as ID, h.mean as MEAN_HR, h.var as VAR_HR, a.mean as MEAN_ACT, a.var as VAR_ACT from (select mean, var, ROW_NUMBER() OVER () rownumber from SUMMARY_DATA where data_type='hr' order by id desc limit 6) as h join (select mean, var, ROW_NUMBER() OVER () rownumber from SUMMARY_DATA where data_type='act_idx' order by id desc limit 6) as a ON h.ROWNUMBER = a.ROWNUMBER ORDER BY h.ROWNUMBER", function (errq, data) {
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