

function HomeLadongLay() {
  return (
    <>
    <div>
        {/* navbar  */}
        <div className="py-4 px-8 bg-slate-200 flex justify-between items-center" >
            <div className="w-14 h-14 bg-gray-400 rounded-full" ></div>
            <div className="flex flex-col gap-1" >
                <div className="w-20 h-5 bg-gray-400 rounded-xl" ></div>
                <div className="w-20 h-5 bg-gray-400 rounded-xl " ></div>
            </div>
        </div>
        {/* caresoul  */}
        <div  className="bg-gray-400 w-full h-36 md:h-56" ></div>
        {/* categories  */}
        <div className="p-2 pb-4 bg-slate-100 py-8" >
            <div className="w-36 h-8 lg:w-44 bg-gray-400 rounded-xl" ></div>
            <div className=" filter-main flex gap-5 mt-5 px-4 overflow-auto" >
                {Array(20).fill().map((_, j) => {
                    return (
                        <div key={j} className="bg-gray-400 min-w-16 min-h-16 md:min-w-20 md:min-h-20 lg:min-w-36 lg:min-h-36 rounded-full"  ></div>
                    );
                })}
            </div>
        </div>
        {/* toprestouarants  */}
        <div className="p-2 pb-4 bg-slate-100 py-8 lg:py-10 lg:px-8" >
            <div className="w-36 h-8 lg:w-44 bg-gray-400 rounded-xl" ></div>
            <div className=" filter-main flex gap-5 mt-5 px-4 overflow-auto" >
                {Array(20).fill().map((_, j) => {
                    return (
                        <div key={j} className="bg-gray-400 min-w-32 min-h-32 lg:min-w-60 lg:min-h-60 rounded-xl"  ></div>
                    );
                })}
            </div>
        </div>
    </div>
    </>
  )
}

export default HomeLadongLay