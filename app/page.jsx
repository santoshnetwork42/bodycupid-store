"use client";

import React, { useEffect, useState } from "react";
import HomePage from "~/components/pages/home-page";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/home")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) return null;
  return <HomePage {...data} />;
}
