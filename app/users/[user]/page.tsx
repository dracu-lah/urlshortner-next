"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.url(),
});

type FormType = z.infer<typeof formSchema>;

const UserPage = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = (data: FormType) => {
    console.log(data);
    toast.success(data.url + "Added");
    form.reset();
  };
  return (
    <div className="px-8 py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold">
          Welcome back&nbsp;
          <span className="text-primary font-semibold">Nevil</span>!
        </h1>
        <div className="mt-8 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Enter your URL."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      I'll Shorten it for you. Keep patience.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="mt-12 ">
          <Table>
            <TableCaption>A list of Shortened URLs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sl no</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>
                  <a
                    href="https://shortly.nevi.dev/asdfasdf"
                    target="_blank"
                    className="text-indigo-400"
                  >
                    https://shortly.nevi.dev/asdfasdf
                  </a>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
