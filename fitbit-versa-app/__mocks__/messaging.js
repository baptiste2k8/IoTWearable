export const peerSocket = {
    send: jest.fn(),
    onmessage: jest.fn(),
    onopen: jest.fn(),
    onclose: jest.fn(),
    READY: 'ready',
    CLOSED: 'closed',
    ERROR: 'error',
    OPEN: 'open'
  };