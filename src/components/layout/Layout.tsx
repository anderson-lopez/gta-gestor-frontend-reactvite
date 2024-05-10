import { Navbar } from "../navbar/Navbar"

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-red-500">
      <Navbar/>
      {children}
    </div>
  )
}
