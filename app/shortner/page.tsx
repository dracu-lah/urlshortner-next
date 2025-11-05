"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Everything from "./components/Everything";

const queryClient = new QueryClient();
const UserPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Everything />
    </QueryClientProvider>
  );
};

export default UserPage;
