import { canAccessHeartRate, canAccessUserProfile, canAccessLocation } from '../__mocks__/userPermissions';

jest.mock('appbit', () => {
  const permissions = {
    granted: jest.fn().mockImplementation(permission => {
      return permission === "access_heart_rate" || permission === "access_user_profile";
    })
  };

  return {
    me: {
      permissions: permissions
    }
  };
});

describe('User Permissions', () => {
  it('allows access to heart rate', () => {
    expect(canAccessHeartRate()).toBeTruthy();
  });

  it('allows access to user profile', () => {
    expect(canAccessUserProfile()).toBeTruthy();
  });

  it('denies access to location', () => {
    expect(canAccessLocation()).toBeFalsy();
  });
});