import { LoginRequestBody } from "../models/LoginRequest.model";

export interface LoginResponse {
  errors: string | null;
  status: boolean;
}

const LoginRequest = async (body: LoginRequestBody) => {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
};

export default LoginRequest;
