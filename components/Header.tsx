"use client";
import { Button } from "@/components//ui/button";

import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const router = useRouter();

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/shortner",
    });
    router.push("/shortner");
  };
  const signOut = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-2xl text-primary">Shortly</div>

      <div>
        {session ? (
          <div className="flex gap-2 justify-center items-center">
            <div className="size-10 rounded-full overflow-hidden border-2 border-primary">
              <Image
                width={120}
                height={120}
                src={session?.user.image || ""}
                className="object-cover"
                alt="avatar"
              />
            </div>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
