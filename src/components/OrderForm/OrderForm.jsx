import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContextInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import { validationOrderSchema } from "../../validationSchema";
import Checkbox from "../Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import "./OrderForm.css";
import { clearCart } from "../../redux/slices/cartSlice";

const OrderForm = () => {
  const { login } = useContext(UserContext);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: { name: login, phone: "", address: "", priority: false },
    resolver: yupResolver(validationOrderSchema),
    mode: "onBlur",
  });

  const isCheckboxChecked = watch("priority");

  const onSubmit = (data) => {
    console.log({ ...data, totalPrice: +totalPrice });
    reset(
      {
        priority: false,
      },
      { keepValues: false },
    );
    dispatch(clearCart());
  };

  const totalPrice = (
    items.reduce(
      (acc, { unitPrice, quantity }) => acc + unitPrice * quantity,
      0,
    ) + (isCheckboxChecked ? 8 : 0)
  ).toFixed(2);

  if (!login) {
    return <h1>Please enter login</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input label="First name" error={error?.message} {...field} />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input label="Phone number" error={error?.message} {...field} />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input label="Address" error={error?.message} {...field} />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            label="Want to you give your irder priority?"
            error={error?.message}
            checked={field["value"] ?? false}
            {...field}
          />
        )}
      />

      <button disabled={!isValid} className="submit-btn" type="submit">
        ORDER NOW FOR &euro; {totalPrice}
      </button>
    </form>
  );
};

export default OrderForm;
