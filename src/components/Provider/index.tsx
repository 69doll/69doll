import { Outlet } from "react-router-dom"
import { Provider as DisplayProvider } from "../../context/SiderDisplay"

export default function () {
  return <>
    <DisplayProvider>
      <Outlet />
    </DisplayProvider>
  </>
}
