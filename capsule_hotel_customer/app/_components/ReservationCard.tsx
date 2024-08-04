import { HiOutlinePencil } from "react-icons/hi";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import { Database } from "@/database.types";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

interface ReservationCardProps {
  reservation: Reservation;
}

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const {
    id,
    customerId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numCustomers = 1,
    status,
    created_at,
    capsules: { name, image },
  } = reservation;

  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;
  const createdAtObj = created_at ? new Date(created_at) : null;

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`Capsule ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Capsule {name}
          </h3>
          {startDateObj && isPast(startDateObj) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {startDateObj ? format(startDateObj, "EEE, MMM dd yyyy") : "Unknown"}{" "}
          (
          {startDateObj
            ? isToday(startDateObj)
              ? "Today"
              : formatDistanceFromNow(startDate)
            : "Unknown"}
          ) &mdash;{" "}
          {endDateObj ? format(endDateObj, "EEE, MMM dd yyyy") : "Unknown"}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numCustomers} customer{numCustomers > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked{" "}
            {createdAtObj
              ? format(createdAtObj, "EEE, MMM dd yyyy, p")
              : "Unknown"}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <HiOutlinePencil className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation reservationId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
