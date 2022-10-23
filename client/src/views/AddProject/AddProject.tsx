import React, { FC, useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// * Interfaces.
import RequestResponseInterface from "../../interfaces/RequestResponse.interface";
import AddProjectDto from "../../interfaces/AddProject.dto";
import ErrorInterface from "../../interfaces/Error.interface";

// * Components.
import DefaultHeader from "../../components/DefaultHeader/DefaultHeader";
import Popup from "../../components/Popup/Popup";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import SearchMapModal from "../../components/SearchMapModal/SearchMapModal";

// * Config.
import { ENDPOINTS, FIELDS_LENGTH, PROJECT_SIZES } from "../../config";

// * Hooks.
import { useAuth } from "../../hooks/useAuth";

const AddProject: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.city) {
      navigate(`/projekty/${auth?.city}`);
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [localization, setLocalization] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 52.237049,
    lng: 21.017532,
  });

  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  const initialValues = {
    title: "",
    description: "",
    cost: 0,
    project_size: "",
    additional_information: "",
    city: auth?.city || "",
    name: `${auth?.name || ""} ${auth?.surname || ""}`,
    userId: auth?.id || -1,
  };

  const requiredMessage = "To pole jest wymagane.";
  const schema = yup.object().shape({
    title: yup
      .string()
      .required(requiredMessage)
      .min(FIELDS_LENGTH?.title.min, `Tytuł jest za krótki`)
      .max(FIELDS_LENGTH?.title.max, `Tytuł jest za długi`),

    description: yup
      .string()
      .required(requiredMessage)
      .min(FIELDS_LENGTH?.description.min, `Opis jest za krótki`)
      .max(FIELDS_LENGTH?.description.max, `Opis jest za długi`),

    additional_information: yup
      .string()
      .required(requiredMessage)
      .min(
        FIELDS_LENGTH?.additional_information.min,
        `Dodatkowe informacje są za krótkie`
      )
      .max(
        FIELDS_LENGTH?.additional_information.max,
        `Dodatkowe informacje są za długie`
      ),

    cost: yup
      .number()
      .required(requiredMessage)
      .min(FIELDS_LENGTH?.cost.min, `Przewidywany budżet jest nie prawidłowy`),
  });

  /**
   * * Determine project size using passed budget.
   *
   * * Firstly it was planned to fill
   * * this field by the gov of the city itself,
   * * but there's no time for that.
   * */
  const getProjectSize = (cost: number): string => {
    return PROJECT_SIZES.filter(
      // * Added -1 price handle.
      (project) => {
        let max = !project.max ? true : cost <= project?.max;
        return cost >= project?.min && max;
      }
    )[0].size;
  };

  const onSubmit = async (values: AddProjectDto): Promise<void> => {
    try {
      values.coords = coords;
      values.localization = localization;
      values.project_size = getProjectSize(values.cost);

      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS.CREATE_PROJECT,
        values,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (data?.status) navigate("/konto/");
    } catch (e) {
      setError({
        error: true,
        message:
          "Podczas wysyłania twojego zgłoszenia projektu wystapił nieoczekiwany błąd.",
      });
    }
  };

  // * Show map modal.
  const showMap = () => {
    setIsModalOpened(true);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <section id="add-project">
      {error.error && (
        <div className="flex y-center x-center" style={{ width: "100%" }}>
          <Popup title="Wystąpił błąd" message={error.message} />
        </div>
      )}

      {isModalOpened && (
        <SearchMapModal
          coords={coords}
          setCoords={setCoords}
          setIsOpen={setIsModalOpened}
          setLocalization={setLocalization}
        />
      )}

      <div className="content">
        <div className="text-content f-column y-start x-start">
          <DefaultHeader text="Zaproponuj projekt" />
          <p className="description">
            Wypełnij formularz wysyłający propozycję wykorzystania budżetu
            obywatelskiego twojego miasta. Wypełnij wszystkie pola i wyślij
            zgłoszenie. Gdy Twoje zgłoszenie zostanie zatwierdzone przez rząd,
            powiadomimy Cię o tym.
          </p>
        </div>

        <form
          id="add-project-form"
          className="f-column y-center x-start"
          onSubmit={formik.handleSubmit}
        >
          <Input
            name="title"
            type="text"
            label="Tytuł projektu"
            placeholder="Boisko do koszykówki..."
            value={formik.values.title}
            error={formik.errors.title}
            onChange={formik.handleChange}
          />

          <Textarea
            label="Długi opis projektu"
            placeholder="Projekt zakłada wybudowanie zespołu boisk..."
            name="description"
            value={formik.values.description}
            error={formik.errors.description}
            onChange={formik.handleChange}
          />

          <Input
            name="cost"
            type="number"
            label="Przewidywany budżet projektu"
            placeholder="1 500 000 PLN"
            value={formik.values.cost}
            error={formik.errors.cost}
            onChange={formik.handleChange}
          />

          <Input
            name="additional_information"
            type="text"
            label="Dodatkowe informacje"
            placeholder="Budżet wyliczony według..."
            value={formik.values.additional_information}
            error={formik.errors.additional_information}
            onChange={formik.handleChange}
          />

          <Button text="Wybierz lokalizację" type="button" callback={showMap} />
          <Button text="Wyślij" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default AddProject;
