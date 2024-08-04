"use client";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

import { useOptimistic } from "react";
import { Database } from "@/database.types";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

type ReservationListProps = {
  reservations: Reservation[];
};

function ReservationList({ reservations }: ReservationListProps) {
  const [optimisticReservations, optimisticDelete] = useOptimistic(
    reservations,
    (curReservations, reservationId) => {
      return curReservations.filter(
        (reservation) => reservation.id !== reservationId
      );
    }
  );

  async function handleDelete(reservationId: string) {
    optimisticDelete(reservationId);
    await deleteReservation(reservationId);
  }

  return (
    <ul className="space-y-6">
      {optimisticReservations.map((reservation) => (
        <ReservationCard
          reservation={reservation}
          onDelete={handleDelete}
          key={reservation.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
