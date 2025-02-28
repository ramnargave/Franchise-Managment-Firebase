import { Link } from "react-router-dom"


const NotFound = () => {
  return (
    <>
    <div className="w-full h-screen flex items-center justify-center" >
        <div>
            <h1 className="text-6xl text-gray-800">404</h1>
            <h2 className="text-3xl text-gray-700">Page Not Found</h2>
            <Link to="/">
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go Home</button>
            </Link>
        </div>
    </div>
    </>
  )
}

export default NotFound