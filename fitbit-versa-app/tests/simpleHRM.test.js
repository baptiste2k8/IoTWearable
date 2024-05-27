import { initialize, getRandomHeartRate, getReading, start, stop } from '../app/simple/hrm'; 


jest.mock('appbit', () => ({
  me: {
    permissions: {
      granted: jest.fn()
    }
  }
}));

describe('Heart Rate Monitor Module', () => {
  let mockHRM, mockPermissions, mockSender, callback;

  beforeEach(() => {
    mockHRM = {
      start: jest.fn(),
      stop: jest.fn(),
      heartRate: 75,
      timestamp: 1000
    };
    mockPermissions = {
      granted: jest.fn().mockReturnValue(true)
    };
    mockSender = jest.fn();
    callback = jest.fn();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize correctly with permissions', () => {
    initialize(callback, mockPermissions, jest.fn(() => mockHRM), mockSender);

    expect(mockHRM.start).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle denied permissions', () => {
    mockPermissions.granted.mockReturnValue(false);
    initialize(callback, mockPermissions, jest.fn(() => mockHRM), mockSender);

    expect(callback).toHaveBeenCalledWith({
      bpm: "???",
      zone: "denied",
      restingHeartRate: "???"
    });
  });

});