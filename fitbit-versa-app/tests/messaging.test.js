import { peerSocket } from "messaging";

describe('Messaging Tests', () => {
  it('should handle message sending', () => {
    const data = { key: 'value' };
    peerSocket.send(data);
    expect(peerSocket.send).toHaveBeenCalledWith(data);
  });

  it('should handle open connection', () => {
    peerSocket.onopen();
    expect(peerSocket.onopen).toHaveBeenCalled();
  });
});