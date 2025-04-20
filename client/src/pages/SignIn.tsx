import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/apiClient";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";
export type SignInForm = {
  email: string;
  password: string;
};
const SignIn = () => {
  const {showToast} = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

   const mutation = useMutation({
      mutationFn: (data:SignInForm) => apiClient.signIn(data),
      onSuccess: async() => {
        showToast({
          message: "Sign in Successfully",
          type: "SUCCESS"
        });
        await queryClient.invalidateQueries({queryKey:["validateToken"]});
        navigate('/');
      },
      onError : (error:Error) =>{
      showToast({message:error.message , type:"ERROR"})
      }
    });
    const onSubmit = handleSubmit((data: SignInForm) => {
        mutation.mutate(data);
      });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 character",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex justify-between items-center flex-1">
        <p>
          Dont't have an account ?
          <Link to="/register" className="pl-1 font-medium hover:font-bold hover:underline"> Register </Link>
        </p>
        <button
          type="submit"
          className="bg-stone-500 text-white p-2 font-bold hover:bg-stone-400 text-xl rounded-sm"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
