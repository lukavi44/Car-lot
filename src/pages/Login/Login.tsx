import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { LoginRequestBody } from "../../models/LoginRequest.model";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import LoginRequest from "../../services/Auth.services";
import { toast } from "react-toastify";

interface LoginProps {
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

const Login = ({ setAccessToken }: LoginProps) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(true);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigateTo = useNavigate();

  const getIsFieldValid = (term: string) => {
    return term.trim() !== "";
  };

  const getIsFormValid = () => {
    return getIsFieldValid(enteredUsername) && getIsFieldValid(enteredPassword);
  };

  const handleUsernameChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    setEnteredUsername(currentTarget.value.trim());
  };

  const handlePasswordChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>) => {
    setEnteredPassword(currentTarget.value.trim());
  };

  const formSubmissionHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!getIsFormValid()) {
      setEnteredUsernameIsValid(getIsFieldValid(enteredUsername));
      setEnteredPasswordIsValid(getIsFieldValid(enteredPassword));
      return;
    }
    const formData: LoginRequestBody = {
      data: {
        username: enteredUsername,
        password: enteredPassword,
      },
    };

    try {
      const response = LoginRequest(formData);
      const token = (await response).headers.get("Auth-Access-Token");

      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", enteredUsername);
        navigateTo("/");
        setAccessToken(token);
        toast.success(`Welcome ${enteredUsername}`);
      }
    } catch (error) {
      setInvalidCredentials(true);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles["form"]} onSubmit={formSubmissionHandler}>
        <div
          className={`${styles["form-group"]} ${
            enteredUsernameIsValid ? "" : styles.invalid
          } `}
        >
          <label htmlFor="username">
            {!enteredUsernameIsValid ? "Please enter username" : "Username"}
          </label>
          <input
            type="username"
            id="username"
            value={enteredUsername}
            onChange={handleUsernameChange}
            onBlur={() =>
              setEnteredUsernameIsValid(getIsFieldValid(enteredUsername))
            }
            onFocus={() => setEnteredUsernameIsValid(true)}
          />
        </div>
        <div
          className={`${styles["form-group"]} ${
            enteredPasswordIsValid ? "" : styles.invalid
          } `}
        >
          <label htmlFor="password">
            {!enteredPasswordIsValid ? "Please enter password" : "Password"}
          </label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={handlePasswordChange}
            onBlur={() =>
              setEnteredPasswordIsValid(getIsFieldValid(enteredPassword))
            }
            onFocus={() => setEnteredPasswordIsValid(true)}
          />
        </div>
        <div className={styles["form-group"]}>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
        {invalidCredentials && (
          <div
            className={invalidCredentials ? styles["invalid-credentials"] : ""}
          >
            <p>User is not found</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
