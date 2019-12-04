const bitcoin = require('bitcoinjs-libv5')
const bip32 = require('bip32')

;(()=>{
	const xpub = 'xpub6CQ9i6cLu3b7NgxArE3RT4P7uxivamnV3mC4tLvkz8zW8vsQmaDgbD4k3y5kGgFYTuhmSxhf5uMQsoz9P1JZ7t6NnpWz5aU7qmhYte7PKNG'
	const { address:p2pkhAddress } = bitcoin.payments.p2pkh({
				pubkey: bip32.fromBase58(xpub).derive(0).derive(0).publicKey,
	})
	const { address:segwitAddress } = bitcoin.payments.p2wpkh({ pubkey: bip32.fromBase58(xpub).derive(0).derive(0).publicKey });
	const { address:p2shAddress } = bitcoin.payments.p2sh({
		redeem: bitcoin.payments.p2wpkh({
			pubkey: bip32
				.fromBase58(xpub)
				.derive(0)
				.derive(0).publicKey,
		}),
	});
	
	console.log(`p2pkh address is ${p2pkhAddress}`)
	console.log(`segwit address is ${segwitAddress}`)
	console.log(`SegWit address (via P2SH) is ${p2shAddress}`)
})()