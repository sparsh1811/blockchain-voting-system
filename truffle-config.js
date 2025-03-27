module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546, // Ganache default port
      network_id: "*", // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your Solidity version
    },
  },
  // Additional configurations can be added here for production or testing networks
};
