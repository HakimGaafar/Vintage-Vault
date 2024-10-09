import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
    
      <div className="bg-main-light footer mt-5 ">
        <div className="  mx-auto container">
          <h3 className="fw-bold mx-2 pt-4">Get the FreshCart app</h3>
          <p className="text-muted fs-5 px-2">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="row py-2 border-1 border-bottom m-0">
            <div className="col-md-10">
              <input
                type="email"
                placeholder="Email..."
                className=" mx-auto form-control "
              />
            </div>
            <div className="col-md-2">
              <button className="btn bg-main text-white px-3">
                Share App Link
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
