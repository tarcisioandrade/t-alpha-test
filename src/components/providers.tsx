import { Constants } from "@/constants";
import SigninPage from "@/pages/signin";
import SignupPage from "@/pages/signup";
import { QueryClient, MutationCache, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Layout from "./ui/layout";
import PrivateRoute from "./private-route";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/404";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message || Constants.DEFAULT_ERROR_MESSAGE);
      }
      toast.error(Constants.DEFAULT_ERROR_MESSAGE);
    },
  }),
});

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
        <Toaster position="top-center" expand theme="light" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Providers;
