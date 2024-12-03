'use server';

import { signIn, signOut } from "@/auth";


export async function googleSignIn() {
  return await signIn("google");
}

export async function credentialsSignIn(formData) {
  return await signIn("credentials", formData)
}

export async function googleSignUp(user) {
  try {

    const response = await fetch(`${process.env.BACKEND_URL}/api/googleSignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });


    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result?.user;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const errorJson = await response.json();
        console.error("Error JSON:", errorJson);
        throw new Error(errorJson?.error || "API request failed");
      } else {
        const errorText = await response.text();
        console.error("Non-JSON error response:", errorText);
        throw new Error("Unexpected response format");
      }
    }

  } catch (error) {
    console.log('googleSignUp: ', error)
  } finally {

  }
}

export async function credentialsSignInHelper(credentials) {

  const { phone, password } = credentials;

  // Send data to the backend
  const response = await fetch(`${process.env.BACKEND_URL}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, password }),
  });


  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result?.user;
  } else {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const errorJson = await response.json();
      console.error("Error JSON:", errorJson);
      throw new Error(errorJson?.error || "API request failed");
    } else {
      const errorText = await response.text();
      console.error("Non-JSON error response:", errorText);
      throw new Error("Unexpected response format");
    }
  }


}



export async function handleSignOut() {
  return await signOut();
}