import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This capsule could not be found
      </h1>
      <Link
        href="/capsules"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all capsules
      </Link>
    </main>
  );
};

export default NotFound;
