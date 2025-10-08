import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// The root layout is a client component that receives the locale
// from the params and renders the children.
export default function RootLayout({ children }: Props) {
  return children;
}
