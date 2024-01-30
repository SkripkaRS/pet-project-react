import React, { memo } from "react";
import "./Login.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextInfo";
import { Controller, useForm } from "react-hook-form";
import { validationLoginSchema } from "../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input/Input";

const Login = () => {
  const { login, setLogin } = useContext(UserContext);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: { login },
    resolver: yupResolver(validationLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = ({ login }) => {
    setLogin(login);
  };

  return (
    <div>
      <div className="content">
        <div className="title">The best pizza</div>
        <div className="subtitle">
          Straight out of the oven, straight to you
        </div>
        <div className="form">
          <div className="form-title">
            Welcome! Please start by telling us your name:
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="login"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input label="Login" error={error?.message} {...field} />
              )}
            />

            <button disabled={!isValid} className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
