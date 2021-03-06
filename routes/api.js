/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var units = convertHandler.units
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
// checks if the init unit is not in the units variable
// and the init number has more than one /
      if (units.indexOf(initUnit.toLowerCase())===-1 
         && input.indexOf('/')!==input.lastIndexOf('/')){
        res.send('invalid unit and number')
      } else if (units.indexOf(initUnit.toLowerCase())===-1){
        res.send('invalid unit')
      } else if (input.indexOf('/')!==input.lastIndexOf('/')){
        res.send("invalid number")
      } else {
      res.json({initNum: initNum, 
                initUnit: initUnit, 
                returnNum: returnNum, 
                returnUnit: returnUnit, 
                string: toString})
      }
          

    });
    
};
