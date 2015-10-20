var encrypt_decrypt = require("../index");

var data = "hello world";
var key = parseInt(Date.now()/1000);

var encryptData = encrypt_decrypt.encrypt(data, key);
console.log("encryptData =", encryptData);

var decryptData = encrypt_decrypt.decrypt(encryptData, key);
console.log("decryptData =", decryptData);

