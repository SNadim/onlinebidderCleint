import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext/AuthContext";

import { Login } from "./pages/authentication/Login";
import { Registration } from "./pages/authentication/Register";
import { WritePost } from "./pages/writePost/WritePost";
import { Home } from "./pages/Home";
import Banner from "./components/banner/Banner";
import { Top } from "./components/top/Top";
import { Navbar } from "./components/navbar/Navbar";
import { Posts } from "./pages/posts/Posts";
import { SingleProduct } from "./pages/singleProduct/SingleProduct";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { logout } from "./context/authContext/apiCalls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./components/topBar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import PostList from "./pages/postList/PostList";
import AddPost from "./pages/addPost/AddPost";
import SellerPost from "./pages/sellerPost/SellerPost";
import SellerHome from "./pages/sellerHome/SellerHome";
import { SellerLogin } from "./pages/sellerAuthentication/SellerLogin";
import { Seller } from "./Seller";

function App() {
  const { user, dispatch } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  useEffect(() => {
    const { jwt } = cookies;
    if (!jwt) {
      if (user) {
        console.log(user);
        localStorage.setItem("user", null);
      }
    }
  }, [cookies, dispatch, user]);
  return (
    <BrowserRouter>
      {user ? (
        <>
          {user.role === "seller" ? (
            <>
              <Seller />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/type/:type" element={<Posts />} />
            <Route
              path="/posts/singleProduct/:id"
              element={<SingleProduct />}
            />
            <Route path="/seller/login" element={<SellerLogin />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
              exact={true}
            />
            <Route
              path="/register"
              element={!user ? <Registration /> : <Navigate to="/" />}
              exact={true}
            />
          </Routes>
        </>
      )}
      {/* <Banner />
      <Top />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
          exact={true}
        />
        <Route
          path="/register"
          element={!user ? <Registration /> : <Navigate to="/" />}
          exact={true}
        />
        <Route path="/posts/type/:type" element={<Posts />} />
        <Route path="/posts/singleProduct/:id" element={<SingleProduct />} />
        <Route
          path="/write"
          element={user ? <WritePost /> : <Navigate to="/" />}
        />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
