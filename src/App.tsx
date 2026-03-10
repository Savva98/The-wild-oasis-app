import {
  // BrowserRouter,
  Navigate,
  // Route,
  RouterProvider,
  // Routes,
  createBrowserRouter,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Booking from "../pages/Booking";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Checkin from "../pages/Checkin";
import Forbiden from "../pages/Forbiden";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import MFAInputPage from "../pages/MFAInputPage";
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
const router = createBrowserRouter([
  {
    element: <Applaout />,
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "bookings", element: <Bookings /> },
      { path: "bookings/:bookingId", element: <Booking /> },
      { path: "checkin/:bookingId", element: <Checkin /> },
      { path: "cabins", element: <Cabins /> },
      { path: "settings", element: <Settings /> },
      { path: "account", element: <Account /> },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "forbidden",
    element: <Forbiden />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "check-mfa-code",
    element: <MFAInputPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route element={<Applaout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="forbidden" element={<Forbiden />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="check-mfa-code" element={<MFAInputPage />} />
        </Routes>
      </BrowserRouter> */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-gey-700)",
            fontSize: "16px",
            fontFamily: "var(--font-family-default)",
            maxWidth: "400px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
