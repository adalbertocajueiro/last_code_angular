export const environment = {
  clientInfo: {
    clientId: crypto.randomUUID(),
  },
  broker: {
    url: 'localhost',
    hostname: 'localhost',
    port: 8080,
    clean: true,
    connectOnCreate: true,
    connectTimeout: 4000,
    reconnectPeriod: 3900,
  },
};
