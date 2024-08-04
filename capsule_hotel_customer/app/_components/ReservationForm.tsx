"use client";

import { Database } from "@/database.types";
import { useReservation } from "./ReservationContext";
type CapsuleType = Database["public"]["Tables"]["capsules"]["Row"];
// type UserType = Database["public"]["Tables"][""];

type ReservationFormProps = {
  capsule: CapsuleType;
  user: any;
};

function ReservationForm({ capsule, user }: ReservationFormProps) {
  const { range } = useReservation();
  const maxCapacity = capsule.maxCapacity ?? 0;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
      </div>

      <form className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numCustomers">How many customers?</label>
          <select
            name="numCustomers"
            id="numCustomers"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
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
          <label htmlFor="comment">Anything we should know?</label>
          <textarea
            name="comment"
            id="comment"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any meal that you want to eat? Are you allergic to anything?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
