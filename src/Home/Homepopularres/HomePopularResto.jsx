import StarIcon from '@mui/icons-material/Star';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';

function HomePopularResto() {
  const context = useContext(myContext)
  const { franchise } = context
  
  return (
    <>
    <div className="bg-slate-100 md:p-4" >
        <div className="pl-2 pt-1 md:pt-4  font-semibold md:text-3xl" >Popular Restouarants</div>
       <div className="filter-main p-3 md:p-6 flex items-center gap-5 overflow-scroll md:mt-3" >
         {franchise.map((f) => {
            return(
                <Link to={`/restuarnatsdetail/${f.owneruid}`} key={f.id} className="min-w-32 md:min-w-52" >
                  <div className="w-full h-28 md:h-40 lg:h-44 rounded-lg bg-gray-100">
                    <img src={f.imageurl} alt="" className="w-full h-full rounded-lg" />
                  </div>
                  <div>
                    <div className='font-semibold md:text-xl'>{f.name.length > 20 ? f.name.substring(0, 20) + '...' : f.name}</div>
                    <div className='flex items-center gap-1 font-semibold' ><div><StarIcon style={{fontSize: "17px", color: "orange"}} /></div>4.5</div>
                    <div className="filter-main overflow-scroll flex gap-2 mt-1" >
                      {Array(5).fill().map((_,j) => {
                        return (
                          <div key={j} className="bg-green-400 rounded-md px-2 text-sm md:text-lg font-semibold" >Thali</div>
                        );
                      })}
                    </div>
                    <div className="bg-orange-500 p-1 rounded-lg flex items-center justify-center font-semibold text-white mt-2 md:mt-3" >Order Now</div>
                  </div>
                </Link>
            );
         })}
       </div>
    </div>
    </>
  )
}

export default HomePopularResto