class KeyStore {
  #database = new Map();
  constructor() {
    console.log("Keystore initialized...");
  }
  /**
   * @param {String} key
   * @param {String} value
   * @returns {Boolean}
   */
  setKey(key, value) {
    console.log("Saving in keystore...");
    this.#database.set(key, value);
    console.log("Value stored on key", key, "...");
    return true;
  }
  /**
   * @param {String} key
   * @returns {String}
   */
  getKey(key) {
    console.log("Getting from keystore...");
    const value = this.#database.get(key);
    if (value) {
      console.log("Value fetched from keystore:", key, value);
      return value;
    }
    return null;
  }
}

class MessageHandler {
  #KeyStoreDatabase;
  constructor() {
    console.log("Command handler initiated...");
    this.#KeyStoreDatabase = new KeyStore();
  }

  /**
   * @param {String[]} message
   */
  handleMessage(message) {
    const command = message[0];
    switch (command.toUpperCase()) {
      case "COMMAND":
        return this.#handleInitialCommand(message[0], message[1]);
      case "SET":
        return this.#handleSetCommand(message[1], message[2]);
      case "GET":
        return this.#handleGetCommand(message[1]);

      default:
        break;
    }
  }

  /**
   * @param {String} key
   * @param {String} value
   */
  #handleInitialCommand(key, value) {
    console.log("Received INITIAL command...", key, value);
    return "$0\r\n\r\n";
  }

  /**
   * @param {String} key
   * @param {String} value
   */
  #handleSetCommand(key, value) {
    console.log("Received SET command...");
    const result = this.#KeyStoreDatabase.setKey(key, value);
    if (result) return "+OK\r\n";
    else return "$-1\r\n";
  }

  /**
   * @param {String} key
   * @returns {String}
   */
  #handleGetCommand(key) {
    console.log("Received GET command...");
    const result = this.#KeyStoreDatabase.getKey(key);
    if (result) return `$${result.length}\r\n${result}\r\n`;
    else return "$-1\r\n";
  }
}

module.exports = MessageHandler;
