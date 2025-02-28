import { useContext } from "react"
import myContext from "../../context/data/myContext"


function AdminHeader() {
  const contex = useContext(myContext);
  const {loggedUser} = contex;

  return (
    <>
   {loggedUser && loggedUser[0].roll === 'user' ?  <div className="p-3 bg-red-600 w-full flex items-center justify-between" >
        <div className="text-white font-semibold" >Admin Panel</div>
        <div className="text-white font-semibold" >Franchice</div>
        <div className="text-white font-semibold" >Logout</div>
    </div> : null}
    </>
  )
}

export default AdminHeader