"use client";
import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/shortner",
    });
    router.push("/shortner");
  };
  return (
    <div className="flex text-center px-2 min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="mt-20 md:mt-40">
        <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold  font-mono">
          Build Short Urls <span className="text-primary">Easily</span>!
        </h1>
        <Button
          className="mt-8 md:text-2xl md:py-8 md:px-10 font-semibold"
          onClick={() => signIn()}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
