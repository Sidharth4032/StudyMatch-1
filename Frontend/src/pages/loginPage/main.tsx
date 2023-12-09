import React from "react";
import WithSubnavigation from "../../components/navBar/main";
import Login from "../../components/login/main";

export function LoginPage() {

  return(
    <div>
      <WithSubnavigation></WithSubnavigation>
      <Login></Login>
    </div>
  )
}