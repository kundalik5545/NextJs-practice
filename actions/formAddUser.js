"use server";

import { db } from "@/lib/db.config";

//To create form user
export const createFormUser = async (data) => {
  //check all user info is correct
  // create user
  // check user created or not
  // return success and message

  if (!data && !data.email && !data.name) {
    throw new Error("Please enter correct data.");
  }

  const createdUser = await db.user.create({
    data: { ...data },
  });

  if (!createdUser) {
    throw new Error("Error during creating user.");
  }

  const res = await db.user.findUnique({
    where: {
      id: createdUser.id,
    },
  });

  if (res !== null) {
    return {
      success: true,
      message: "User created successfully",
      data: createdUser,
    };
  } else {
    return { success: false, data: null, message: "User creation failed." };
  }
};

//To fetch form user
export const fetchFormUser = async () => {
  //find all users info
  // return all info || if no info return message null
  const allUser = await db.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  if (!allUser) {
    throw new Error("Error during getting all users.");
  }

  if (allUser == null) {
    return { success: true, message: "No User found", data: null };
  }
  if (allUser !== null) {
    return { success: true, message: "Users Records fetched.", data: allUser };
  }
};
//To update form user
export const updateFormUser = async (userId, data) => {
  //Check all info provoided are correct format
  // find user to update
  // update user
  // return success, message || if no user return message, success

  if (!userId && !data) {
    throw new Error("Please provoide all details.");
  }

  const userExist = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (userExist == null) {
    throw new Error("User not found.");
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      email: data.email,
    },
  });
};

//To delete form user
export const deleteFormUser = async (userId) => {
  //Check user info provoided in correct format
  // find user to delete
  // delet user info
  // check user is deleted => null info in db
  // return null
  if (!userId) {
    throw new Error("UserId not provoided.");
  }

  const deletedUser = await db.user.delete({
    where: {
      id: userId,
    },
  });

  const checkDeletedUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (checkDeletedUser == null) {
    return { success: true, message: "User deleted successfully.", data: null };
  }
};
