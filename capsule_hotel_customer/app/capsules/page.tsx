import { Suspense } from "react";
import CapsuleList from "../_components/CapsuleList";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Capsule",
};

export default async function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Capsules
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Welcome to our luxurious capsule hotel, where innovation meets opulence
        in a harmonious blend of comfort and style. Each capsule is thoughtfully
        designed to provide an indulgent retreat, featuring plush bedding,
        ambient lighting, and cutting-edge technology to enhance your stay. Our
        attention to detail ensures that every aspect, from the high-quality
        materials used to the serene and sophisticated decor, creates an
        unparalleled experience. Whether you're here for a relaxing getaway or a
        high-end urban adventure, our luxurious capsules offer a private haven
        that redefines the concept of capsule living, making it both lavish and
        exceptionally convenient.
      </p>

      <Suspense fallback={<Spinner />}>
        <CapsuleList />
      </Suspense>
    </div>
  );
}
