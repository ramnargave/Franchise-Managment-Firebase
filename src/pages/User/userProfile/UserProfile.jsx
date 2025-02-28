import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';
import myContext from '../../../context/data/myContext';
import LoadingComponents from '../../../components/loadingComponents/LoadingComponents';
import BackHeader from '../../../components/BackHeader/BackHeader';
import { auth } from '../../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const context = useContext(myContext);
    const { loggedUser } = context;

    if (!loggedUser) {
        return <LoadingComponents/>;
    }

    const navigate = useNavigate();


    // logout function 
    const logout = () => {
        auth.signOut().then(()=> {
           setTimeout(( )=> {
            navigate('/')
           }, 1000)
        })
    }

    return (
        <>
        <BackHeader/>
        <div className="w-full h-auto mt-6">
            {/* Banner */}
            <div className="flex items-center justify-center bg-red-700 rounded-2xl p-3 lg:w-[50%] lg:h-[40vh] md:w-[80%] md:h-[25vh] w-[90%] mx-auto mt-5">
                <div className="flex flex-col items-center text-center text-white">
                    <div className="font-bold text-3xl lg:text-4xl md:text-3xl">Hungery Hub</div>
                    <div className="bg-white text-red-600 font-bold text-2xl mt-2 rounded-xl px-4 py-1">Plush</div>
                    <div className="mt-5 font-bold text-xl lg:text-2xl">Save 50% on every order</div>
                    <div className="text-sm lg:text-lg mt-2">Exclusive offer for Plush members</div>
                    <div className="mt-5">
                        <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl text-xl hover:bg-red-600 hover:text-white transition-all duration-300">
                            Try For Free
                        </button>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="w-full p-7">
                <div className="mb-6">
                    <h1 className="font-bold text-2xl mb-4">Account</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between">
                            <div className="font-semibold">Name</div>
                            <div className="font-bold">{loggedUser[0].name}</div>
                        </div>
                        <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between">
                            <div className="font-semibold">Email</div>
                            <div className="font-bold">{loggedUser[0].email}</div>
                        </div>
                    </div>
                </div>

                {/* Food Orders */}
                <div className="mb-6">
                    <h1 className="font-bold text-2xl mb-4">Food Orders</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {['Your Order', 'Favourite Order', 'Address Book', 'Online Ordering Help'].map((item, index) => (
                            <div key={index} className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">{item}</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* More */}
                <div>
                    <h1 className="font-bold text-2xl mb-4">More</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 'Choose Language', 'About', 'Send Feedback', 'Settings', 'Logout' */}
                            <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">Choose Language</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                            <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">About</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                            <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">Send Feedback</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                            <div className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">Setting</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                            <div onClick={logout} className="bg-white border border-solid border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                                <div className="font-semibold">Logout</div>
                                <ChevronRightIcon className="text-gray-600" />
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserProfile;
