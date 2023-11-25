import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnavbaar';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignIn from './components/signup_signin/SignIn';
import SignUp from './components/signup_signin/SignUp';
import Buynow from './components/buynow/Buynow';
import Cart from './components/cart/Cart';
import{ Routes,Route} from "react-router-dom";


function App() {
  return (
    <>
     <Navbaar />
     <Newnav/>
     <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart/>} />
        <Route path="/buynow" element={<Buynow/>} />
     </Routes>
     <Footer />

    </>
  );
}

export default App;
