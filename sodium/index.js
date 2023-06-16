const { SodiumPlus } = require("sodium-plus");
(async function() {
    // Select a backend automatically
    let sodium = await SodiumPlus.auto();
 
    let key = await sodium.crypto_secretbox_keygen();
    let nonce = await sodium.randombytes_buf(24);
    let message = 'This is just a test message';
    // Message can be a string, buffer, array, etc.
 
    let ciphertext = await sodium.crypto_secretbox(message, nonce, key);
    console.log(ciphertext);
    let decrypted = await sodium.crypto_secretbox_open(ciphertext, nonce, key);
    console.log(decrypted.toString('utf-8'));
})();
