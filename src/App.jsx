import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home/Home"
import NotFound from "./pages/NotFound/NotFound"
import MyState from './context/data/myState';
import UserProfile from "./pages/User/userProfile/UserProfile";
import CartPage from "./pages/User/cartPgae/CartPage";
import Menu from './pages/User/menuPage/Menu'
import RestuarntsDetail from "./pages/User/restuarntsDetail/RestuarntsDetail";
import OrderTracking from "./pages/User/OrderTracking/OrderTracking";
import AdminPanel from "./pages/Admin/adminDashboard/AdminDashboard";
import FranchiseDetails from "./pages/Admin/components/AdminCompo/FranchiseDetails";
import PasswordPage from "./pages/User/passwordPage/PasswordPage";




const App = () => {
  return (
    <>
    <MyState>
     <Router>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/*" element={<NotFound/>}/>
         <Route path="/yourprofile/:id" element={<UserProfile/>}/>
         <Route path="/yourcart" element={<CartPage/>}/>
         <Route path="/menu" element={<Menu/>}/>
         <Route path='/restuarnatsdetail/:id' element={<RestuarntsDetail/>}/>
         <Route path="/ordertracking" element={<OrderTracking/>}/>
         <Route path='/adminpanel' element={<AdminPanel/>}/>
         <Route path="fran" element={<FranchiseDetails/>}/>
         <Route path="/passwordshow" element={<PasswordPage/>}/>
       </Routes>
     </Router>
    </MyState>
    </>
  )
}

export default App