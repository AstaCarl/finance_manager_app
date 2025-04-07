import { CategoryEntity } from "./CategoryEntity";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


export class CategoriesAPI {
  static baseUrl = "http://10.59.169.159:3000/categories";

  static async getCategories() {
    const token = await SecureStore.getItemAsync("jwt");
    console.log("calling " + CategoriesAPI.baseUrl + "/user");

    const response = await axios.get<CategoryEntity[]>(this.baseUrl + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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
    console.log("calling " + CategoriesAPI.baseUrl + "/" + id);

    const response = await axios.delete(this.baseUrl + "/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

}
