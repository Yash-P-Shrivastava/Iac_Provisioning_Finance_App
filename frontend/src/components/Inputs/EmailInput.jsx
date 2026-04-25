import React from "react";
import { Input } from "@nextui-org/react";
import { Email } from "../../utils/Icons";

const EmailInput = ({ value, onChange, errors, noDescription }) => {
  return (
    <Input
      type="text"
      label="Email"
      labelPlacement="outside"
      name="email"
      value={value}
      onChange={onChange}
      isInvalid={!!errors?.email}
      errorMessage={errors?.email}
      placeholder="Enter your email"

      startContent={
        <div className="flex items-center justify-center w-6 h-6 min-w-[24px]">
          <Email size={16} />
        </div>
      }

      className="w-full"

      description={
        !noDescription && "We'll never share your email with anyone else."
      }

      classNames={{
        label: "text-white font-semibold mb-1",

        // 🔥 KEY FIX HERE
        inputWrapper:
          "bg-white/95 border border-white/20 shadow-md px-3 flex items-center",

        // 🔥 KEY FIX HERE
        input:
          "text-slate-900 placeholder:text-slate-400 ml-2",

        description: !noDescription ? "text-white/80 text-xs" : "",
        errorMessage: "text-error font-calSans",
      }}
    />
  );
};

export default EmailInput;