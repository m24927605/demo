// one time code to generate the master key
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-libv3')
const util = require('ethereumjs-util')

;(async()=>{
    try{
			const phrase = bip39.generateMnemonic()
			const mnemonicWords='crater cloud drill young animal century earth siren because detail knock unfold error jaguar merry pistol fatigue nation wise clinic boss assault grape dinosaur'
			
			const seedBuffer =await bip39.mnemonicToSeed(mnemonicWords)

			const masterNode = bitcoin.HDNode.fromSeedBuffer(seedBuffer)
			const btcAccount0 = masterNode.derivePath("m/44'/0'/0'")
			const btcKey0 = btcAccount0.derivePath("0/0").keyPair
			console.log('[WIF private key]',btcKey0.toWIF())
			console.log('[btc public key]',btcKey0.getPublicKeyBuffer().toString('hex'))

			const xprvString = bitcoin.HDNode.fromSeedBuffer(seedBuffer).toBase58();
			const xpubString = bitcoin.HDNode.fromBase58(xprvString).derivePath("m/44'/0'/0'").neutered().toBase58();
			console.log('[xprv]',xprvString)
			console.log('[xpub]',xpubString)
			
			const pubkey0FromXpub = bitcoin.HDNode.fromBase58(xpubString)
			const btcAddress0 =  pubkey0FromXpub.derivePath("0/0").getAddress()
			const btcAddress1 =  pubkey0FromXpub.derivePath("0/1").getAddress()
			const btcAddress2 =  pubkey0FromXpub.derivePath("0/2").getAddress()
			const btcAddress3 =  pubkey0FromXpub.derivePath("0/3").getAddress()
			console.log('[btcAddress0]',btcAddress0)
			console.log('[btcAddress1]',btcAddress1)
			console.log('[btcAddress2]',btcAddress2)
			console.log('[btcAddress3]',btcAddress3)

			const ethAccount0 = masterNode.derivePath("m/44'/60'/0'")
			const ethKey0 = ethAccount0.derivePath("0/0").keyPair
			const ethAddress0 = util.pubToAddress(ethKey0.getPublicKeyBuffer(), true)
			const encodingethAddress0=util.toChecksumAddress(ethAddress0.toString('hex'))
			console.log('[encodingethAddress0]',encodingethAddress0.toLocaleLowerCase())

    }catch(e){
        console.error(e)
    }
})()
