import {
  getReservedDatesByCapsuleId,
  getCapsule,
} from "@/app/_lib/data-service";

interface Params {
  capsuleId: string;
}

type CapsuleIdType = { capsuleId: number | string };

export async function GET(
  request: Request,
  { params }: { params: Params }
): Promise<Response> {
  const { capsuleId }: CapsuleIdType = params;

  try {
    const [capsule, reservedDates] = await Promise.all([
      getCapsule(+capsuleId),
      getReservedDatesByCapsuleId(capsuleId),
    ]);

    return Response.json({ capsule, reservedDates });
  } catch {
    return Response.json({ message: "Capsule not found" });
  }
}
