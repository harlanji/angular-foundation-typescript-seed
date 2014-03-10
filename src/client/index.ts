/// <reference path="_all.d.ts" />

  
import hello = require('./hello');
import alertDemo = require('./alertdemo');
import modalDemo =  require('./modaldemo/index');

var mod : ng.IModule;
export function $ng () {
  hello.$ng();
  alertDemo.$ng();
  modalDemo.$ng();

  return mod || (mod = angular.module('client', ['client.hello', 'client.alertdemo', 'client.modaldemo']));
};
