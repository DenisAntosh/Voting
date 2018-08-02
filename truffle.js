module.exports = {
     // See <http://truffleframework.com/docs/advanced/configuration>
     // to customize your Truffle configuration!
     networks: {
          ganache: {
               host: "https://ropsten.infura.io/",
               port: 7545,
               network_id: "*" // Match any network id
          }
     }
};