import SelectCountry from "@/app/_components/SelectCountry";
import Image from "next/image";
import img1 from "@/public/11.jpg";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getCustomer } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const customer = await getCustomer(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Provide the right info to expedite your check-in process
      </p>

      <UpdateProfileForm customer={customer}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={customer.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
