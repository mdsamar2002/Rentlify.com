import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose : () => void;
};

const Toast = ({ message, type , onClose }: ToastProps) => {
   useEffect (() =>{
    const timer = setTimeout(()=>{
      onClose();
    },5000)
    return () =>{
        clearTimeout(timer)
    }
   },[onClose]) 
  const style =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 rounded-md bg-stone-800 text-white max-w-md px-4 py-2"
      : "fixed top-4 right-4 z-50 rounded-md bg-red-800 text-white max-w-md px-4 py-2";

  return (
    <div className={style}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};
export default Toast;
