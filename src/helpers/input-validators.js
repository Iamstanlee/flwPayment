const regexText = /^[a-zA-Z0-9 ]+$/;
const regexName = /^[a-zA-Z ]+$/;
const regexNumber = /^[0-9]+$/;

// BASIC FIELD VALIDATIONS
// TODO: More validation on card input fields

export function validateAddressForm(fields) {
  let errors = { atLeastAnError: false };
  for (const key in fields) {
    if (key === "zipcode") {
      if (!regexNumber.test(fields[key])) {
        errors.atLeastAnError = true;
        errors[key] = "Invalid Zipcode";
      }
    }
    if (fields[key] === undefined || fields[key].length === 0) {
      errors.atLeastAnError = true;
      errors[key] = `${key} is required`;
    }
  }

  return errors;
}

export function validatePaymentForm(fields) {
  let errors = { atLeastAnError: false };
  if (
    !regexNumber.test(fields.card_number) ||
    fields.card_number.length === 0
  ) {
    errors.atLeastAnError = true;
    errors.card_number = "Invalid card number";
  }

  if (!regexName.test(fields.fullname) || fields.fullname === undefined) {
    errors.atLeastAnError = true;
    errors.fullname = "Invalid cardholder name";
  }
  if (
    !regexNumber.test(fields.cvv) ||
    fields.cvv === undefined ||
    fields.cvv.length > 4
  ) {
    errors.atLeastAnError = true;
    errors.cvv = "Invalid cvv number";
  }
  if (
    fields.expiry_date === undefined ||
    !regexNumber.test(fields.expiry_date.substring(0, 2)) ||
    !regexNumber.test(fields.expiry_date.substring(3)) ||
    fields.expiry_date.length !== 5
  ) {
    errors.atLeastAnError = true;
    errors.expiry_date = "Invalid expiry date";
  }
  return errors;
}
