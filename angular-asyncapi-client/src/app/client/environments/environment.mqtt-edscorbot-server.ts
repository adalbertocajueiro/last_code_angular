export const environment = {
  clientInfo: {
    clientId: crypto.randomUUID(),
  },
  broker: {
    url: '192.168.1.115',
    hostname: '192.168.1.115',
    port: 8080,
    clean: true,
    connectOnCreate: true,
    connectTimeout: 4000,
    reconnectPeriod: 3900,
  },
};
