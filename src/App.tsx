import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Forbiden from "../pages/Forbiden";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Applaout from "../ui/Applaout";
import ProtectedRoute from "../routes/ProtectedRoute";
import GlobalStyles from "../styles/GlodalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  const isAuthenticated = false; // Replace with actual authentication logic
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Applaout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route
              path="users"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["admin"]}
                  userRole=""
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="forbidden" element={<Forbiden />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            backgroundColor: "var(--color-grey-900)",
            color: "var(--color-white)",
            fontSize: "1.4rem",
            fontFamily: "var(--font-family-default)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
