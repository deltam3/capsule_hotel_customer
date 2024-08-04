"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getReservations } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateCustomer(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("customers")
    .update(updateData)
    .eq("id", session.user.customerId);

  if (error) throw new Error("Customer could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(reservationId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const customerReservations = await getReservations(session.user.customerId);
  const customerReservationIds = customerReservations.map(
    (customer) => customer.id
  );

  if (!customerReservationIds.includes(reservationId))
    throw new Error("You are not allowed to delete this reservation");

  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) throw new Error("Reservation could not be deleted");

  revalidatePath("/account/reservations");
}

interface FormData {
  get: (name: string) => string | FormDataEntryValue | null;
}

export async function updateReservation(formData: FormData): Promise<void> {
  const reservationId = Number(formData.get("reservationId"));

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const customerReservations = await getReservations(session.user.customerId);
  const customerReservationIds = customerReservations.map(
    (reservation) => reservation.id
  );

  if (!customerReservationIds.includes(reservationId))
    throw new Error("You are not allowed to update this reservation");

  const updateData = {
    numCustomers: Number(formData.get("numCustomers")),
    comment: (formData.get("comment") as string).slice(0, 1000),
  };

  const { error } = await supabase
    .from("reservations")
    .update(updateData)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) throw new Error("Reservation could not be updated");

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}
