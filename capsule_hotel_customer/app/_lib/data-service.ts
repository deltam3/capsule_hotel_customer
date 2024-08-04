import { Database } from "@/database.types";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";

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

type newCustomerType = Database["public"]["Tables"]["customers"]["Row"];

interface CreateCustomerProps {
  email: string;
  fullName: string;
}

export async function createCustomer(newCustomer: CreateCustomerProps) {
  // export async function createCustomer({ email, fullName }: CreateCustomerProps) {
  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer]);

  if (error) {
    console.error(error);
    console.log("CREATE CUSTOMER ERROR");

    throw new Error("Customer could not be created");
  }

  console.log("CREATE CUSTOMER RETURN");

  return data;
}
type GetCustomerProps = {
  email: string;
};

export async function getCustomer(email: GetCustomerProps) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getReservations(customerId) {
  const { data, error, count } = await supabase
    .from("reservations")
    .select(
      "id, created_at, startDate, endDate, numNights, numCustomers, totalPrice, customerId, capsuleId, capsules(name, image)"
    )
    .eq("customerId", customerId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Reservations could not get loaded");
  }

  return data;
}
