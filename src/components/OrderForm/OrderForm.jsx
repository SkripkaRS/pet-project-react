import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContextInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import { validationOrderSchema } from "../../validationSchema";
import Checkbox from "../Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import "./OrderForm.css";
import { clearCart } from "../../redux/slices/cartSlice";
import { createOrder } from "../../redux/slices/orderSlice";

const OrderForm = () => {
  const { login } = useContext(UserContext);

  const [statusError, setStatusError] = useState(false);

  const dispatch = useDispatch();

  const { isError, isLoading } = useSelector((state) => state.order);

  const { items } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: { customer: login, phone: "", address: "", priority: false },
    resolver: yupResolver(validationOrderSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const cart = items.map((item) => {
      return {
        name: item.name,
        pizzaId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.quantity * item.unitPrice,
      };
    });

    const payload = {
      ...data,
      position: "",
      cart,
      totalPrice: totalPrice.toFixed(0),
    };

    dispatch(createOrder(payload))
      .then(({ payload }) => {
        setStatusError(false);
        reset({
          priority: false,
        });
        dispatch(clearCart());
        navigate(`/order/${payload.id}`);
      })
      .catch((error) => {
        setStatusError(true);
      });
  };

  const isCheckboxChecked = watch("priority");

  const totalPrice = +(
    items.reduce(
      (acc, { unitPrice, quantity }) => acc + unitPrice * quantity,
      0,
    ) + (isCheckboxChecked ? 8 : 0)
  ).toFixed(2);

  if (!login) {
    return <h1>Please enter login</h1>;
  }

  if (isError || statusError) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} label="First name" name="customer" />
      <Input control={control} label="Phone number" name="phone" />
      <Input control={control} label="Address" name="address" />
      <Checkbox
        label="Want to you give your irder priority?"
        control={control}
        name="priority"
      />

      <button disabled={!isValid} className="submit-btn" type="submit">
        ORDER NOW FOR &euro; {totalPrice}
      </button>
    </form>
  );
};

export default OrderForm;
