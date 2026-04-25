import React from "react";
import { Input } from "@nextui-org/react";

import { User } from "../../utils/Icons";

const UsernameInput = ({ value, onChange, errors }) => {
  return (
    <Input
      type="text"
      label="Username"
      labelPlacement="outside"
      name="username"
      value={value}
      onChange={onChange}
      isInvalid={!!errors?.username}
      errorMessage={errors?.username}
      placeholder="Enter your username"
      startContent={<User />}
      className="w-full"
      classNames={{
        label: "text-white font-semibold mb-1",
        inputWrapper:
          "bg-white/95 border border-white/20 shadow-md data-[hover=true]:bg-white group-data-[focus=true]:bg-white",
        input: "text-slate-900 placeholder:text-slate-400",
        errorMessage: "text-error font-calSans",
      }}
    />
  );
};

export default UsernameInput;
