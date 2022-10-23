import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// * Interfaces.
import RequestResponseInterface from "../../interfaces/RequestResponse.interface";
import RegisterDto from "../../interfaces/Register.dto";
import ErrorInterface from "../../interfaces/Error.interface";

// * Components.
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import DefaultHeader from "../../components/DefaultHeader/DefaultHeader";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

// * Data.
import { CITIES } from "../../data";

// * Config.
import { ENDPOINTS, FIELDS_LENGTH, REGEX } from "../../config";

// * Hooks.
import { useAuth } from "../../hooks/useAuth";

const Register: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.city) {
      navigate(`/projekty/${auth?.city}`);
    }
  }, []);

  const MAX_STEPS = 2;
  const [step, setStep] = useState<number>(1);
  const [city, setCity] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [agreeError, setAgreeError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  // * Switch views in the multi step form.
  const switchFormViews = (s: number): void => {
    if (step === 1 && s === -1) return;

    if (
      (formik.values.name === "" ||
        formik.values.surname === "" ||
        formik.values.email === "") &&
      step > 0
    )
      return;

    setStep(step + s);
  };

  let initialValues = {
    name: "",
    surname: "",
    email: "",
    city: "",
    pesel: "",
    phone: "",
    password: "",
    re_password: "",
  };

  const requiredMessage = "To pole jest wymagane.";
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(requiredMessage)
      .matches(new RegExp(REGEX.name), "Wpisana fraza nie jest imieniem."),

    surname: yup
      .string()
      .required(requiredMessage)
      .matches(new RegExp(REGEX.name), "Wpisana fraza nie jest nazwiskiem."),

    email: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS_LENGTH?.email.min,
        `E-mail powinien zawierać minimum ${FIELDS_LENGTH?.email.min} znaków`
      )
      .max(
        FIELDS_LENGTH?.email.max,
        `E-mail powinien zawierać maksymalnie ${FIELDS_LENGTH?.email.max} znaków`
      )
      .matches(new RegExp(REGEX?.email), "Wpisano nie poprawny e-mail"),

    pesel: yup
      .string()
      .required(requiredMessage)
      .min(11, "Podano nie poprawny numer pesel")
      .max(11, "Podano nie poprawny numer pesel")
      .matches(new RegExp(REGEX?.pesel), "Pesel jest nie poprawny"),

    phone: yup
      .string()
      .required(requiredMessage)
      .matches(
        new RegExp(REGEX?.phone),
        "Numer telefonu nie jest poprawny lub nie zgadza się z wytycznymi"
      ),

    password: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS_LENGTH?.password.min,
        `Hasło powinno zawierać minimum ${FIELDS_LENGTH?.password.min}, maksimum ${FIELDS_LENGTH?.password.max}, jedną wielką literę i jedną liczbę.`
      )
      .max(
        FIELDS_LENGTH?.password.max,
        `Hasło powinno zawierać minimum ${FIELDS_LENGTH?.password.min}, maksimum ${FIELDS_LENGTH?.password.max}, jedną wielką literę i jedną liczbę.`
      )
      .matches(
        new RegExp(REGEX.password),
        `Hasło powinno zawierać minimum ${FIELDS_LENGTH?.password.min}, maksimum ${FIELDS_LENGTH?.password.max}, jedną wielką literę i jedną liczbę.`
      ),

    re_password: yup
      .string()
      .required(requiredMessage)
      .when("password", {
        is: (val: string) => !!(val && val.length > 0),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Hasła nie są takie same"),
      }),
  });

  const onSubmit = async (values: RegisterDto): Promise<void> => {
    try {
      if (!agreed) {
        setAgreeError(true);
        return;
      }

      const postData = { ...values, city: city.toLowerCase() };
      delete postData.re_password;

      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS.REGISTER,
        postData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (data?.status) navigate("/logowanie");
    } catch (e) {
      console.log(e);
      setError({
        error: true,
        message: "Wystąpił błąd podczas rejestracji",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <section id="register">
      <div className="content f-column x-start y-center">
        {error.error && (
          <div className="flex y-center x-center" style={{ width: "100%" }}>
            <Popup title="Wystąpił błąd" message={error.message} />
          </div>
        )}

        <div className="content-header f-column y-start x-start">
          <DefaultHeader text="Rejestracja konta" />
          <div className="steps-wrapper flex">
            <span className="steps">
              Krok <span className="step">{step}</span> z{" "}
              <span className="step">{MAX_STEPS}</span>
            </span>
          </div>
        </div>

        <form
          id="register-form"
          className="f-column y-center x-start"
          data-view={step}
          onSubmit={formik.handleSubmit}
        >
          <div className="form-fields f-column y-center x-start">
            <div className="fields-row f-column y-center x-between">
              <Input
                name="name"
                label="Imię*"
                placeholder="Jan"
                type="text"
                onChange={formik.handleChange}
                error={formik.errors.name}
                value={formik.values.name}
              />

              <Input
                name="surname"
                label="Nazwisko*"
                placeholder="Kowalski"
                type="text"
                onChange={formik.handleChange}
                error={formik.errors.surname}
                value={formik.values.surname}
              />
            </div>

            <Input
              name="email"
              label="Adres e-mail*"
              placeholder="jankowalski@przyklad.com"
              type="text"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
            />

            <Select
              label="Miasto zamieszkania*"
              placeholder="Wybierz twoje miasto"
              values={CITIES}
              defaultValue={formik.values.city}
              setNewValue={setCity}
            />
          </div>

          <div className="form-fields view-2 f-column y-center x-start">
            <div className="fields-row f-column y-center x-between">
              <div className="fields-row f-column y-start x-between">
                <Input
                  name="pesel"
                  label="Pesel*"
                  placeholder="Twój numer pesel"
                  type="number"
                  onChange={formik.handleChange}
                  error={formik.errors.pesel}
                  value={formik.values.pesel}
                />

                <Input
                  name="phone"
                  label="Numer telefonu*"
                  placeholder="+48 123 456 789"
                  type="text"
                  onChange={formik.handleChange}
                  error={formik.errors.phone}
                  value={formik.values.phone}
                />
              </div>
            </div>

            <Input
              name="password"
              label="Hasło*"
              placeholder="Twoje hasło"
              type="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
              value={formik.values.password}
            />

            <Input
              name="re_password"
              label="Powtórz hasło*"
              placeholder="Powtórz twoje hasło"
              type="password"
              onChange={formik.handleChange}
              error={formik.errors.re_password}
              value={formik.values.re_password}
            />

            <Checkbox
              checked={agreed}
              setChecked={setAgreed}
              error={agreeError}
            >
              <span className="checkbox-children">
                Oświadczam, że mam przynajmniej 13 lat i zapoznałem/am się z{" "}
                <a href="/regulamin-uzytkowania">regulaminem</a> serwisu.*
              </span>
            </Checkbox>
          </div>

          <div className="form-submit-wrapper f-column y-center x-center">
            {step === 2 && (
              <span className="comeback" onClick={() => switchFormViews(-1)}>
                Wróć
              </span>
            )}

            {step === 1 ? (
              <Button
                type="button"
                text="Dalej"
                callback={() => switchFormViews(+1)}
              />
            ) : (
              <Button type="submit" text="Utwórz konto" />
            )}

            <small className="small-info">
              Masz już konto?{" "}
              <a href="/logowanie" className="small-link">
                Zaloguj się tutaj
              </a>
            </small>
          </div>
        </form>
      </div>
      <div className="map flex y-center x-center"></div>
    </section>
  );
};

export default Register;
