"use client";
import { Database } from "@/database.types";
import { HiOutlineTrash } from "react-icons/hi";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"]["id"];

interface DeleteReservationProps {
  reservationId: Reservation;
  onDelete: (reservationId: string) => void;
}

import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

const DeleteReservation: React.FC<DeleteReservationProps> = ({
  reservationId,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(`reservationId`));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <HiOutlineTrash className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
};

export default DeleteReservation;
