import CapsuleCard from "@/app/_components/CapsuleCard";
import { getCapsules } from "../_lib/data-service";

async function CapsuleList() {
  const capsules = await getCapsules();

  if (!capsules.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {capsules.map((capsule) => (
        <CapsuleCard capsule={capsule} key={capsule.id} />
      ))}
    </div>
  );
}

export default CapsuleList;
