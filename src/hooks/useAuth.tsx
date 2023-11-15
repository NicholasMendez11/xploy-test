import { Inputs } from "@/types/types";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function useAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    if (data.email !== "admin@xploy.com" || data.password !== "Xploy!123") {
      return toast.error("Invalid Credentials");
    }
    toast.success("Login Successful");
    if (data.rememberMe) {
      Cookies.set(
        "credentials",
        JSON.stringify({ email: data.email, password: data.password })
      );
    } else {
      Cookies.set(
        "credentials",
        JSON.stringify({ email: data.email, password: data.password }),
        { expires: 0.00003472 } // The cookie will expire after loged in
      );
    }
    router.push("/home");
  };

  const logOut = () => {
    Cookies.remove("credentials");
    router.push("/");
  };

  const credentialHint = () => {
    toast("email: admin@xploy.com, password: Xploy!123", {
      icon: "🔑",
      className: "flex",
      style: { width: "400px" },
    });
  };

  return { register, handleSubmit, errors, onSubmit, logOut, credentialHint };
}

export default useAuth;
