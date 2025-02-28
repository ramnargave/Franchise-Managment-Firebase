import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

function Carousel() {
  return (
    <>
    {/* bg-[url('https://dev-magazine.elitehavens.com/wp-content/uploads/2023/12/1-3.png')] bg-cover bg-center */}
    <div className="w-full h-72 md:h-96 bg-orange-600 flex items-center" >
      <div className="p-4 md:pl-36 md:p-0" >
          <div>
            <div className="font-bold text-3xl mb-2 md:text-4xl text-white" >ARE YOU STARVING ?</div>
            <p className='text-sm' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, facere.</p>
            <div className="bg-white rounded-lg p-3 md:p-6 mt-2" >
              <div className='flex ' >
                <div className='flex bg-gray-300 rounded-lg p-2 items-center gap-1' >
                 <div><TwoWheelerIcon fontSize='20px' /></div>
                 <div className='font-semibold' >Deliver</div>
                </div>
              </div>
                <div className="flex items-center justify-between mt-5" >
                    <div className="flex items-center bg-gray-300 border rounded-lg w-[70%] pl-2" >
                        <LocationOnIcon fontSize='20px' className='text-orange-600' />
                        <input type="text" placeholder="Enter Address" className="p-2 text-gray-800 bg-gray-300" />
                    </div>
                    <div className="bg-orange-500 p-2 rounded-xl" >Find Food ?</div>
                </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Carousel