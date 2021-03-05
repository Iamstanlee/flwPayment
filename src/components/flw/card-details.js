import { useReducer, useState } from "react";
import { validatePaymentForm } from "../../helpers/input-validators";
import { getCurrencySign } from "../../helpers/utils";
import Btn from "../button";
import Input from "../input";

const GET_INPUT = "GET_INPUT";
export default function Card({ currency, amount, loading, cb }) {
  const [inputError, setInputError] = useState({});
  const [card, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case GET_INPUT:
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      default:
    }
  }, {});
  const sign = getCurrencySign(currency);
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(event) => {
        event.preventDefault();
        const errors = validatePaymentForm(card);
        if (errors.atLeastAnError) {
          setInputError(errors);
        } else {
          setInputError({});
          let _card = {
            ...card,
            cvv: card.cvv.replace(/\s/g, "").trim(),
            card_number: card.card_number.replace(/\s/g, "").trim(),
            expiry_month: card.expiry_date.substring(0, 2),
            expiry_year: card.expiry_date.substring(3),
          };
          delete _card.expiry_date;
          cb(_card);
        }
      }}
    >
      <p className="text-center py-2">Enter debit card details</p>
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GET_INPUT, payload: e });
        }}
        name="fullname"
        placeholder="CARDHOLDER NAME"
        error={inputError}
      />
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GET_INPUT, payload: e });
        }}
        name="card_number"
        placeholder="CARD NUMBER"
        error={inputError}
      />
      <div className="flex flex-row justify-between">
        <Input
          onChange={(e) => {
            e.persist();
            dispatchInputEvent({ type: GET_INPUT, payload: e });
          }}
          placeholder="MM/YY"
          maxLength="5"
          name="expiry_date"
          inputMode="numeric"
          error={inputError}
        />
        <div className="mx-2" />
        <Input
          onChange={(e) => {
            e.persist();
            dispatchInputEvent({ type: GET_INPUT, payload: e });
          }}
          placeholder="CVV"
          maxLength="4"
          name="cvv"
          inputMode="numeric"
          error={inputError}
        />
      </div>
      <Btn
        loading={loading}
        disabled={loading}
        label={
          loading ? "Please wait..." : `Pay ${sign ? sign : currency}${amount}`
        }
      />
    </form>
  );
}
