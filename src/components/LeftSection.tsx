"use client";

import Link from 'next/link';
import { FC } from 'react';
import { usePathname,useRouter } from 'next/navigation';
import { Logout } from '@mui/icons-material';
import { FaHome, FaPen, FaUsers, FaUserEdit } from 'react-icons/fa';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import profile from '@/assets/profile.png';
import logo from '@/assets/connect.png';
import { dark } from '@clerk/themes';

const LeftSection: FC = () => {

  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: <FaHome className="text-xl" /> },
    { href: '/create-post', label: 'Create Post', icon: <FaPen className="text-xl" /> },
    { href: '/people', label: 'People', icon: <FaUsers className="text-xl" /> },
    { href: '/profile', label: 'Edit Profile', icon: <FaUserEdit className="text-xl" /> },
  ];

  return (
    <aside className="bg-teal-500 h-screen p-6 text-white w-64 flex flex-col space-y-6 shadow-lg max-md:hidden">
      {/* Logo/Title Section */}
      <div className="text-white text-3xl font-bold mb-2 flex items-center space-x-2 pb-4 border-b-[1px] border-white justify-center">
        <Image src={logo} alt="logo" width={32} height={32} />
        <span>Connect</span>
      </div>
      
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6 pb-4 border-b-[1px] border-white">
        <Image src={profile} alt="User-profile" width={64} height={64} className="border-2 border-white rounded-full mb-4" />
        <div className="user-details flex justify-around w-full">
          <div className="text-center">
            <p className="font-semibold">1</p>
            <p className="text-sm">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">1</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">1</p>
            <p className="text-sm">Followings</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Links */}
      <ul className="space-y-4 pb-4 border-b-[1px] border-white">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                pathname === link.href
                  ? 'bg-white text-teal-500'
                  : 'hover:bg-white hover:text-teal-500'
              }`}
            >
              {link.icon}
              <span className="text-lg">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      {/* User Button Section */}
      <div className="flex gap-4 items-center">
        <UserButton appearance={{baseTheme:dark}} afterSignOutUrl="/sign-in/" />
        <p className="text-light-1 text-body-bold">Manage Account</p>
      </div>
    
      {/* Sign Out Button (Optional) */}
      <div className="mt-4 flex items-center justify-between">
        <SignOutButton>
          <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors" onClick={ () => router.push('/sign-in')}>
            <Logout />
            <span>Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};

export default LeftSection;
