export const environment = {
  production: false,
  spotify: {
    clientId: 'dcf9f8fcc51140048bec7a474e0fe966',
    redirectUri: 'http://localhost:4200/callback',
    scopes: [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-private',
    ],
  },
};
