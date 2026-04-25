import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Password, Eye, EyeOff } from "../../utils/Icons";

const PasswordInput = ({
  value,
  onChange,
  errors,
  label,
  name,
  isInvalid,
  errorMessage,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <Input
      type={isVisible ? "text" : "password"}
      label={label ? label : "Password"}
      labelPlacement="outside"
      name={name ? name : "password"}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid ? isInvalid : !!errors?.password}
      errorMessage={errorMessage ? errorMessage : errors?.password}
      placeholder={placeholder ? placeholder : "Enter your password"}

      startContent={
        <div className="flex items-center justify-center w-6 h-6 min-w-[24px]">
          <Password size={16} />
        </div>
      }

      endContent={
        <button
          type="button"
          onClick={toggleVisibility}
          className="flex items-center justify-center w-6 h-6 min-w-[24px]"
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      }

      className="w-full"

      classNames={{
        label: "text-white font-semibold mb-1",

        // 🔥 KEY FIX
        inputWrapper:
          "bg-white/95 border border-white/20 shadow-md px-3 flex items-center",

        // 🔥 KEY FIX
        input:
          "text-slate-900 placeholder:text-slate-400 ml-2",

        errorMessage: "text-error font-calSans",
      }}
    />
  );
};

export default PasswordInput;