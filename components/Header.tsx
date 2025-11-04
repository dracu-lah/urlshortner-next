import { Button } from "@/components//ui/button";

const Header = () => {
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div>URL Shortner</div>

      <Button>Login</Button>
    </div>
  );
};

export default Header;
