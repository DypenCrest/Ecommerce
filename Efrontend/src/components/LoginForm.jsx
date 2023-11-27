import React, { useState } from "react";
import { Formik } from "formik";
import validateLogin from "./validations";
import { Box, Button, TextField, Typography } from "@mui/material";
import { $axios } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => await $axios.post("user/login", values),

    onSuccess: (res) => {
      localStorage.setItem("accesstoken", res?.data?.token);
      localStorage.setItem("firstName", res?.data?.user?.firstName);
      localStorage.setItem("userRole", res?.data?.user?.role);
      navigate("/");
    },
  });

  return (
    <>
      {isLoading && <Typography>Registering...</Typography>}
      {isError && (
        <Typography sx={{ color: "red" }}>
          {error.response.data.message}
        </Typography>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validateLogin}
        onSubmit={(values) => mutate(values)}
      >
        {(formik) => (
          <form className="form-center" onSubmit={formik.handleSubmit}>
              <TextField
                label="Email"
                size="small"
                className="field-control"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
              <TextField
                label="Password"
                size="small"
                className="field-control"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}

            <Button fullWidth className="btn" type="submit" variant="contained" color="success">
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
