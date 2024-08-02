import Image from "next/image";
import { getCapsule, getCapsules } from "@/app/_lib/data-service";
import { HiEye, HiMap, HiOutlineUsers } from "react-icons/hi";

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

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    capsule;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Capsule ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Capsule {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            A modern and innovative space designed for ultimate comfort and
            efficiency. Here, each capsule offers a private, serene retreat,
            perfect for both relaxation and productivity
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <HiOutlineUsers className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                people
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiMap className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Seoul</span> (South Korea)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiEye className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Currently Available.
        </h2>
      </div>
    </div>
  );
}
