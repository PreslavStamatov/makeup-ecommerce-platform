import { useAuth } from "../Context/useAuth";
import { Product } from "../Models/HomePage";
import { UserProfile, UserProfileToken } from "../Models/User";

const api = "http://localhost:8080/api/makeup";

export const productsAPI = async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${api}/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const postReviewAPI = async(rating: number | null, review: string, productName: string) => {
  const reviewDetails = {
    makeupName: productName,
    commentText: review,
    rating
  }
  try {
    const response = await fetch(`${api}/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(reviewDetails),
    })
    if (!response.ok) {
      throw new Error(`Failed to post review: ${response.statusText}`);
    }

    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSpecificProduct = async (productName: string): Promise<Product> => {
  try {
    const response = await fetch(`${api}/getSpecificProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({productName}),
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}