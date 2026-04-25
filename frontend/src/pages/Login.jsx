import React, { useState, useEffect } from "react";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../features/api/apiSlices/userApiSlice";
import { setCredentials } from "../features/authenticate/authSlice";
import { updateLoader } from "../features/loader/loaderSlice";

import loginImg from "../assets/login.webp";
import { UserAuthForm, OtpForm } from "../components/Forms";
import validateForm from "../utils/validateForm";
import { EmailInput, PasswordInput } from "../components/Inputs";
import SubmitButton from "../components/SubmitButton";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(
    parseInt(localStorage.getItem("otpCountdown")) || 0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();

  const validationSchema = object({
    email: string().required("Email is required.").email("Invalid Email."),
    password: string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long."),
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm(name, value, validationSchema, setErrors);
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateLoader(40));
      const res = await login(formData).unwrap();

      dispatch(updateLoader(60));
      await dispatch(setCredentials(res.user));
      toast.success(res.message || "Logged in successfully!");
      navigate("/");
    } catch (error) {
      if (error?.data?.user?.verified === false) {
        await sendOtp({ email });
        dispatch(updateLoader(60));
        setCountdown(60);
        localStorage.setItem("otpCountdown", "60");
        setStep(2);
        toast.error(error?.data?.error || "Please verify your email.");
        return;
      }
      toast.error(error?.data?.error || "Unexpected error!");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateLoader(40));
      const response = await verifyOtp({ email, otp }).unwrap();

      dispatch(updateLoader(70));
      toast.success(response.message || "Email verified!");
      setStep(1);
    } catch (error) {
      toast.error(error?.data?.error || "Invalid OTP");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateLoader(40));
      await sendOtp({ email }).unwrap();
      dispatch(updateLoader(70));
      toast.success("OTP sent!");
      setCountdown(60);
      localStorage.setItem("otpCountdown", "60");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const hasErrors = Object.values(errors).some((error) => !!error);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        localStorage.setItem("otpCountdown", (countdown - 1).toString());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-5xl">
        <UserAuthForm
          title={step === 1 ? "Welcome Back!" : "Verify your Email"}
          imageSrc={loginImg}
          imageTitle="Start using Now."
          alt="login image"
          onSubmit={step === 1 ? handleSubmit : handleOtpSubmit}
          form={
            <div className="flex flex-col gap-y-7 w-full pt-4">
              {step === 1 ? (
                <>
                  {/* FIX: wrapped inputs to ensure spacing */}
                  <div className="w-full">
                    <EmailInput
                      value={email}
                      onChange={handleOnChange}
                      errors={errors}
                    />
                  </div>

                  <div className="w-full">
                    <PasswordInput
                      value={password}
                      onChange={handleOnChange}
                      errors={errors}
                    />
                  </div>

                  <SubmitButton
                    isLoading={loginLoading}
                    isDisabled={!email || !password || hasErrors}
                  />
                </>
              ) : (
                <OtpForm
                  otp={otp}
                  setOtp={setOtp}
                  email={email}
                  handleOtpSubmit={handleOtpSubmit}
                  resendOtp={resendOtp}
                  countdown={countdown}
                  verifyOtpLoading={verifyOtpLoading}
                />
              )}
            </div>
          }
          footer={step === 1 && "Don't have an account?"}
          footerLink={step === 1 && "Register"}
          footerLinkPath={step === 1 && "/register"}
        />
      </div>
    </section>
  );
};

export default Login;