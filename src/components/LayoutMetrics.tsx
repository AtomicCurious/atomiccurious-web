"use client";

import { useEffect } from "react";

type LayoutMetricsProps = {
  headerId: string;
  footerId: string;
};

export default function LayoutMetrics({ headerId, footerId }: LayoutMetricsProps) {
  useEffect(() => {
    const setVars = () => {
      const header = document.getElementById(headerId);
      const footer = document.getElementById(footerId);

      const headerH = header?.getBoundingClientRect().height ?? 0;
      const footerH = footer?.getBoundingClientRect().height ?? 0;

      document.documentElement.style.setProperty("--ac-header-h", `${headerH}px`);
      document.documentElement.style.setProperty("--ac-footer-h", `${footerH}px`);
    };

    setVars();
    window.addEventListener("resize", setVars);
    return () => window.removeEventListener("resize", setVars);
  }, [headerId, footerId]);

  return null;
}
