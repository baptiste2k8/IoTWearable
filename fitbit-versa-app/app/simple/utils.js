import { peerSocket } from "messaging";


export function send(data){ 
  if (peerSocket.readyState === peerSocket.OPEN) {
    console.log("Sending message to companion: " + JSON.stringify(data));
    peerSocket.send(JSON.stringify(data));
  } else {
    console.log("Error while sending message to companion: Connection is not open");
  }
}

