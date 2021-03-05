var forge = require("node-forge");

export const encrypt = (payload) => {
  var cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(process.env.REACT_APP_ENCRYPTION_KEY)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(JSON.stringify(payload), "utf-8"));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
};

// return a random charge reference using Date.now()
export function getChargeREF() {
  var date = Date.now();
  return `flw-${date.toString().substring(0, 9)}`;
}

//  returns currency sign based on currency value
export function getCurrencySign(value) {
  const curList = [{ cur: "USD", symbol: "$" }];
  return curList.find((currency) => currency.cur === value).symbol;
}
