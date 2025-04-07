import { EntryEntity } from "./EntryEntity";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


export class EntriesAPI {
  static baseUrl = "http://10.59.169.159:3000/entries";

  static async getEntries() {
    const token = await SecureStore.getItemAsync("jwt");
    console.log("calling " + EntriesAPI.baseUrl + "/user");

    const response = await axios.get<EntryEntity[]>(this.baseUrl + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async createEntry(entry: EntryEntity) {
    console.log("calling " + EntriesAPI.baseUrl);
    const token = await SecureStore.getItemAsync("jwt");

    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      console.log("token from api", token);

      const response = await fetch(EntriesAPI.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
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

  static async deleteEntry(id: number) {
    const token = await SecureStore.getItemAsync("jwt");
    console.log("calling " + EntriesAPI.baseUrl + "/" + id);

    const response = await axios.delete(this.baseUrl + "/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

}
