"use client";

import { ReactNode, useState } from "react";
import { updateCustomer } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import { Database } from "@/database.types";

type CustomerType = Database["public"]["Tables"]["customers"]["Row"];

interface UpdateProfileFormProps {
  customer: CustomerType;
  children?: ReactNode;
}

function UpdateProfileForm({ customer, children }: UpdateProfileFormProps) {
  const [count, setCount] = useState<number | undefined>(undefined);

  const { fullName, email, nationality, nationalID, countryFlag } = customer;

  const safeFullName = fullName ?? "No Name";
  const safeEmail = email ?? "No Email";
  const safeNationalID = nationalID ?? "No National Id";

  return (
    <form
      action={updateCustomer}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={safeFullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={safeEmail}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={safeNationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
