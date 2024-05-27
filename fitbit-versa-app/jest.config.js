module.exports = {
    // transform: {
    //   ".(t|j)sx?": "ts-jest",
    // },
  
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "js",
    ],
    moduleNameMapper: {
        '^appbit$': './__mocks__/appbit.js',
        '^heart-rate$': './__mocks__/heart-rate.js',
        '^messaging$': './__mocks__/messaging.js',
        '^userPermisssions$': './__mocks__/userPermissions.js'

            },
    testRegex: ".*\\.test\\.(t|j)sx?$",
    clearMocks: true,
    restoreMocks: true,
    testEnvironment: 'node'
  };