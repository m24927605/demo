function generateBitcoinAddress(){
  console.log("generateBitcoinAddress");
  const crypto = require('crypto');
  const EC = require('elliptic').ec;
  const RIPEMD160 = require('ripemd160');
  const bs58 = require('bs58');
  const ec = new EC('secp256k1');

  function sha256(data) {
      return crypto.createHash('sha256').update(data).digest();
  } // A small function I created as there is a lot of sha256 hashing.

  const addrVer = Buffer.alloc(1, 0x00); // 0x00 P2PKH Mainnet, 0x6f P2PKH Testnet
  const wifByte = Buffer.alloc(1, 0x80); // 0x80 Mainnet, 0xEF Testnet

  const key = ec.genKeyPair();
  const privKey = key.getPrivate().toString('hex');
  const pubPoint = key.getPublic();
  const x = pubPoint.getX(); // elliptic x
  const y = pubPoint.getY(); // elliptic y

  // Private Key Hashing
  const bufPrivKey = Buffer.from(privKey, 'hex');
  const wifBufPriv = Buffer.concat([wifByte, bufPrivKey], wifByte.length + bufPrivKey.length);
  const wifHashFirst = sha256(wifBufPriv);
  const wifHashSecond = sha256(wifHashFirst);
  const wifHashSig = wifHashSecond.slice(0, 4);
  const wifBuf = Buffer.concat([wifBufPriv, wifHashSig], wifBufPriv.length + wifHashSig.length);
  const wifFinal = bs58.encode(wifBuf);

  // Public Key Hashing
  const publicKey = pubPoint.encode('hex');
  const publicKeyInitialHash = sha256(Buffer.from(publicKey, 'hex'));
  const publicKeyRIPEHash = new RIPEMD160().update(Buffer.from(publicKeyInitialHash, 'hex')).digest('hex');
  const hashBuffer = Buffer.from(publicKeyRIPEHash, 'hex');
  const concatHash = Buffer.concat([addrVer, hashBuffer], addrVer.length + hashBuffer.length);
  const hashExtRipe = sha256(concatHash);
  const hashExtRipe2 = sha256(hashExtRipe);
  const hashSig = hashExtRipe2.slice(0, 4);
  const bitcoinBinaryStr = Buffer.concat([concatHash, hashSig], concatHash.length + hashSig.length);

  const bitcoinWifAddress = wifFinal.toString('hex');
  const bitcoinAddress = bs58.encode(Buffer.from(bitcoinBinaryStr));
  data={};
  data.WIFPrivateKey = bitcoinWifAddress.toString('hex');
  data.BitcoinAddress =bitcoinAddress.toString('hex');
  return data;
}


console.log('[generateBitcoinAddress]',generateBitcoinAddress())