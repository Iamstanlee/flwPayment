import { useState } from "react";
import Btn from "../button";
import Input from "../input";

export default function CardPin({ loading, cb }) {
  const [pin, setPin] = useState("");
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(event) => {
        event.preventDefault();
        cb(pin);
      }}
    >
      <p className="text-center py-2">Enter 4 digits card pin</p>
      <Input
        onChange={(e) => {
          setPin(e.target.value);
        }}
        name="pin"
        maxLength="4"
        placeholder="PIN"
        style="text-center tracking-widest"
      />
      <Btn disabled={loading} label="CONTINUE" loading={loading} />
    </form>
  );
}
