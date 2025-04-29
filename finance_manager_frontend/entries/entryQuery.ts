import { useQuery } from "@tanstack/react-query"
import { EntryEntity } from "./EntryEntity"
import { EntriesAPI } from "./EntriesAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query" 


export const useGetEntries = () => {
    return useQuery({
      queryKey: ["entries"],
      queryFn: async () => {
        try {
          return await EntriesAPI.getEntries();
        } catch (error) {
          console.error("useGetEntries error:", error);
          // Return an empty array if there's an error
          return [];
        }
      },
    });
  };


export const useCreateEntry = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EntriesAPI.createEntry,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['entries'] })
        },
        onError: (error) => {
            console.error("Error creating entry:", error)
        }
    })
}

export const useDeleteEntry = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: number) => {
        console.log("useDeleteEntry: Calling deleteEntry with ID:", id);
        return EntriesAPI.deleteEntry(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['entries'] });
      },
      onError: (error) => {
        console.error("useDeleteEntry: Error deleting entry:", error.message);
      },
    });
  };