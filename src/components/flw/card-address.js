import { useReducer, useState } from "react";
import { validateAddressForm } from "../../helpers/input-validators";
import Btn from "../button";
import Input from "../input";

const GETINPUT = "GETINPUT";
export default function CardAddress({ loading, cb }) {
  const [inputError, setInputError] = useState({});
  const [address, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case GETINPUT:
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      default:
    }
  }, {});

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(event) => {
        event.preventDefault();
        const errors = validateAddressForm(address);
        if (errors.atLeastAnError) {
          setInputError(errors);
        } else {
          setInputError({});
          cb(address);
        }
      }}
    >
      <p className="text-center py-2">Address verification required</p>
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GETINPUT, payload: e });
        }}
        name="address"
        placeholder="HOME ADDRESS"
        error={inputError}
      />
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GETINPUT, payload: e });
        }}
        name="city"
        placeholder="CITY"
        error={inputError}
      />
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GETINPUT, payload: e });
        }}
        name="state"
        placeholder="STATE"
        error={inputError}
      />
      {/* TODO: use select for country field */}
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GETINPUT, payload: e });
        }}
        name="country"
        placeholder="COUNTRY"
        error={inputError}
      />
      <Input
        onChange={(e) => {
          e.persist();
          dispatchInputEvent({ type: GETINPUT, payload: e });
        }}
        name="zipcode"
        placeholder="ZIPCODE"
        error={inputError}
      />
      <Btn loading={loading} disabled={loading} label="CONTINUE" />
    </form>
  );
}
