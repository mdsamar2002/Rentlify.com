import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "../contexts/AppContext";

const SignOut = () => {
  const querClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: () => apiClient.signOut(),
    onSuccess: async() => {
      await querClient.invalidateQueries({queryKey:["validateToken"]})
      showToast({ message: "SignOut Successfully", type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleOnClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleOnClick}
      className="flex items-center px-4 py-2 text-stone-800 font-bold border rounded-sm hover:bg-gray-100 bg-white hover:shadow-xl hover:border-stone-900"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
