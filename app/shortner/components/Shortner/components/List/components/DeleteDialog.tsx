import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/config/axiosConfig";
import endPoints from "@/services/endPoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

export function DeleteDialog({ id }: { id: string }) {
  const queryClient = useQueryClient();
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 duration-300 hover:bg-red-600">
          <TrashIcon className="text-slate-200" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white duration-300 hover:bg-red-600"
            onClick={() => deleteMutation.mutate({ id })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
