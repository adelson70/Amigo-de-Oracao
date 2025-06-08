import { redirect } from "react-router-dom";
import { Me } from "../../services/usuario";

export async function protectedLoader() {
  try {

    const user = await Me();

    if (!user) {
      return redirect("/login");
    }

    return user;

  } catch (error) {
    console.error("Error loading user:", error);
    return redirect("/login");
  }
}