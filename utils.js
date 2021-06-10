module.exports = {
  messengerUrl: 'https://www.messenger.com/',
  schema: {
    properties: {
      username: {
        description: 'Enter username',
        type: 'string',
        required: true,
      },
      password: {
        description: 'Enter password',
        type: 'string',
        required: true,
        replace: '*',
        hidden: true,
      },
    },
  },
}
