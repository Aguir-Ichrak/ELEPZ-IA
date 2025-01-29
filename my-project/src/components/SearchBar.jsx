import { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const Searchbar = () => {

    const [activeSearch, setActiveSearch] = useState([])

    const handleSearch = (e) => {
        if(e.target.value == ''){
            setActiveSearch([])
            return false
        }
    }

  return (
    <form className='w-[500px] relative my-4 mx-8'>
        <div className="relative">
            <input type="search" placeholder='Search ...' className='w-full px-4 py-2 rounded-lg bg-slate-800' onChange={(e) => handleSearch(e)}/>
            <button className='absolute right-1 px-4 py-3 bg-slate-600 rounded-full'>
                <AiOutlineSearch />
            </button>
        </div>

        {
            activeSearch.length > 0 && (
                <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                    {
                        activeSearch.map((s,index) => (
                            <span key={index}>{s}</span>
                        ))
                    }
                </div>
            )
        }

        
    </form>
  )
}

export default Searchbar