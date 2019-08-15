const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;

async function deploy(options) {
  add({ contractsData: [{ name: 'Counter', alias: 'Counter' }] });
  await push(options);
  let contract = await create(Object.assign({ contractAlias: 'Counter' }, options));

  // Increase the counter value
  // await sendTx.default.sendTx(Object.assign({ contractAlias: 'Counter', methodName: 'increase', methodArgs: [10]}, options));
  // await contract.increase(10);
  // console.log(contract);
  // await contract.methods.increase(10);
  return contract;
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] })
    await deploy({ network, txParams })
  })
}