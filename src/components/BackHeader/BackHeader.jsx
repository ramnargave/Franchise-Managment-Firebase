import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';


function BackHeader() {
  return (
    <>
    <div className="bg-black p-5 flex gap-5" >
        <Link to={'/'}><ArrowBackIcon className="text-white" /></Link>
        <div className="font-bold text-white" >Back</div>
    </div>
    </>
  )
}

export default BackHeader