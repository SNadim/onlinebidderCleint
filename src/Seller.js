import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topBar/TopBar";
import { AuthContext } from "./context/authContext/AuthContext";
import AddPost from "./pages/addPost/AddPost";
import { Home } from "./pages/Home";
import PostList from "./pages/postList/PostList";
import { Posts } from "./pages/posts/Posts";
import SellerHome from "./pages/sellerHome/SellerHome";
import SellerPost from "./pages/sellerPost/SellerPost";
import { SingleProduct } from "./pages/singleProduct/SingleProduct";

export const Seller = () => {
  return (
    <div>
      <Routes>
        <Route path="/seller" element={<SellerHome />} />
        <Route path="/seller/postlist" element={<PostList />} />
        <Route path="/seller/post/:postId" element={<SellerPost />} />
        <Route path="/seller/addpost" element={<AddPost />} />
        <Route path="/" element={<Home />} />
        <Route path="/posts/type/:type" element={<Posts />} />
        <Route path="/posts/singleProduct/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};
