"use client";

import React from "react";

const ResidentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <main>{children}</main>
    </div>
  );
};

export default ResidentLayout;
