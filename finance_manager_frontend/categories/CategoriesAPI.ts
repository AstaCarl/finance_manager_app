import { CategoryEntity } from "./CategoryEntity";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export class CategoriesAPI {
  static baseUrl = "http://192.168.0.19:3000/categories";
  
  
    static async getCategories() {
      try {
        const token = await SecureStore.getItemAsync("jwt");
        if (!token) {
          throw new Error("No token found");
        }
  
        console.log("Token:", token);
        console.log("Calling GET endpoint:", `${this.baseUrl}/user`);
  
        const response = await axios.get(`${this.baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Response data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
  
        // If the error is an Axios error, log the response
        if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response?.data);
        }
  
        // Rethrow the error to let useQuery handle it
        throw error;
      }
    }


  static async createCategory(category: CategoryEntity) {
    console.log("calling " + CategoriesAPI.baseUrl);
    const token = await SecureStore.getItemAsync("jwt");

    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      console.log("category log from api", category);
      console.log("token from api", token);

      const response = await fetch(CategoriesAPI.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async deleteCategory(id: number) {
    const token = await SecureStore.getItemAsync("jwt");
    console.log("token", token);
    console.log("id", id);
    if (!token) {
      throw new Error("No token found");
    }
    console.log("calling " + CategoriesAPI.baseUrl + "/" + id);

    const response = await axios.delete(this.baseUrl + "/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
