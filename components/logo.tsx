import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-3xl bg-gradient-to-r hover:bg-gradient-to-b transition from-purple-500  to-sky-500 text-transparent bg-clip-text cursor-pointer "
    >
      AI FORM BUILDER
    </Link>
  );
};
