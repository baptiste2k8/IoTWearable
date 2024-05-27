import document from "document";

import * as simpleHRM from "./simple/hrm";
import * as simpleLocation from "./simple/location";
import { Server } from 'ws';

let txtHRM = document.getElementById("txtHRM");

/*------------ Location --------- */ 
simpleLocation.initialize()

/* -------- HRM ------------- */
function hrmCallback(data) {
  txtHRM.text = `${data.bpm}`;
  console.log("data");
}
simpleHRM.initialize(hrmCallback);

