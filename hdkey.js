const HDKey = require('hdkey')
const bip39 = require('bip39')
const secp256k1 = require('secp256k1')

;(async()=>{
  const mnemonicWords='crater cloud drill young animal century earth siren because detail knock unfold error jaguar merry pistol fatigue nation wise clinic boss assault grape dinosaur'
  const seedBuffer =await bip39.mnemonicToSeed(mnemonicWords)
  const hdkey = HDKey.fromMasterSeed(seedBuffer)
  console.log('[master privateKey]',hdkey.privateKey)
  console.log('[privateExtendedKey]',hdkey.privateExtendedKey)
  console.log('[publicExtendedKey]',hdkey.publicExtendedKey)
  const childkey = hdkey.derive("m/44'/0'/0'")
  console.log('[account0 privateKey]',childkey.privateKey.toString('hex'))
  console.log('[account0 publicKey]',childkey.publicKey.toString('hex'))

  const pubkey= secp256k1.publicKeyCreate(childkey.privateKey, true).toString('hex')
  console.log('[account0 pubkey]',pubkey)
})()