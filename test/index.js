var assert = require("assert");
const Web3 = require("web3");
const CryptoJS = require("crypto-js");
const {
  KeyringController: RootStockKeyring,
  getBalance,
} = require("../src/index");
const {
  HD_WALLET_12_MNEMONIC,
  EXTERNAL_ACCOUNT_PRIVATE_KEY,
  EXTERNAL_ACCOUNT_ADDRESS,
  NETWORK: { TESTNET, MAINNET },
} = require("./constants");

const opts = {
  encryptor: {
    encrypt(pass, object) {
      const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(object),
        pass
      ).toString();

      return ciphertext;
    },
    decrypt(pass, encryptedString) {
      const bytes = CryptoJS.AES.decrypt(encryptedString, pass);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptedData;
    },
  },
};

const opts_empty = {};

const PASSWORD = "random_password";

describe("Initialize wallet ", () => {
  const rootstockKeyring = new RootStockKeyring(opts);

  it("Create new vault and keychain", async () => {
    const res = await rootstockKeyring.createNewVaultAndKeychain(PASSWORD);
    console.log("res ", res);
  });

  it("Create new vault and restore", async () => {
    const res = await rootstockKeyring.createNewVaultAndRestore(
      PASSWORD,
      HD_WALLET_12_MNEMONIC
    );
    assert(
      rootstockKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC,
      "Wrong mnemonic"
    );
  });

  it("Export account (privateKey)", async () => {
    const res = await rootstockKeyring.getAccounts();
    let account = res[0];
    const accRes = await rootstockKeyring.exportAccount(account);
    console.log("accRes ", accRes, Buffer.from(accRes, "hex"));
  });

  it("Get accounts", async () => {
    const acc = await rootstockKeyring.getAccounts();
    console.log("acc ", acc);
  });

  it("Should import correct account ", async () => {
    const address = await rootstockKeyring.importWallet(
      EXTERNAL_ACCOUNT_PRIVATE_KEY
    );
    assert(
      address.toLowerCase() === EXTERNAL_ACCOUNT_ADDRESS.toLowerCase(),
      "Wrong address"
    );
    assert(
      rootstockKeyring.importedWallets.length === 1,
      "Should have 1 imported wallet"
    );
  });

  it("Get address balance", async () => {
    const accounts = await rootstockKeyring.getAccounts();
    const web3 = new Web3(TESTNET.URL);
    const balance = await getBalance(accounts[0], web3);
    console.log(" get balance ", balance, accounts);
  });
});
