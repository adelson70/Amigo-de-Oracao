import { redirect } from "react-router-dom";
import { Me } from "../../services/usuario";

export async function publicLoader() {
  try {

    const user = await Me();

    if (user) {
      return redirect("/dashboard");
    }

    return null

  } catch (error) {
    console.error("Error loading user:", error);
    return null
  }
}
