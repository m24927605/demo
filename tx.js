const bitcoin = require('bitcoinjs-libv5')
const TESTNET = bitcoin.networks.testnet

;(async()=>{
  try {
    const wifkey0='cPbiJjBiiRR9hg4ogdufF4GyNzvTuPSyhTkNsUhZQSwSdkADbKjG'
    const wifkey1='cT47H2tH6uszYCrgGwDY3rNgQVMseMWpWkvJ7Bv9tzuRezsC8JRj'
    let tx = new bitcoin.TransactionBuilder(TESTNET)
    const txid1='f10894d06bf0405833906a4d05970fa3a76485b491332cc97a151b79177e61ab'
    const address0='n3ZJmTayzqmUFcVEr5ip9oA8TU8jbCG7AS'
    const address1='mp3rRAUQshpCmFKnNZ3yTCrBhDbT3fNegD'

    tx.addInput(txid1, 0)
    tx.addOutput(address1, 9000)

    const privateSign = bitcoin.ECPair.fromWIF(wifkey0, TESTNET)
    tx.sign(0, privateSign)
    const txHex = tx.build().toHex()
    console.log('[txHex]',txHex)
  } catch (e) {
   console.error(e) 
  }
})()
  