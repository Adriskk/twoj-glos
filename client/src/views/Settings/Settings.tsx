import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// * Interfaces.
import ErrorInterface from "../../interfaces/Error.interface";
import UserSettingsInterface from "../../interfaces/UserSettings.interface";
import RequestResponseInterface from "../../interfaces/RequestResponse.interface";

// * Components.
import Button from "../../components/Button/Button";
import SettingsRow from "../../components/SettingsRow/SettingsRow";
import RadioInput from "../../components/RadioInput/RadioInput";
import Popup from "../../components/Popup/Popup";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";

// * Config.
import { ENDPOINTS } from "../../config";

// * Utils.
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

// * Hooks.
import { logout, useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

const Settings: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [theme, setNewTheme] = useTheme();

  const user_data_rows = [
    { label: "E-mail", value: auth?.email || "Brak" },
    { label: "Numer telefonu", value: auth?.phone || "Brak" },
    {
      label: "Wybrane miasto",
      value: capitalizeFirstLetter(auth?.city || "Brak"),
    },
  ];

  const [userSettings, setUserSettings] =
    useState<UserSettingsInterface | null>(null);

  const [userSettingsCopy, setUserSettingsCopy] =
    useState<UserSettingsInterface | null>(null);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (!auth) {
      navigate("/logowanie");
    }

    /* *
     * * Compare starting settings state with current
     * * and display save button, whether they've changed.
     * * */
    if (_.isEqual(userSettings, userSettingsCopy)) {
      setSettingsChanged(false);
      return;
    }

    setSettingsChanged(true);
  }, [userSettings]);

  useEffect(() => {
    const fetchData = async (): Promise<UserSettingsInterface> => {
      const { data } = await axios.get<UserSettingsInterface>(
        ENDPOINTS?.GET_SETTINGS.replace(":user-id", "" + (auth?.id || -1))
      );

      return data;
    };

    fetchData()
      .then((data: UserSettingsInterface) => {
        data.theme = data?.theme === null ? "light" : data?.theme;
        setUserSettings(data);
        setNewTheme(data.theme);

        // * Copying the starting state of the user settings.
        setUserSettingsCopy(Object.assign({}, data));

        setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message: "Podczas pobierania twoich ustawień wystąpił błąd.",
        });
      });
  }, []);

  // * Delete user account from database.
  const deleteAccount = (): void => {
    const deleteAccountAction = async (): Promise<RequestResponseInterface> => {
      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS?.DELETE_USER.replace(":user-id", "" + (auth?.id || -1))
      );

      return data;
    };

    setIsLoading(true);
    deleteAccountAction()
      .then((data: RequestResponseInterface) => {
        setIsLoading(false);
        if (data?.status === "Success") {
          logout();
          navigate("/rejestracja", { replace: true });
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message: "Podczas usuwania twojego konta wystąpił błąd.",
        });
      });
  };

  // * Change user theme setting.
  const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!userSettings || !event) return;

    setUserSettings({
      ...userSettings,
      theme: ["light", "dark"].includes(event?.target?.value)
        ? event?.target?.value
        : "light",
    });
  };

  // * Save user changes to database.
  const saveChanges = (): void => {
    const saveChangesAction = async (): Promise<RequestResponseInterface> => {
      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS?.SAVE_SETTINGS.replace(":user-id", "" + (auth?.id || -1)),
        userSettings,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      return data;
    };

    setIsLoading(true);
    saveChangesAction()
      .then((data: RequestResponseInterface) => {
        setIsLoading(false);
        if (data?.status === "success") navigate("/konto");
        setNewTheme(theme === "light" ? "dark" : "light");
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message: "Podczas zapisywania twoich ustawień wystąpił błąd.",
        });
      });
  };

  if (error.error) {
    return (
      <section className="flex y-center x-center">
        <Popup title="Wystąpił błąd" message={error.message} />
        <Loader size="big" />
      </section>
    );
  }

  return (
    <section id="settings">
      <div className="content f-column y-center x-start">
        <div className="settings-topbar flex y-center x-between">
          <span className="user-name-surname">
            {auth?.name} {auth?.surname}
          </span>
          <Button text="Wyloguj" type="button" callback={() => {}} />
        </div>

        {!isLoading ? (
          <div className="settings-content f-column y-start x-start">
            <div className="settings-user-data">
              {user_data_rows?.map((row, i) => (
                <SettingsRow
                  label={row.label}
                  value={row.value}
                  key={"row-" + i}
                />
              ))}

              <Button
                text="Usuń konto"
                callback={() => setIsModalOpened(true)}
                type="button"
              />

              <Modal
                title="Usuwanie konta"
                message="Czy napewno chcesz usunąć swoje konto? Tej operacji nie będzie można cofnąć."
                isOpened={isModalOpened}
                setIsOpened={setIsModalOpened}
              >
                <div className="modal-bottom-bar flex y-center x-center">
                  <Button
                    text="Anuluj"
                    type="button"
                    callback={() => setIsModalOpened(false)}
                  />
                  <Button text="Usuń" type="button" callback={deleteAccount} />
                </div>
              </Modal>
            </div>

            <div className="other-settings-content f-column y-start x-start">
              <div className="settings-block f-column y-start x-start">
                <span className="settings-block-header">Wygląd</span>
                <RadioInput
                  title="Zmień motyw"
                  name="theme"
                  onChange={onThemeChange}
                  inputs={[
                    {
                      label: "Jasny motyw",
                      value: "light",
                      checked: false,
                    },

                    {
                      label: "Ciemny motyw",
                      value: "dark",
                      checked: false,
                    },
                  ].map((input) => {
                    if (input.value !== userSettings?.theme) return input;
                    return { ...input, checked: true };
                  })}
                />
              </div>
            </div>
          </div>
        ) : (
          <Loader size="big" />
        )}
      </div>

      <div className="action-bar">
        <div className="comeback-btn">
          <Button text="Wróć" type="button" callback={() => navigate(-1)} />
        </div>

        <div className="save-changes-btn" data-show={settingsChanged}>
          <Button text="Zapisz" callback={saveChanges} type="button" />
        </div>
      </div>
    </section>
  );
};

export default Settings;
