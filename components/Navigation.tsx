"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProviderType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  type ProviderType = {
    google: {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    };
  };
  useEffect(() => {
    getProviders().then((res) => setProviders(res));
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={50}
          height={50}
          className=" object-contain"
        />
        <p className="logo_text">Promptmania</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className=" black_btn">
              Create Post
            </Link>
            <button
              onClick={() => signOut()}
              type="button"
              className=" outline_btn"
            >
              Logout
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image!}
                alt="profile-photo"
                width={40}
                height={40}
                className=" rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className=" black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="flex md:hidden relative bg-">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Image
              src={session?.user.image!}
              alt="profile-photo"
              width={40}
              height={40}
              className=" rounded-full"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className=" dropdown_link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className=" dropdown_link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Post
                </Link>
                <button
                  className=" black_btn mt-3 w-full"
                  onClick={() => {
                    setIsDropdownOpen(false), signOut();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className=" black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
