# vault-rootstock-controller<code><a href="https://www.docker.com/" target="_blank"><img height="50" src="https://dex-bin.bnbstatic.com/static/images/logo_BNB_Chain.svg"></a></code>

[![npm version](https://badge.fury.io/js/@getsafle%2Fvault-rootstock-controller.svg)](https://badge.fury.io/js/@getsafle%2Fvault-rootstock-controller) <img alt="Static Badge" src="https://img.shields.io/badge/License-MIT-green"> [![Discussions][discussions-badge]][discussions-link]
<img alt="Static Badge" src="https://img.shields.io/badge/rootstock_controller-documentation-purple">

A Module written in javascript for managing various keyrings of rootstock accounts, encrypting them, and using them. This repository contains `rootstockHdKeyring` class to create **rootstock wallet** from **Safle Vault**.

- [Installation](#installation)
- [Initialize the rootstock Controller class](#initialize-the-rootstock-controller-class)
- [Methods](#methods)
  - [Generate Keyring with 1 account and encrypt](#generate-keyring-with-1-account-and-encrypt)
  - [Restore a keyring with the first account using a mnemonic](#restore-a-keyring-with-the-first-account-using-a-mnemonic)
  - [Add a new account to the keyring object](#add-a-new-account-to-the-keyring-object)
  - [Export the private key of an address present in the keyring](#export-the-private-key-of-an-address-present-in-the-keyring)
  - [Sign a transaction](#sign-a-transaction)
  - [Sign a message](#sign-a-message)
  - [Get balance](#get-balance)

## Installation

`npm install --save @getsafle/vault-rootstock-controller`

## Initialize the rootstock Controller class

```
const { KeyringController, getBalance } = require('@getsafle/vault-rootstock-controller');

const rootstockController = new KeyringController({
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(password, object) {
      return new Promise('encrypted!');
    },
    decrypt(password, encryptedString) {
      return new Promise({ foo: 'bar' });
    },
  },
});
```

## Methods

### Generate Keyring with 1 account and encrypt

```
const keyringState = await rootstockController.createNewVaultAndKeychain(password);
```

### Restore a keyring with the first account using a mnemonic

```
const keyringState = await rootstockController.createNewVaultAndRestore(password, mnemonic);
```

### Add a new account to the keyring object

```
const keyringState = await rootstockController.addNewAccount(keyringObject);
```

### Export the private key of an address present in the keyring

```
const privateKey = await rootstockController.exportAccount(address);
```

### Sign a transaction

```
const signedTx = await rootstockController.signTransaction(rootstockTx, _fromAddress);
```

### Sign a message

```
const signedMsg = await rootstockController.signMessage(msgParams);
```

### Sign a message

```
const signedObj = await rootstockController.sign(msgParams, pvtKey, web3Obj);
```

### Sign Typed Data (EIP-712)

```
const signedData = await rootstockController.signTypedMessage(msgParams);
```

### Get balance

```
const balance = await rootstockController.getBalance(address, web3);
```

### Send Transaction

```
const receipt = await rootstockController.sendTransaction(signedTx, web3);
```

### Calculate Tx Fees

```
const fees = await rootstockController.getFees(rawTx, web3);
```

[discussions-badge]: https://img.shields.io/badge/Code_Quality-passing-rgba
[discussions-link]: https://github.com/getsafle/vault-rootstock-controller/actions
