import axios from "axios";
import { UserProfile, UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:8080/api/auth";

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization if necessary (for example, for a JWT in the header)
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the response JSON
    const result = await response.json();
    console.log(result);
    return result; // Return the result (like the token and user data)
  } catch (error) {
    // Handle errors, e.g., log or display a message
    console.error(error);
    throw error; // Propagate the error to be handled by the calling function
  }
};

  
export const registerAPI = async (email: string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/register", {
            email: email,
            username: username,
            password: password,
        }); 
        console.log(data);
        return data;
    } catch (error) {
        handleError(error);
    }    
}

export const homePageAPI = async () =>  {
    try {
      const response = await fetch(`http://localhost:8080/api/user/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
  
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
      console.log(result);
      return result; // Return the result (like the token and user data)
    } catch (error) {
      // Handle errors, e.g., log or display a message
      console.error(error);
      throw error; // Propagate the error to be handled by the calling function
    }
  };