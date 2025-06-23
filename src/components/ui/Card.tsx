import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded shadow p-4 mb-4">{children}</div>;
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
