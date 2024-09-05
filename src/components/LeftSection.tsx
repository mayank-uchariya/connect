"use client"

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookmarksOutlined, FavoriteBorder, Logout } from "@mui/icons-material";
import { FaHome, FaPen, FaUsers, FaBookmark, FaHeart } from "react-icons/fa";
import { UserButton, SignOutButton, useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import Image from "next/image";
import logo from "@/assets/connect.png";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

const LeftSection: FC = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  const getUser = async () => {
    if (user?.id) {
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      setUserData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getUser();
    }
  }, [user, isLoaded]);

  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: <FaHome className="text-xl" /> },
    {
      href: "/create-post",
      label: "Create Post",
      icon: <FaPen className="text-xl" />,
    },
    { href: "/people", label: "People", icon: <FaUsers className="text-xl" /> },
    {
      icon: <FaBookmark className="text-xl"/>,
      href: "/saved-posts",
      label: "Saved Posts",
    },
    {
      icon: <FaHeart className="text-xl"/>,
      href: "/liked-posts",
      label: "Liked Posts",
    },
  ];

  if (loading || !isLoaded) {
    return <Loader />;
  }

  return (
    <aside className="bg-white h-screen p-6 text-gray-800 w-64 flex flex-col space-y-6 shadow-lg max-md:hidden">
      {/* Logo/Title Section */}
      <div className="text-gray-700 text-3xl font-bold flex items-center space-x-2 pb-4 border-b-[1px] border-gray-300 justify-center">
        <Image src={logo} alt="logo" width={32} height={32} />
        <span>Connect</span>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-4 pb-4 border-b-[1px] border-gray-300">
        <Image
          src={userData?.profilePhoto as string}
          alt="User-profile"
          width={64}
          height={64}
          className="border-2 border-black rounded-full mb-4 h-[3.5rem] w-[3.5rem] object-cover"
        />
        <p className="mb-2 font-semibold text-gray-700">
          {userData?.firstName} {userData?.lastName}
        </p>
        <div className="user-details flex justify-around w-full">
          <div className="text-center">
            <p className="font-semibold text-gray-800">{userData?.posts?.length}</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">{userData?.followers?.length}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">{userData?.following?.length}</p>
            <p className="text-sm text-gray-600">Followings</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 pb-2 border-b-[1px] border-gray-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-gray-200 text-gray-900"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.icon}
              <span className="text-md font-medium">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* User Button Section */}
      <div className="flex gap-4 items-center">
        <UserButton
          appearance={{ baseTheme: dark }}
          afterSignOutUrl="/sign-in/"
        />
        <p className="text-gray-600 text-body-bold">Manage Account</p>
      </div>
    </aside>
  );
};

export default LeftSection;
