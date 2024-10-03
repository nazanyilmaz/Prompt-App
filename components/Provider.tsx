"use client";

import { SessionProvider } from "next-auth/react";

// SessionProvider oturumu acik olan kullanici bilgilerini uygulama iceriisnden erisimimizi saglar.

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
