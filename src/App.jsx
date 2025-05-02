
import { Outlet } from 'react-router-dom'
import Header from '../src/Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { useState ,useEffect} from 'react'
import authservice from './Backend/appwrite/auth'
import { login,logout } from './store/AuthSlice'


function App() {
  
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
      authservice.getUser()
      .then((user) => {
          if (user) {
              
              dispatch(login({ user}))
            }
            else dispatch(logout());
            
        })
        .finally(() => setLoading(false));
    }, [dispatch]);
   
    
    
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
        <div className="w-full block">
            <Footer />
        </div>
    </div>
) : null;
}

export default App
