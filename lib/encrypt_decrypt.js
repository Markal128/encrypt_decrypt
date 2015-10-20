var crypto = require("crypto");

function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
}

function MD5(data) {
    if(!isString(data)) {
        data = JSON.stringify(data);
    }

    var md5 = crypto.createHash("md5");
    return md5.update(data).digest("hex");
}

function Base64Encode(data) {
    var out = new Buffer(data);
    return out.toString("base64");
}

function Base64Decode(data) {
    var out = new Buffer(data, "base64");
    return out.toString();
}

function encrypt(encryptData, key) {
    key = MD5(key);
    var x = 0;
    var buffer = new Buffer(encryptData);
    var len = buffer.length;
    var l = key.length;
    var char = "";
    for (var i = 0; i < len; i++) {
        if (x === l) {
            x = 0;
        }
        char += key[x];
        x++;
    }

    var str = new Array(buffer.length);

    for (var i = 0; i < len; i++) {
        str[i] = (buffer[i] + char.charCodeAt(i)) % 256;
    }

    return Base64Encode(str);
}

function decrypt(decryptData, key) {
    key = MD5(key);
    var x = 0;
    var data = new Buffer(decryptData, "base64");

    var len = data.length;
    var l = key.length;
    var char = "";
    for (var i = 0; i < len; i++) {
        if (x === l) {
            x = 0;
        }
        char += key.substr(x, 1);
        x++;
    }

    var str = new Array(len);
    for (var i = 0; i < len; i++) {
        var item = data[i];
        if (item < char.charCodeAt(i)) {
            str[i] = (item + 256) - char.charCodeAt(i);
        } else {
            str[i] = item - char.charCodeAt(i);
        }
    }

    var code = new Buffer(str);
    return code.toString();
}

module.exports = {
    encrypt : encrypt,
    decrypt : decrypt
}