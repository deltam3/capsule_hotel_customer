import Image from "next/image";
import React from "react";

import image1 from "@/public/11.jpg";
import image2 from "@/public/bath.webp";

export const revalidate = 3600;

export const metadata = {
  title: "About",
};

import { getCapsules } from "../_lib/data-service";

export default async function Page() {
  const capsules = await getCapsules();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to our Capsule Hotel
        </h1>

        <div className="space-y-8">
          <p>
            Hello and welcome to our capsule hotel! We are Capsule Hotel, and
            I’m thrilled to be your host during your stay. With a passion for
            hospitality and a love for creating unique experiences, I’m here to
            ensure that your time with us is as comfortable and enjoyable as
            possible. Whether you’re here for a quick stopover or a longer stay,
            I’m dedicated to providing a warm and welcoming environment where
            you can relax and recharge.
          </p>
          <p>
            Our capsule hotel is designed to offer you a blend of privacy and
            community, with modern amenities and a cozy atmosphere. If you have
            any questions or need recommendations for local attractions, feel
            free to reach out—I’m always happy to help. Thank you for choosing
            to stay with us, and I hope you have a fantastic experience!
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="Capsule Hotel picture"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Image src={image2} fill className="object-cover" alt="the managers" />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          {capsules.length} comfortable capsules available
        </h1>

        <div className="space-y-8">
          <p>
            As someone who genuinely enjoys meeting new people and learning
            about different cultures, I’m excited to hear about your travels and
            experiences. I believe that every customer brings a unique story,
            and I’m here to ensure that your stay adds positively to your
            journey. Our goal is to provide a space where you can feel both
            relaxed and inspired, whether you’re unwinding in your capsule or
            socializing in our communal areas.
          </p>
          <p>
            If there’s anything you need—be it a recommendation for the best
            local eateries or assistance with any aspect of your stay—please
            don’t hesitate to let me know. Your comfort and satisfaction are my
            top priorities, and I’m here to make sure you have everything you
            need for a pleasant stay. Thank you again for choosing our capsule
            hotel, and I look forward to making your visit memorable and
            enjoyable!
          </p>

          <div>
            <a
              href="/capsules"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Learn more about our capsules
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
