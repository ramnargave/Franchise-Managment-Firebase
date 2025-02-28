import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const FoodCard = ({dis, setPop}) => {
  return (
    <>
                    <div className="hover:scale-95 transition-all duration-300 " >
                        <div className=" w-full h-44 md:h-56 lg:h-72">
                            <img src={dis.image} alt="" className="h-full w-full rounded-xl " />
                        </div>
                        <div className="p-1 pt-2" >
                             <div className="flex items-center justify-between" >
                               <div className="font-bold text-ms md:text-xl text-red-700" >{dis.franchiseName}</div>
                               <div className="flex items-center font-semibold " ><StarIcon className="text-orange-600 items-center " style={{fontSize: "18px"}} /> <div className="h-full pl-1" >{dis.rating}</div> </div>
                             </div>
                            <p className="font-bold text-gray-600" >{dis.name}</p>
                            <div className="text-lg text-gray-800" >{dis.description}</div>
                            <div className="flex items-center justify-between" >
                              <div className="text-lg font-bold text-gray-800 " >₹ {dis.finalprice}</div>
                              <div onClick={((e) => setPop(true))} className="bg-red-600 p-1 rounded-lg font-bold " >Add Cart</div>
                            </div>
                        </div>
                </div>
    </>
  )
}

export default FoodCard