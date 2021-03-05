import Card from "./card-details";
import useFlw from "../../hooks/flw-hooks";
import CardAddress from "./card-address";
import CardPin from "./card-pin";
import CardOtp from "./card-otp";
import { useEffect } from "react";
export default function Flw({
  currency,
  amount,
  success, // called if the payment was succesful
  failed, // called if payment fails
}) {
  const { flw, type, dispatch } = useFlw();

  useEffect(() => {
    if (flw.finished) {
      if (flw.successful) {
        success(flw.response);
      } else {
        failed(flw.error);
      }
    }
  }, [flw.finished]);

  return (
    <div className="w-1/2 lg:w-1/4 m-auto mt-44 bg-white rounded shadow-sm p-4 pb-8">
      {flw.step === 0 && (
        <Card
          currency={currency}
          amount={amount}
          cb={(card) => {
            dispatch({
              type: type.GET,
              payload: { key: "card", value: card },
            });
          }}
          loading={flw.isLoading}
        />
      )}
      {flw.step === 1 && (
        <CardPin
          cb={(pin) => {
            dispatch({
              type: type.GET,
              payload: { key: "pin", value: pin },
            });
          }}
          loading={flw.isLoading}
        />
      )}
      {flw.step === 2 && (
        <CardAddress
          cb={(address) => {
            dispatch({
              type: type.GET,
              payload: { key: "address", value: address },
            });
          }}
          loading={flw.isLoading}
        />
      )}
      {flw.step === 3 && (
        <CardOtp
          cb={(otp) => {
            dispatch({
              type: type.GET,
              payload: { key: "otp", value: otp },
            });
          }}
          loading={flw.isLoading}
        />
      )}
    </div>
  );
}
