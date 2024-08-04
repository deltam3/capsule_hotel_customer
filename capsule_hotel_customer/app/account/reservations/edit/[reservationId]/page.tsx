import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { getReservation, getCapsule } from "@/app/_lib/data-service";

interface PageProps {
  params: {
    reservationId: string;
  };
}

interface Reservation {
  numCustomers: number;
  comment: string;
  capsuleId: string;
}

interface Capsule {
  maxCapacity: number;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { reservationId } = params;
  const { numCustomers, comment, capsuleId }: Reservation =
    await getReservation(reservationId);
  const { maxCapacity }: Capsule = await getCapsule(+capsuleId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        method="post"
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={reservationId} name="reservationId" />

        <div className="space-y-2">
          <label htmlFor="numCustomers">How many customers?</label>
          <select
            name="numCustomers"
            id="numCustomers"
            defaultValue={numCustomers}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" disabled>
              Select number of customers...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "customer" : "customers"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="comment">
            Anything we should know about your stay?
          </label>
          <textarea
            name="comment"
            id="comment"
            defaultValue={comment}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
