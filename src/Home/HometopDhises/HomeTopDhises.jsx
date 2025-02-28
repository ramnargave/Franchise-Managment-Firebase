import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import myContext from '../../context/data/myContext';


function HomeTopDhises() {
  const context = useContext(myContext)
  const { food, } = context
  
  return (
    <>
    <div className="md:pt-4 pt-2 rounded-lg p-2 md:p-4 bg-orange-50" >
        <div className='flex items-center justify-between' ><div className="pl-2 pt-1 font-semibold md:text-3xl" >Top Dhises:-</div><Link to={'/menu'} className='text-blue-500 rounded hover:text-blue-700 focus:outline-none' >See More</Link> </div>
       <div className="filter-main md:p-6 p-3 flex items-center gap-5 overflow-scroll md:mt-3" >
         {food.map((f) => {
            return(
                <Link to={'/menu'} key={f.id} className=" min-w-32 md:min-w-52" >
                  <div className="w-full h-28 md:h-40 lg:h-44 bg-gray-100 rounded-lg" >
                    <img src={f.image} alt="" className="w-full h-full rounded-lg" />
                  </div>
                  <div className="mt-1" >
                    <div className="text-sm font-semibold md:text-lg" >{f.name.length > 15 ? f.name.substring(0, 15) + '...' : f.name}</div>
                    <div className='flex items-center gap-1 text-orange-400' >
                      <div><LocationOnIcon style={{fontSize: "13px"}} /></div>
                      <div className='text-sm font-semibold' >{f.franchiseName}</div>
                    </div>
                    <div className='text-sm font-semibold md:text-lg' >Rs.{f.finalprice}</div>
                    <div className='bg-orange-500 mt-1 rounded-lg flex items-center justify-around text-white font-semibold p-1' >Buy Now</div>
                  </div>
                </Link>
            );
         })}
       </div>
    </div>
    </>
  )
}

export default HomeTopDhises