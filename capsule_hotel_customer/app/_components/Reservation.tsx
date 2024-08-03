import { Database } from "@/database.types";
import { getReservedDatesByCapsuleId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

type CapsuleType = Database["public"]["Tables"]["capsules"]["Row"];

type ReservationProps = {
  capsule: CapsuleType;
};

async function Reservation({ capsule }: ReservationProps) {
  const [settings, reservedDates] = await Promise.all([
    getSettings(),
    getReservedDatesByCapsuleId(capsule.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        reservedDates={reservedDates}
        capsule={capsule}
      />
      {session?.user ? (
        <ReservationForm capsule={capsule} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
