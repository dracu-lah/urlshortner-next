import { Button } from "@/components//ui/button";

const Header = () => {
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-2xl text-primary">Shortly</div>

      <Button>Login</Button>
    </div>
  );
};

export default Header;
