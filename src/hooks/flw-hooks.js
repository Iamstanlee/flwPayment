import { useEffect, useReducer } from "react";
const GET = "GET_REQUIRED_FIELD";
const LOADING = "LOADING";
const UPDATE_STEP = "UPDATE_STEP";
const GET_RESPONSE = "GET_RESPONSE";
const GET_ERROR = "GET_ERROR";

const useFlw = () => {
  const [flw, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case GET:
          const { key, value } = action.payload;
          return { ...state, isLoading: true, [key]: value };
        case UPDATE_STEP:
          let step = action.payload;
          return { ...state, step, isLoading: false };
        case GET_RESPONSE:
          const response = action.payload;
          return { ...state, response, isLoading: false };
        default:
      }
    },
    { step: 0, isLoading: false, response: null }
  );

  useEffect(() => {
    if (flw.isLoading) {
      setTimeout(() => {
        if (flw.card) {
          dispatch({ type: UPDATE_STEP, payload: 1 });
        }
        if (flw.pin) {
          dispatch({ type: UPDATE_STEP, payload: 2 });
        }
        if (flw.address) {
          dispatch({ type: UPDATE_STEP, payload: 3 });
        }
        if (flw.otp) {
          // dispatch({ t });
        }
      }, 2000);
      // proceed based on the suggested authorization mode
      const decideNextStep = (response) => {
        // save charge reference
        // setReference(response.response && response.response.data);
        // setCard(response.card && response.card);
        // setStepNote("");
        const authMode =
          response.response &&
          response.response.meta &&
          response.response.meta.authorization.mode;
        switch (authMode) {
          case "pin":
            // setStep(1);
            // setStepNote("Enter card pin");
            break;
          case "avs_noauth":
            // setStep(2);
            break;
          case "redirect":
            // call the "validate-charge" api instead
            // setStep(3);
            // const redirectURL = response.response.meta.authorization.redirect;
            // const extWindow = window.open(redirectURL, "_blank");
            // // validate charge when external window is closed
            // extWindow.onunload = function () {};
            break;
          case "otp":
            // setStep(3);
            break;
          default:
          // setStep(0);
          // onPaymentFailed(response.response ?? "Payment failed, Try again");
        }
      };
    }
  }, [flw.isLoading]);

  const type = { GET, UPDATE_STEP, GET_RESPONSE, LOADING, GET_ERROR };
  return { flw, type, dispatch };
};

export default useFlw;
