import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";
export type Registerform = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const querClient = useQueryClient()
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Registerform>();

  const mutation = useMutation<void, Error, Registerform>({
    mutationFn: (data: Registerform) => apiClient.register(data),
    onSuccess: async() => {
      showToast({ message: "registeration successfully", type: "SUCCESS" });
      await querClient.invalidateQueries({queryKey:["validateToken"]});
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: Registerform) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstname", { required: "FirstName is required" })}
          />
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastname", { required: "LastName is required" })}
          />
          {errors.lastname && (
            <span className="text-red-500">{errors.lastname.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Re-type your password";
              } else if (watch("password") != val) {
                return "Your password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-stone-500 text-white p-2 font-bold hover:bg-stone-400 text-xl rounded-sm"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
