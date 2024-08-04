import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you! You have reserved a comfortable stay in our capsule hotel.
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Check your reservations &rarr;
      </Link>
    </div>
  );
}
