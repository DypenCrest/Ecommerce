import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { $axios } from "../lib/axios";
import { validateRegister } from "./validations";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (values) => {
      return $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      navigate("/login");
    },
  });

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "",
    location: "",
    role: "",
    confirmPassword: "",
  };

  return (
    <>
      {isLoading && <Typography>Registering...</Typography>}
      {isError && (
        <Typography sx={{ color: "red" }}>
          {error.response.data.message}
        </Typography>
      )}

      <Formik
        initialValues={ initialValues }
        validationSchema={validateRegister}
        onSubmit={(values) => {
          delete values.confirmPassword;
          mutate(values);
        }}
      >
        {(formik) => (
          <form className="form-center" onSubmit={formik.handleSubmit}>
            <TextField
              size="small"
              label="First name"
              className="field-control"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error-message">{formik.errors.firstName}</div>
            ) : null}

            <TextField
              size="small"
              label="Last name"
              className="field-control"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error-message">{formik.errors.lastName}</div>
            ) : null}

            <TextField
              size="small"
              label="Email"
              type="email"
              autoComplete="True"
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

            <TextField
              size="small"
              label="Confirm password"
              className="field-control"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">
                {formik.errors.confirmPassword}
              </div>
            ) : null}

            <TextField
              size="small"
              label="Location"
              {...formik.getFieldProps("location")}
              className="field-control"
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="error-message">{formik.errors.location}</div>
            ) : null}

            <Box component="form" sx={{ marginTop: 2, marginBottom: 2 }}>
              <FormControl sx={{ marginInline: 1, width: "10rem" }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  {...formik.getFieldProps("gender")}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="preferNotToSay">Others</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="error-message">{formik.errors.gender}</div>
                ) : null}
              </FormControl>

              <FormControl sx={{ marginLeft: 1, width: "10rem" }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  label="Role"
                  helperText="Please select your Role"
                  {...formik.getFieldProps("role")}
                >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                </Select>
                {formik.touched.role && formik.errors.role ? (
                  <div className="error-message">{formik.errors.role}</div>
                ) : null}
              </FormControl>
            </Box>

            <Button fullWidth type="submit" variant="contained" color="success">
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
