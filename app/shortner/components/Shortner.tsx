import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LinkIcon, Loader2Icon, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import api, { BASE_URL } from "@/config/axiosConfig";
import endPoints from "@/services/endPoints";

const formSchema = z.object({
  url: z.url(),
  customShortenedUrl: z.string().optional(),
});
type URLType = {
  _id: string;
  shortenedUrl: string;
  clicks: [];
};
type FormType = z.infer<typeof formSchema>;
const Shortner = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const router = useRouter();
  const [custom, setCustom] = useState(false);
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: urls,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      try {
        const { data } = await api.get(endPoints.shortner, {
          params: { email: session?.user.email },
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !isLoading,
  });

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/");
    }
  }, [session, isLoading, router]);

  const createMutation = useMutation({
    mutationFn: async (params: Record<any, any>) => {
      try {
        const { data } = await api.post(endPoints.shortner, params);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Added");
      queryClient.refetchQueries({ queryKey: ["urls"] });
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const { data } = await api.delete(`${endPoints.shortner}/${id}`);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.error("Deleted");
      queryClient.refetchQueries({ queryKey: ["urls"] });
    },
  });
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      customShortenedUrl: "",
    },
  });
  const onSubmit = (data: FormType) => {
    createMutation.mutate({
      ...data,
      email: session?.user.email,
    });
  };

  if (isPending || isLoading)
    return (
      <div className="min-h-[80vh] justify-center flex items-center w-full">
        <div>
          <Loader2Icon className="animate-spin size-12 text-primary" />
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
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
          <div className="mt-8 ">
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-2">
                  <FormField
                    disabled={createMutation.isPending}
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Trust me bro i'll make your url shorter!"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {custom && (
                    <FormField
                      disabled={createMutation.isPending}
                      control={form.control}
                      name="customShortenedUrl"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              placeholder="Want to add your own short string?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex justify-center md:justify-end gap-2">
                  <Button
                    type="button"
                    onClick={() => setCustom((prev) => !prev)}
                  >
                    <Settings2Icon />
                    <span>{custom ? "Don't Customize" : "Customize"}</span>
                  </Button>
                  <Button disabled={createMutation.isPending}>
                    <LinkIcon />
                    <span>Make it short</span>
                  </Button>
                </div>
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
                {urls.data.map((url: URLType, key: number) => (
                  <TableRow key={url._id}>
                    <TableCell className="font-medium">{key + 1}</TableCell>
                    <TableCell>
                      <a
                        href={`${BASE_URL}/${url.shortenedUrl}`}
                        target="_blank"
                        className="text-indigo-400"
                      >
                        {BASE_URL}/{url.shortenedUrl}
                      </a>
                    </TableCell>
                    <TableCell>{url.clicks.length}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        disabled={deleteMutation.isPending}
                        variant="destructive"
                        onClick={() => deleteMutation.mutate({ id: url._id })}
                      >
                        {deleteMutation.isPending ? "Deleting" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shortner;
