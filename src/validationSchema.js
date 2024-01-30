import * as yup from "yup";

const phoneRegExp = /^\d+$/;

export const validationOrderSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().matches(phoneRegExp, "phone must be a valid number"),
  address: yup.string().required(),
  priority: yup.boolean(),
});

export const validationLoginSchema = yup.object().shape({
  login: yup.string().required(),
});
