"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { tabs } from "@/constants";
import Link from "next/link";

const ProfileCard = ({
  userData,
  activeTab,
}: {
  userData: any;
  activeTab: any;
}) => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<any>({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const isFollowing = userInfo?.following?.find(
    (item:any) => item?._id === userData?._id
  );

  const handleFollow = async () => {
    const response = await fetch(
      `/api/user/${user?.id}/follow/${userData?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserInfo(data);
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9 pb-4 border-b-[1px] border-black">
      <div className="flex justify-between items-start">
        <div className="flex gap-5 items-start">
          <Image
            src={userData?.profilePhoto}
            alt="profile photo"
            width={100}
            height={100}
            className="rounded-full md:max-lg:hidden"
          />

          <div className="flex flex-col gap-3">
            <p className=" text-2xl max-sm:text-xl">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className=" text-subtle-semibold">
              @{userData?.username}
            </p>
            <div className="flex gap-7 text-small-bold max-sm:gap-4">
              <div className="flex flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="">{userData?.posts?.length}</p>
                <p className="">Posts</p>
              </div>
              <div className="flex flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="">{userData?.followers?.length}</p>
                <p className="">Followers</p>
              </div>
              <div className="flex flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="">{userData?.following?.length}</p>
                <p className="">Following</p>
              </div>
            </div>
          </div>
        </div>

        {user?.id !== userData.clerkId &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ))}
      </div>

      <div className="flex gap-6">
        {tabs.map((tab:any) => (
          <Link
            className={`tab px-4 py-2 rounded-2xl border-[1px] border-black shadow-md ${
              activeTab === tab.name ? "bg-white text-black" : "bg-black text-white "
            }`}
            href={`/profile/${userData._id}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
