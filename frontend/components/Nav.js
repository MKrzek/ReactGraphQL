import React from "react";
import NavStyles from "./styles/NavStyles";
import Link from "next/link";

const Nav = () => {
  return (
    <NavStyles>
      <Link href="/items">
        <a>shop</a>
      </Link>
      <Link href="/sell">
        <a>sell</a>
      </Link>
      <Link href="/signup">
        <a>signup</a>
      </Link>
      <Link href="/orders">
        <a>orders</a>
      </Link>
      <Link href="/me">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
