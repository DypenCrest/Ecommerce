import * as Yup from "yup";

//Product Validation
export const validateProduct = Yup.object({
  name: Yup.string()
    .required("Product Name is required")
    .min(2, "must be atleast 2 characters")
    .max(100, "must be 100 characters or less")
    .trim(),
  company: Yup.string()
    .required("Product Brand is required")
    .min(2, "must be atleast 2 characters")
    .max(55, "must be 55 characters or less")
    .trim(),
  price: Yup.number().required("Product Price is required").min(0),
  category: Yup.string()
    .required("Product Category is required")
    .oneOf(
      [
        "grocery",
        "tools",
        "clothing",
        "electronics",
        "furniture",
        "bakery",
        "liquor",
        "sports",
        "accessories",
        "Reading",
      ],
      "Invalid category" // Checks if the value is one of the specified options
    )
    .trim(),
  quantity: Yup.number().required("Product Quantity is required").min(0),
  freeShipping: Yup.bool().required().default(false),
  description: Yup.string()
    .required("Product Description is required")
    .min(200, "must be atleast 200 characters")
    .max(1000, "must be 1000 or less characters"),
});

//Register Validation
export const validateRegister = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  firstName: Yup.string()
    .max(55, "Must be 55 characters or less")
    .min(2, "Must be 2 characters or more")
    .required("First name is required")
    .trim(),
  lastName: Yup.string()
    .max(55, "Must be 55 characters or less")
    .min(2, "Must be 2 characters or more")
    .required("Last name is required")
    .trim(),
  password: Yup.string().required("Password is required"), //TODO:"pattern"
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),

  gender: Yup.string()
    .required("Gender is  required")
    .oneOf(["male", "female", "preferNotToSay"]),
  location: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(55, "Must be 55 characters or less")
    .required("Location is required"),

  role: Yup.string().required("Role is required").oneOf(["buyer", "seller"]),
});

//Login Validation
const validateLogin = Yup.object({
  email: Yup.string()
    .email("Invalid Email!")
    .required("Email is required!")
    .trim(),

  password: Yup.string().required("Password is required!"),
});

export default validateLogin;
