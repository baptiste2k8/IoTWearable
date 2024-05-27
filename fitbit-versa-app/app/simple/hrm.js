import { me } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { send } from "./utils";

let hrm, watchID;
let lastReading = 0;
let heartRate;

export function initialize(callback, permissions = me.permissions, HRMSensor = HeartRateSensor, sender = send) {
  watchID = "something";
  if (
    permissions.granted("access_heart_rate") &&
    permissions.granted("access_user_profile")
  ) {
    hrm = new HRMSensor();
    start(permissions, HRMSensor, sender);
    lastReading = hrm.timestamp;
  } else {
    console.log("Denied Heart Rate or User Profile permissions");
    callback({
      bpm: "???",
      zone: "denied",
      restingHeartRate: "???",
    });
  }
}

export function getRandomHeartRate() {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

export function getReading(permissions = me.permissions, HRMSensor = HeartRateSensor, sender = send) {
  if (hrm.timestamp === lastReading) {
    heartRate = getRandomHeartRate();
  } else {
    heartRate = hrm.heartRate;
  }
  lastReading = hrm.timestamp;
  if (heartRate !== "--") {
    sender({ topic: "heartRate", data: heartRate });
  }
}

export function start(permissions = me.permissions, HRMSensor = HeartRateSensor, sender = send) {
  if (!watchID) {
    hrm.start();
    console.log('HRM started');
    getReading(permissions, HRMSensor, sender);
    watchID = setInterval(() => getReading(permissions, HRMSensor, sender), 1000);
  }
}

export function stop() {
  hrm.stop();
  clearInterval(watchID);
  watchID = null;
}