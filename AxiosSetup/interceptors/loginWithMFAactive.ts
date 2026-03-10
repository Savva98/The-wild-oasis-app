import { AxiosError, AxiosResponse } from "axios";
import { logOut } from "../logoutFunction";
import { RedirectToLogin } from "../RedirectToLogin";
import { ApiError } from "../../types/types";
import { RedirectToCheckMFACode } from "../RedirectToCheckMFACode";

class LoginwithMFAactive {
  onResponse = (response: AxiosResponse) => {
    if (response.data?.sessionId) {
      sessionStorage.setItem("sessionId", response.data.sessionId);
      console.log(response.data?.sessionId);
    }
    setTimeout(
      () => {
        sessionStorage.removeItem("sessionId");
      },
      10 * 60 * 1000,
    ); // Clear sessionId after 10 minutes
    RedirectToCheckMFACode();
    return response;
  };
  onRejected = async (error: AxiosError) => {
    if (
      (error.response?.data as ApiError).message.includes("Session has expired")
    ) {
      await logOut();
      RedirectToLogin();
      return Promise.reject(error);
    } else if (
      (error.response?.data as ApiError).message.includes("Invalid session")
    ) {
      await logOut();
      RedirectToLogin();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  };
}

export const loginWithMFAactive = new LoginwithMFAactive();
