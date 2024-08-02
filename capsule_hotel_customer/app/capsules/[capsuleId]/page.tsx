import { getCapsule, getCapsules } from "@/app/_lib/data-service";

import Capsule from "@/app/_components/Capsule";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

interface PageParamsProps {
  params: {
    capsuleId: any;
  };
}

export async function generateMetadata({ params }: PageParamsProps) {
  const { name } = await getCapsule(params.capsuleId);
  return { title: `Capsule ${name}` };
}

export async function generateStaticParams() {
  const capsules = await getCapsules();

  const ids = capsules.map((capsule) => ({ capsuleId: String(capsule.id) }));

  return ids;
}

export default async function Page({ params }: PageParamsProps) {
  const capsule = await getCapsule(params.capsuleId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Capsule capsule={capsule} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          {capsule.name} Currently Available.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation capsule={capsule} />
        </Suspense>
      </div>
    </div>
  );
}
