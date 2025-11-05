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
    <div className="flex text-center min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1 className="text-2xl md:text-4xl">Build ShortUrls Easily</h1>
        <p className="text-sm opacity-80">
          Random Description That Nobody Reads
        </p>
        <Button className="mt-4" onClick={() => signIn()}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
