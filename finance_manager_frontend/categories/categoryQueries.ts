import { useQuery } from "@tanstack/react-query"
import { CategoriesAPI } from "./CategoriesAPI"
import { CategoryEntity } from "./CategoryEntity"
import { useMutation, useQueryClient } from "@tanstack/react-query" 


export const useGetCategories = () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        try {
          return await CategoriesAPI.getCategories();
        } catch (error) {
          console.error("useGetCategories error:", error);
          // Return an empty array if there's an error
          return [];
        }
      },
    });
  };


export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: CategoriesAPI.createCategory,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error) => {
            console.error("Error creating category:", error)
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: number) => {
        console.log("useDeleteCategory: Calling deleteCategory with ID:", id);
        return CategoriesAPI.deleteCategory(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (error) => {
        console.error("useDeleteCategory: Error deleting category:", error.message);
      },
    });
  };