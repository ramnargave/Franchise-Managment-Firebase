import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';



function ChoosePop({setPop}) {

    const [selectedOption, setSelectedOption] = useState('');
const [selectedOption2, setSelectedOption2] = useState('');
const [message, setMessage] =useState(``)

    // option wala funtion 
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleChange2 = (event) => {
        setSelectedOption2(event.target.value);
      };

      // quantity fuction 
        const [quantity, setQuantity] = useState(1);
      
        const decreaseQuantity = () => {
          if (quantity > 1) {
            setQuantity(quantity - 1); 
          }
        }

  return (
     <>
<div className="fixed h-screen w-full inset-0 bg-opacity-50" >
  <div className="relative w-full h-full" >
     <div className="absolute -bottom-1 w-full" >
     <div className="flex items-center justify-around w-full p-5" ><div onClick={((e) => setPop(false))} className="font-bold text-xl" ><CloseIcon  /></div></div>

<div className="bg-slate-100 w-full" >
    {/* fooding and name  */}
<div className="flex bg-white rounded-lg md:p-5 p-2">
  <div className="w-auto h-16 md:h-24" ><img src="https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg" alt="" className="w-full h-full rounded-lg" /></div>
  <div className="font-bold ml-5 md:text-2xl" >Food Name</div>
</div>

<div className="h-96 md:h-1/2 overflow-auto scroll-smooth" >
     {/* choice  */}
<div className="p-5 mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" >
          {/* option  */}
          <div className="" >
   <div className="bg-white p-4 rounded-lg" >
    <div>
      <h1 className="font-bold" >Choose Your Bread</h1>
      <p>Require Select any 1 option</p>
    </div>
    <div className="mt-4" >
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Option 1  </label> <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={handleChange} />
       </div>
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Option 1  </label> <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={handleChange} />
       </div>
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Option 1  </label> <input type="radio" value="option3" checked={selectedOption === 'option3'} onChange={handleChange} />
       </div>
       <div className="font-semibold mt-5 flex items-center gap-2" >
        You Choose <div className="font-bold" >{selectedOption}</div>
       </div>
    </div>
   </div>
</div>

 {/* option 2 */}
 <div className="" >
   <div className="bg-white p-4 rounded-lg" >
    <div>
      <h1 className="font-bold" >Add On</h1>
      <p>Select up to 1 option</p>
    </div>
    <div className="mt-4" >
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Boondi Raita [250 ml]  </label> <div className="flex gap-3 items-center" ><div className="font-semibold" >₹ 250</div><input type="radio" value="Boondi Raita [250 ml] " checked={selectedOption2 === 'Boondi Raita [250 ml] '} onChange={handleChange2} /></div>
       </div>
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Roti  </label> <div className="flex gap-3 items-center" ><div className="font-semibold" >₹ 250</div><input type="radio" value="Roti" checked={selectedOption2 === 'Roti'} onChange={handleChange2} /></div>
       </div>
       <div className="flex items-center justify-between mt-3" >
         <label className="font-semibold" > Dal  </label> <div className="flex gap-3 items-center" ><div className="font-semibold" >₹ 250</div><input type="radio" value="Dal" checked={selectedOption2 === 'Dal'} onChange={handleChange2} /></div>
       </div>
       <div className="font-semibold mt-5 flex items-center gap-2" >
        You Choose <div className="font-bold" >{selectedOption2}</div>
       </div>
    </div>
   </div>
</div>

        {/* message  */}
<div className="" >
<div className="bg-white rounded-lg p-5" >
<div className="font-black" >Add a cooking request (optional)</div>
<div className="p-5" >
<textarea name="" id="" onChange={((e) => setMessage(e.target.value))} cols="30" rows="5" className="w-full p-5 bg-slate-100 rounded-lg" placeholder="Message" />
</div>
</div>
</div>

</div>  

{/* add cart button  */}
<div className="p-5" >
<div className="flex items-center justify-between bg-white rounded-lg p-5" >
 <div className="border border-green-600 flex items-center justify-between gap-5 p-2 rounded-lg">
    <div onClick={decreaseQuantity} >-</div>
    <div>{quantity}</div>
    <div onClick={((e) => setQuantity(quantity + 1))} >+</div>
 </div>
 <Link to={'/yourcart'} className="bg-red-700 p-3 rounded-lg font-bold text-white" >Add To Cart ₹250</Link>
</div>
</div>
</div>
</div>
     </div>
  </div>


</div>
     </>
  )
}

export default ChoosePop