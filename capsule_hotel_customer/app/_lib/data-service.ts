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

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("나라들을 가져오지 못했습니다.");
  }
}

export async function getReservedDatesByCapsuleId(capsuleId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("capsuleId", capsuleId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Couldn't load the reservations");
  }

  const reservedDates = data
    .map((reservation) => {
      return eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
    })
    .flat();

  return reservedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}
