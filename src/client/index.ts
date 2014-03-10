/// <reference path="_all.d.ts" />

  
import hello = require('./hello');
import alertDemo = require('./alertdemo');
import modalDemo =  require('./modaldemo/index');


var mod : ng.IModule;
export function $ng () {

  return mod || (mod = angular.module('client', 
    [hello.$ng().name, alertDemo.$ng().name, modalDemo.$ng().name], 
    [function () {
      console.log('configuring client');
    }]));
};