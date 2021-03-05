const { FLW_URL } = require("./helpers/CONSTANTS");
const { post, get } = require("./helpers/utils");
require("dotenv").config();

exports.initPayment = async (req, res) => {
  try {
    const payload = req.body;
    const flwRes = await post(
      `${FLW_URL}/charges?type=card`,
      JSON.stringify(payload),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLW_SK}`,
      }
    );
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

exports.validatePayment = async (req, res) => {
  try {
    const payload = req.body;
    const flwRes = await post(
      `${FLW_URL}/validate-charge`,
      JSON.stringify(payload),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLW_SK}`,
      }
    );
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
