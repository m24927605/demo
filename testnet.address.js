const bitcoin = require('bitcoinjs-libv5')
const bip32 = require('bip32')
const TESTNET = bitcoin.networks.testnet
const bip39 = require('bip39')

;(async()=>{
  const mnemonicWords='crater cloud drill young animal century earth siren because detail knock unfold error jaguar merry pistol fatigue nation wise clinic boss assault grape dinosaur'
			
  const seedBuffer =await bip39.mnemonicToSeed(mnemonicWords)

  const masterNode =  bip32.fromSeed(seedBuffer,TESTNET)
  const xpri=masterNode.toBase58();
  const xpub = masterNode.derivePath(`m/44'/0'/0'`).neutered().toBase58()
  const wifkey0=masterNode.derivePath(`m/44'/0'/0'/0/0`).toWIF();
  const wifkey1=masterNode.derivePath(`m/44'/0'/0'/0/1`).toWIF();
  console.log('[xpri]',xpri)
  console.log('[xpub]',xpub)
  console.log('[wifkey0]',wifkey0)
  console.log('[wifkey1]',wifkey1)

	const { address:p2pkhAddress0 } = bitcoin.payments.p2pkh({
        pubkey: bip32.fromBase58(xpub,TESTNET).derive(0).derive(0).publicKey,
        network:TESTNET
  })
  const { address:p2pkhAddress1 } = bitcoin.payments.p2pkh({
    pubkey: bip32.fromBase58(xpub,TESTNET).derive(0).derive(1).publicKey,
    network:TESTNET
})
  
  const { address:segwitAddress } = bitcoin.payments.p2wpkh({ pubkey: bip32.fromBase58(xpub,TESTNET).derive(0).derive(0).publicKey,network:TESTNET });
	const { address:p2shAddress } = bitcoin.payments.p2sh({
		redeem: bitcoin.payments.p2wpkh({
			pubkey: bip32
				.fromBase58(xpub,TESTNET)
				.derive(0)
        .derive(0).publicKey,
        network:TESTNET
    }),
    network:TESTNET
	});
	
  console.log(`p2pkh address0 is ${p2pkhAddress0}`)
  console.log(`p2pkh address1 is ${p2pkhAddress1}`)
	console.log(`segwit address is ${segwitAddress}`)
	console.log(`SegWit address (via P2SH) is ${p2shAddress}`)
})()