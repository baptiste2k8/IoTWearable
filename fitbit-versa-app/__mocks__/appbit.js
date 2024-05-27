const permissions = {
    granted: jest.fn().mockImplementation(permission => {
      return permission === "access_heart_rate" || permission === "access_user_profile";
    })
  };
  
  export const me = {
    permissions: permissions
  };