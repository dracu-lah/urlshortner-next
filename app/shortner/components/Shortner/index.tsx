import { useEffect } from "react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import ShortnerForm from "./components/Form";
import { Loader2Icon } from "lucide-react";
import List from "./components/List";

const Shortner = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] justify-center flex items-center w-full">
        <div>
          <Loader2Icon className="animate-spin size-12 text-primary" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl pt-4 text-center md:text-left md:text-4xl font-semibold">
            Welcome back&nbsp;
            <span className="text-primary font-semibold">
              {session?.user.name}
            </span>
            !
          </h1>
          <ShortnerForm />
          <List />
        </div>
      </div>
    </div>
  );
};

export default Shortner;
