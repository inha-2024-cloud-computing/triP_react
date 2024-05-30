import React from "react";
import Header from "../components/Header";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
