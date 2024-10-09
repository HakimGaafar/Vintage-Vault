import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts.jsx";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vintage Vault</title>
      </Helmet>
      <FeaturedProducts />
    </>
  );
}
