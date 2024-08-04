"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

interface DateSelectorProps {
  settings: {
    minReservationLength: number;
    maxReservationLength: number;
  };
  capsule: any; // Replace with the actual type if available
  reservedDates: Date[];
}

function isAlreadyReserved(range: Range, datesArr: Date[]): boolean {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

type Range = {
  from: Date | undefined;
  to?: Date | undefined;
};

type UseReservationType = {
  range: Range | any;
  setRange: (val: any) => void;
  resetRange: () => void;
};

function DateSelector({ settings, capsule, reservedDates }: DateSelectorProps) {
  const { range, setRange, resetRange }: UseReservationType = useReservation();

  const displayRange = isAlreadyReserved(range, reservedDates) ? {} : range;

  const { regularPrice, discount } = capsule;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const capsulePrice = numNights * (regularPrice - discount);

  const { minReservationLength, maxReservationLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minReservationLength + 1}
        max={maxReservationLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          reservedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${capsulePrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
