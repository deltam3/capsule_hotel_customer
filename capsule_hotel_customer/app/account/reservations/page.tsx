import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getReservations } from "@/app/_lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const reservations = await getReservations(session.user.customerId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {reservations.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/capsules">
            comfortable capsules &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {reservations.map((reservation) => (
            <ReservationCard reservation={reservation} key={reservation.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
