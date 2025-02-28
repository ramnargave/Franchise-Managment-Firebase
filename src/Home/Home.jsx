import { useContext } from "react"
import HomeLadongLay from "../components/loadingComponents/HomeLadongLay"
import AdminHeader from "./admin-header/AdminHeader"
import Carousel from "./Carousel/Carousel"
import CategoriesSlider from "./categories/CategoriesSlider"
import GetAppBander from "./HomeGetappbaner/GetAppBander"
import HomeHeader from "./HomeHeader/HomeHeader"
import HomePartDeliv from "./HomePartDeli/HomePartDeliv"
import HomePopularResto from "./Homepopularres/HomePopularResto"
import HomeTopDhises from "./HometopDhises/HomeTopDhises"
import myContext from "../context/data/myContext"




function Home() {
  const context  = useContext(myContext);
  const {homeloading} = context
  return (
    <>
    {homeloading ? (<HomeLadongLay/>) : (
       <>
       <HomeHeader/>
       <AdminHeader/>
       <Carousel/>
       <div className="p-0 lg:pl-24 lg:pr-24" >
           <CategoriesSlider/>
           <HomeTopDhises/>
           <HomePopularResto/>
           <HomePartDeliv/>
       </div>
       <GetAppBander/>
       </>
    )}
   
    </>
  )
}

export default Home