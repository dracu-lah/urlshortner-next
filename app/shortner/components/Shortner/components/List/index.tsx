import { authClient } from "@/auth-client";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import api, { BASE_URL } from "@/config/axiosConfig";
import endPoints from "@/services/endPoints";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { DeleteDialog } from "./components/DeleteDialog";

type URLType = {
  _id: string;
  shortenedUrl: string;
  clicks: [];
};

const List = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
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
                <DeleteDialog id={url._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default List;
