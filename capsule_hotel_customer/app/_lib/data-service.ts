import { Database } from "@/database.types";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

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

type GetCapSuleType = Database["public"]["Tables"]["capsules"]["Row"]["id"];

export async function getCapsule(id: GetCapSuleType) {
  const { data, error } = await supabase
    .from("capsules")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
