import { Toaster } from "react-hot-toast"

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full h-screen bg-[#1E1E1E] overflow-auto">
      <Toaster position="top-right" reverseOrder={true} />
      {children}
    </div>
  );
}
