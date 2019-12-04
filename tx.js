const bitcoin = require('bitcoinjs-libv5')
const TESTNET = bitcoin.networks.testnet

;(async()=>{
  try {
    const wifkey0='cPbiJjBiiRR9hg4ogdufF4GyNzvTuPSyhTkNsUhZQSwSdkADbKjG'
    const wifkey1='cT47H2tH6uszYCrgGwDY3rNgQVMseMWpWkvJ7Bv9tzuRezsC8JRj'
    let tx = new bitcoin.TransactionBuilder(TESTNET)
    const txid1='95b6935851bca4a98c58d1b67fd9eb52357a848ce8c5aa186f93b2c1e3bf8c17'
    const address0='n3ZJmTayzqmUFcVEr5ip9oA8TU8jbCG7AS'
    const address1='mp3rRAUQshpCmFKnNZ3yTCrBhDbT3fNegD'
    tx.addInput(txid1, 0)

    tx.addOutput(address1, 5000)
    tx.addOutput(address0, 0)

    const privateSign = bitcoin.ECPair.fromWIF(wifkey1, TESTNET)
    tx.sign(0, privateSign)
    const txHex = tx.build().toHex()
    console.log('[txHex]',txHex)
  } catch (e) {
   console.error(e) 
  }
})()
  