"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shortner from "./components/Shortner";

const queryClient = new QueryClient();
const UserPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Shortner />
    </QueryClientProvider>
  );
};

export default UserPage;
