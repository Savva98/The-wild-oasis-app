import { useNavigate } from "react-router";

export function RedirectToLogin() {
  const navigate = useNavigate();
  navigate("/login", { replace: true });
}
