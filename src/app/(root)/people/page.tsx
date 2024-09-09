"use client";

import Loader from "@/components/Loader";
import UserCard from "@/components/UserCard";
import React, { useEffect, useState } from "react";

const People = () => {
  const [loading, setLoading] = useState(true);

  const [allUsers, setAllUsers] = useState<any>([]);

  const getAllUsers = async () => {
    const response = await fetch(`/api/user`);
    const data = await response.json();
    setAllUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-50">
      <h1 className="text-2xl font-bold underline p-4">People</h1>
      <div className="flex flex-col gap-4 p-6">
        {allUsers?.map((user: any) => (
          <div className="border-b border-[#FFD700] pb-4">
            <UserCard key={user.id} userData={user} update={getAllUsers} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
