import { useState } from "react";
import Btn from "../button";
import Input from "../input";

export default function CardOtp({ loading, cb }) {
  const [otp, setOtp] = useState("");
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={(event) => {
        event.preventDefault();
        cb(otp);
      }}
    >
      <p className="text-center py-2">Enter the OTP sent to your devices</p>
      <Input
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        name="otp"
        placeholder="OTP"
        style="text-center tracking-widest"
      />
      <Btn loading={loading} disabled={loading} label="CONTINUE" />
    </form>
  );
}
