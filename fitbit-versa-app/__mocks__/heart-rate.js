
export class HeartRateSensor {
    constructor() {
      this.start = jest.fn();
      this.stop = jest.fn();
      this.heartRate = 80;
      this.timestamp = Date.now();
    }
  }