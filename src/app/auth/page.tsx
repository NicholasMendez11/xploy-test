"use client";
import { GoogleButton } from "@/shared/components";
import { emailRegex, passwordRegex } from "@/shared/const/regex";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";

function Login() {
  const { errors, handleSubmit, onSubmit, register, credentialHint } =
    useAuth();

  return (
    <div className="py-6  w-96 flex flex-col items-center gap-4 ">
      <Toaster />
      <h1 className="text-2xl font-semibold text-center">
        Sign in to <span className="text-[#338FC7]">XPLOY</span>{" "}
      </h1>
      <GoogleButton />
      <p className="text-gray-500">or</p>
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full h-12 px-3 rounded-md border border-[#338FC7] focus:outline-none focus:ring-2 focus:ring-[#338FC7]]"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: emailRegex.value,
              message: emailRegex.message,
            },
          })}
        />
        <span className=" text-red-400 text-xs">
          <ErrorMessage errors={errors} name="email" />
        </span>
        <input
          className="w-full h-12 px-3 rounded-md border border-[#338FC7] focus:outline-none focus:ring-2 focus:ring-[#338FC7]]"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            pattern: {
              value: passwordRegex.value,
              message: passwordRegex.message,
            },
          })}
        />
        <span className=" text-red-400 text-xs">
          <ErrorMessage errors={errors} name="password" />
        </span>
        <div className="flex gap-2 justify-end">
          <input type="checkbox" {...register("rememberMe")} />
          <label>Remember me</label>
        </div>
        <Button fullWidth type="submit">
          Log in
        </Button>
        <Button
          variant="text"
          className="text-[#338FC7] font-semibold hover:bg-transparent"
          onClick={credentialHint}
        >
          Credential hint
        </Button>
        <p className="text-center text-gray-500">
          No account?{" "}
          <span className="text-[#338FC7] font-semibold hover:cursor-pointer">
            Create one
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
