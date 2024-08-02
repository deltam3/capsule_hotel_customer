import { Database } from "@/database.types";
import { supabase } from "./supabase";

type CapsuleType = Database["public"]["Tables"]["capsules"]["Row"];

export async function getCapsules(): Promise<CapsuleType[]> {
  const { data, error } = await supabase
    .from<CapsuleType>("capsules")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Failed to load capsules");
  }

  return data as CapsuleType[];
}
