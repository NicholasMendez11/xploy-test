"use client";
import { Button } from "@material-tailwind/react";

import React from "react";

function GoogleButton() {
  return (
    <Button
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex items-center gap-3"
    >
      <img
        src="https://docs.material-tailwind.com/icons/google.svg"
        alt="metamask"
        className="h-6 w-6"
      />
      Continue with Google
    </Button>
  );
}

export default GoogleButton;
