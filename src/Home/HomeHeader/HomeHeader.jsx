import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext,} from 'react';
import LoginSignup from '../LoginSignup/LoginSignup';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';

function HomeHeader() {
    // const [isOpen, setIsOpen] = useState(false);
    // const [isLogin, setIsLogin] = useState(true);

    const context  = useContext(myContext);
    const { setIsOpen, loggedUser,} = context;
  
  return (
    <>
    <div className="bg-white p-3 md:px-20 flex items-center justify-between md:justify-between" >
        <div className="font-bold text-3xl" >LOGO</div>
        <div className="hidden md:flex items-center" >
            <div className="font-bold pr-2" >Deliver To:-</div>
            <div><LocationOnIcon fontSize='20px' className='text-orange-600' /></div>
            <div className="text-gray-800 " >Indore vijay nagar</div>
        </div>
        {loggedUser ?  <div className='flex items-center gap-5' ><Link to={`/yourprofile/${loggedUser[0].id}`} className="">
            <div><AccountCircleIcon/></div>
        </Link>
        <Link to={`/yourcart`}><ShoppingCartIcon/></Link></div> : <div className="flex items-center gap-2 bg-red-700 p-3 rounded-3xl text-white" >
            <div><AccountCircleIcon/></div>
            <div className='font-semibold'  onClick={() => setIsOpen(true)} >SigIn/Login</div>
        </div>}
    </div>
    <LoginSignup />

    </>
  )
}

export default HomeHeader