"use server";

import { db } from "@/lib/db.config";

export const createUser = async (data) => {
  const createdUser = await db.user.create({ data: { ...data } });

  return { success: true, data: createdUser, message: "User created." };
};

export const fetchUser = async () => {
  const allUsers = await db.user.findMany({
    orderBy: {
      createdAt: "asc", // Order by 'createdAt' in descending order
    },
  });

  return { success: true, data: allUsers, message: "User created." };
};

export const updateUser = async (userId, data) => {
  // console.log("User id is:- ", userId);
  // console.log("User data is:- ", data);

  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid userId");
  }

  console.log("Data type check:", typeof data); // Should log 'object'

  try {
    // console.log("Prisma update params:", {
    //   where: { id: userId },
    //   data: { name: data.name, email: data.email },
    // });

    // Update the user in the database using Prisma
    const updatedUser = await db.user.update({
      where: { id: userId }, // Find user by ID
      data: {
        name: data.name, // Update the name
        email: data.email, // Update the email
      },
    });

    // console.log("Updated user:", updatedUser);
    return { success: true, message: "User updated", data: updatedUser }; // Return the updated user object
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user.");
  }
};
