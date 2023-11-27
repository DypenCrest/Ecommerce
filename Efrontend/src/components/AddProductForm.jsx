import { Formik } from "formik";
import React from "react";
import { validateProduct } from "./validations";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";
import {productCategories} from "../constants/productCategories";

const AddProductForm = () => {
  const initialValues = {
    name: "",
    company: "",
    price: "",
    category: "",
    quantity: "",
    freeShipping: "",
    description: "",
  };
  const navigate = useNavigate;

  const { mutate } = useMutation({
    mutationKey: "addProduct",
    mutationFn: async (values) => {
      await $axios.post("/product/add", values);
    },
    onSuccess: (res) => {
      navigate("/product");
    },
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateProduct}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form className="form-center" onSubmit={formik.handleSubmit}>
            <TextField
              size="small"
              label="Name"
              className="field-control"
              {...formik.getFieldProps("name")}
              helperText={
                formik.touched.name && formik.errors.name ? (
                  <div className="error-message">{formik.errors.name}</div>
                ) : null
              }
            />

            <TextField
              size="small"
              label="Brand"
              className="field-control"
              {...formik.getFieldProps("company")}
              helperText={
                formik.touched.company && formik.errors.company ? (
                  <div className="error-message">{formik.errors.company}</div>
                ) : null
              }
            />

            <TextField
              size="small"
              label="Price"
              type="number"
              className="field-control"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error-message">{formik.errors.price}</div>
            ) : null}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                variant="filled"
                {...formik.getFieldProps("category")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {productCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Quantity"
              className="field-control"
              {...formik.getFieldProps("quantity")}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="error-message">{formik.errors.quantity}</div>
            ) : null}

            <TextareaAutosize
              size="small"
              label="Description"
              placeholder="Description"
              {...formik.getFieldProps("description")}
              className="field-control"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error-message">{formik.errors.description}</div>
            ) : null}

            <Button fullWidth type="submit" variant="contained" color="success">
              Add
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddProductForm;
