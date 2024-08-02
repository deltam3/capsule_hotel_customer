import SelectCountry from "@/app/_components/SelectCountry";
import Image from "next/image";
import img1 from "@/public/11.jpg";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Update profile",
};

export default function Page() {
  const nationality = "china";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Provide the right info to expedite your check-in process
      </p>

      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
