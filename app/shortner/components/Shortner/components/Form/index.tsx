import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/config/axiosConfig";
import endPoints from "@/services/endPoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings2Icon, LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { formSchema, FormType } from "./formSchema";
import { authClient } from "@/auth-client";
import { useState } from "react";

const ShortnerForm = () => {
  const queryClient = useQueryClient();
  const { data: session, isPending: isLoading } = authClient.useSession();

  const [custom, setCustom] = useState(false);
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
  return (
    <div className="mt-8 ">
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button type="button" onClick={() => setCustom((prev) => !prev)}>
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
  );
};

export default ShortnerForm;
