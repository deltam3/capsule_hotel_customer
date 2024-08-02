import CapsuleCard from "@/app/_components/CapsuleCard";
import { getCapsules } from "../_lib/data-service";
import { Database } from "@/database.types";

type CapsuleType = Database["public"]["Tables"]["capsules"]["Row"];
interface CapsuleListProps {
  filter: string;
}

async function CapsuleList({ filter }: CapsuleListProps) {
  const capsules: CapsuleType[] = await getCapsules();

  if (!capsules.length) return null;

  let displayedCapsules: CapsuleType[];
  if (filter === "all") displayedCapsules = capsules;
  else if (filter === "small")
    displayedCapsules = capsules.filter((capsule) => capsule.maxCapacity <= 1);
  else if (filter === "medium")
    displayedCapsules = capsules.filter((capsule) => capsule.maxCapacity === 2);
  else if (filter === "large")
    displayedCapsules = capsules.filter((capsule) => capsule.maxCapacity >= 3);
  else displayedCapsules = [];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCapsules.map((capsule) => (
        <CapsuleCard capsule={capsule} key={capsule.id} />
      ))}
    </div>
  );
}

export default CapsuleList;
