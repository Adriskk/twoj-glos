import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

// * Interfaces.
import LoginDto from "../../interfaces/Login.dto";
import ErrorInterface from "../../interfaces/Error.interface";
import LoginResponseInterface from "../../interfaces/LoginResponse.interface";

// * Components.
import DefaultHeader from "../../components/DefaultHeader/DefaultHeader";
import Popup from "../../components/Popup/Popup";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

// * Config.
import { COOKIES, ENDPOINTS, FIELDS_LENGTH, REGEX } from "../../config";

// * Hooks.
import { useAuth } from "../../hooks/useAuth";

const Login: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (auth?.city) {
      navigate(`/projekty/${auth?.city}`);
    }
  }, []);

  const initialValues = {
    login: "",
    password: "",
  };

  const requiredMessage = "To pole jest wymagane.";
  const schema = yup.object().shape({
    login: yup
      .string()
      .required(requiredMessage)
      .min(FIELDS_LENGTH?.login.min, `Login nie poprawny.`)
      .max(FIELDS_LENGTH?.login.max, `Login nie poprawny.`)
      .matches(new RegExp(REGEX.login), "Login nie poprawny"),

    password: yup
      .string()
      .required(requiredMessage)
      .min(FIELDS_LENGTH?.password.min, `Hasło nie poprawne.`)
      .max(FIELDS_LENGTH?.password.max, `Hasło nie poprawne.`)
      .matches(new RegExp(REGEX.password), "Hasło nie poprawne"),
  });

  const onSubmit = async (values: LoginDto): Promise<void> => {
    setError({ error: false, message: error.message });

    try {
      const { data } = await axios.post<LoginResponseInterface>(
        ENDPOINTS.LOGIN,
        values,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (!data) {
        setError({
          error: true,
          message: "Wystąpił nie oczekiwany błąd podczas logowania.",
        });

        return;
      }

      Cookie.set(COOKIES?.USER_COOKIE, JSON.stringify(data));
      navigate(`/projekty/${data?.city}`);
    } catch (e) {
      setError({
        error: true,
        message: "Dane logowania są nie poprawne.",
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: onSubmit,
  });

  return (
    <section id="login" className="f-column y-center x-center">
      {error.error && (
        <div className="flex y-center x-center" style={{ width: "100%" }}>
          <Popup title="Wystąpił błąd" message={error.message} />
        </div>
      )}

      <div className="content f-column y-center x-start">
        <DefaultHeader text="Logowanie" />

        <form id="login-form" onSubmit={formik.handleSubmit}>
          <div className="form-fields f-column y-center x-start">
            <Input
              name="login"
              type="text"
              label="E-mail/Numer Telefonu"
              placeholder="jankowalski@gmail.com"
              value={formik.values.login}
              error={formik.errors.login}
              onChange={formik.handleChange}
            />

            <Input
              name="password"
              type="password"
              label="Hasło"
              placeholder="Twoje hasło"
              smallText="Zapomniałem/am hasła"
              smallHref="/odzyskiwanie-hasla"
              value={formik.values.password}
              error={formik.errors.password}
              onChange={formik.handleChange}
            />

            <div className="form-submit-wrapper f-column y-center x-center">
              <Button type="submit" text="Zaloguj się" />

              <small className="small-info">
                Nie masz jeszcze konta?{" "}
                <a href="/rejestracja" className="small-link">
                  Utwórz je tutaj
                </a>
              </small>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
