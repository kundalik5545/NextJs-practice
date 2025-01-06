"use client";

import { userSchema } from "@/app/lib/Schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
} from "@/actions/addUser";
import { Edit, Loader, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CrudPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [target, setTarget] = useState(null); // This will store the user to be edited
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "" },
  });

  const {
    data: createdUser,
    loading,
    fn: createUserFn,
    error,
  } = useFetch(createUser);

  // Fetch Users on page load
  const fetchUsers = async () => {
    try {
      const response = await fetchUser();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Handle form submission (for creating and updating users)
  const onSubmit = async (data) => {
    if (target) {
      // If target is set, this is an update request
      await updateUser(target.id, data); // Assuming updateUser is an API method
      toast.success("User updated successfully.");
    } else {
      await createUserFn(data);
      toast.success("User created successfully.");
    }
    reset({ name: "", email: "" }); // Reset form after submission
    setTarget(null); // Clear target after submission
    fetchUsers(); // Fetch users after creation or update
    setOpen(false);
  };

  const handleEditClick = (user) => {
    setOpen(true);
    setTarget(user); // Set target user to be edited
    reset({ name: user.name, email: user.email }); // Pre-fill the form with the user's current data
  };

  // Testing data
  // const testUpdateUser = async () => {
  //   const testUserId = 2;
  //   const testUserData = { name: "Test Name", email: "test@example.com" };

  //   try {
  //     const updatedUser = await updateUser(testUserId, testUserData);
  //     console.log("Updated User:", updatedUser);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // testUpdateUser();

  const handleDeleteUser = async (user) => {
    const response = await deleteUser(user.id);

    if (response.success) {
      fetchUsers();
    }
  };

  return (
    <>
      <div className="form-section">
        <h2 className="text-3xl gradient-subTitle tracking-wider">
          <span className="gradient-title">CRUD</span> with Next.js, Prisma,
          PostgreSQL, Zod, and useForm
        </h2>

        <div className="flex gap-3">
          <Button onClick={() => setOpen(!open)} className="">
            {target ? "Edit User" : "Add User"}
          </Button>
          <Button
            onClick={() => {
              setOpen(false), setTarget(null), reset({ name: "", email: "" });
            }}
            className=""
          >
            Cancel
          </Button>
        </div>

        {/* Form */}
        {open && (
          <div className="display-form pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
              <div className="name space-y-2">
                <Input {...register("name")} placeholder="Enter Name" />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="email space-y-2">
                <Input {...register("email")} placeholder="Enter Email" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="btn flex gap-3">
                <Button type="submit">
                  {loading ? (
                    <>
                      <Loader />
                      {target ? "Updating..." : "Creating..."}
                    </>
                  ) : target ? (
                    "Update User"
                  ) : (
                    "Create User"
                  )}
                </Button>
                <Button
                  onClick={() => reset({ name: "", email: "" })}
                  type="button"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Display Users */}
        <div className="display-user mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UserID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user.id || index}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(user.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Edit
                        size={18}
                        style={{ color: "black" }}
                        onClick={() => handleEditClick(user)} // Trigger edit
                      />
                      <Trash
                        size={18}
                        style={{ color: "red" }}
                        onClick={() => handleDeleteUser(user)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CrudPage;
