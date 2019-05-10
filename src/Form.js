import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CitySearch from "./CitySearch";
import * as Yup from "yup";
import creditcard from "card-validator";

import styles from "./Form.module.css";

const Schema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  country: Yup.string()
    .uppercase()
    .length(2)
    .required("Required"),
  city: Yup.string().required("Required"),
  // shippingCost: Yup.string().required('Required'),
  cardName: Yup.string().required("Required"),
  cardNumber: Yup.string()
    .test(
      "test-number", // this is used internally by yup
      "Credit Card number is invalid", //validation message
      value => creditcard.number(value).isValid
    ) // return true false based on validation
    .required(),
  cvv: Yup.string()
    .test(
      "test-cvv", // this is used internally by yup
      "Credit Card CVV is invalid", //validation message
      value => creditcard.cvv(value).isValid
    ) // return true false based on validation
    .required(),
  agree: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions")
});

export default function({ submit }) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        address: "",
        country: "DE",
        city: "",
        cardName: "",
        cardNumber: "",
        cvv: "",
        agree: false
      }}
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        console.log(values);
        submit();
      }}
      render={props => (
        <Form>
          <ul className={styles.flexOuter}>
            <header>
              <h2>Personal Information</h2>
            </header>
            <li>
              <label>First Name:</label>
              <Field placeholder="First Name" name="firstName" />
              <ErrorMessage component={StyledError} name="firstName" />
            </li>
            <li>
              <label>Surname:</label>
              <Field placeholder="Last Name" name="lastName" />
              <ErrorMessage component={StyledError} name="lastName" />
            </li>
            <header>
              <h2>Shipping Information</h2>
            </header>
            <li>
              <label>Address:</label>
              <Field
                component="textarea"
                placeholder="Address"
                name="address"
              />
              <ErrorMessage component={StyledError} name="address" />
            </li>
            <li>
              <label>Shipping Information:</label>
              <Field component="select" name="country">
                <option value="DE">Germany</option>
                <option value="AT">Austria</option>
                <option value="ES">Spain</option>
                <option value="FR">France</option>
                <option value="UK">UK</option>
              </Field>

              <CitySearch
                countryCode={props.values.country}
                onChange={city => props.setFieldValue("city", city)}
              />
              <ErrorMessage component={StyledError} name="city" />
            </li>
            <li>
              <label>Shipping costs</label>
              <div className={styles.shippingCostAmount}>
                {shippingCosts[props.values.country]}
              </div>
            </li>
            <header>
              <h2>Payment Method</h2>
            </header>
            <li>
              <label>Payment method:</label>
              <ul>
                <li>
                  <Field
                    placeholder="Card name"
                    name="cardName"
                    style={{ marginLeft: "-40px", width: "36.2rem" }}
                  />
                  <ErrorMessage component={StyledError} name="cardName" />
                </li>
                <li>
                  <Field
                    placeholder="Card number"
                    name="cardNumber"
                    style={{
                      marginLeft: "-40px",
                      marginTop: "20px",
                      width: "31.53rem"
                    }}
                  />
                  <Field
                    placeholder="CVV"
                    name="cvv"
                    style={{
                      marginLeft: "10px",
                      marginTop: "20px",
                      width: "4rem"
                    }}
                  />
                </li>
                <li>
                  <ErrorMessage component={StyledError} name="cardNumber" />
                  <ErrorMessage component={StyledError} name="cvv" />
                </li>
              </ul>
            </li>
            <li style={{ alignItems: "normal" }}>
              <p>Agree terms and conditions</p>
              <ul>
                <li>
                  <Field name="agree" type="checkbox" className={styles.checkmark} />
                  <ErrorMessage component={StyledError} name="agree" />
                </li>
              </ul>
            </li>
            <li>
              <button type="submit">Send</button>
            </li>
          </ul>
        </Form>
      )}
    />
  );
}

const shippingCosts = {
  DE: "2,50€",
  AT: "3,00€",
  ES: "5,45€",
  FR: "2,00€",
  UK: "2,75GBP"
};

function StyledError({ children }) {
  return <div className={styles.errorMessage}>{children}</div>;
}
