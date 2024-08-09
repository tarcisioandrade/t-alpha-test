import { Constants } from "@/constants";
import SigninPage from "@/pages/signin";
import SignupPage from "@/pages/signup";
import { QueryClient, MutationCache, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Layout from "./ui/layout";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
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
            <Route path="/" element={<h1>oi</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
        <Toaster position="top-center" expand theme="light" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Providers;
