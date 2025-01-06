"use client";
import {
  createFormUser,
  deleteFormUser,
  fetchFormUser,
  updateFormUser,
} from "@/actions/formAddUser";
import { userSchema } from "@/app/lib/Schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Edit, Loader, Trash } from "lucide-react";

const UserForm = () => {
  //Show form
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [users, setUsers] = useState([]);

  //To Handle form inputs
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "" },
  });

  const {
    data: createdFormUserRes,
    loading,
    fn: createFormUserFn,
    error,
  } = useFetch(createFormUser);

  const getAllUsers = async () => {
    const response = await fetchFormUser();
    if (response.success) {
      setUsers(response.data || []);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //   //Error during api handling
  useEffect(() => {
    if (error) {
      console.log("Error during form handling:- ", error);
    }
  }, [error]);

  useEffect(() => {}, []);
  const onSubmit = async (data) => {
    if (edit) {
      await updateFormUser(edit.id, data);
    } else {
      await createFormUserFn(data);
    }
    getAllUsers();
    setOpen(false);
  };

  const handleEdit = (user) => {
    setEdit(user);
    setOpen(true);
    reset({ name: user.name, email: user.email });
  };

  const handleDeleteUser = async (user) => {
    const response = await deleteFormUser(user.id);
    if (response.success) {
      toast.success(response.message);
      getAllUsers();
    }
  };

  return (
    <>
      <h2 className="gradient-subTitle text-3xl">Form User practice</h2>

      <div className="Add-user-btn py-4">
        <Button className="" type="button" onClick={() => setOpen(!open)}>
          Add User
        </Button>
      </div>

      <div className="form-user">
        {open ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
              <div className="name-sec">
                <Input {...register("name")} placeholder="Enter Name" />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="email-sec">
                <Input {...register("email")} placeholder="Enter Email" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="btn-sec flex gap-3">
                <Button type="submit">{edit ? "Edit User" : "Add User"}</Button>
                <Button
                  type="button"
                  onClick={() => {
                    setEdit(null),
                      setOpen(false),
                      reset({ name: "", email: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Result table */}
      <Suspense fallback={<Loader />}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User EMail</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Action</TableHead>
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
                    <Edit size={18} onClick={() => handleEdit(user)} />{" "}
                    <Trash
                      size={18}
                      style={{ color: "red" }}
                      onClick={() => handleDeleteUser(user)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-sm text-center bg-gray-100"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </Suspense>
    </>
  );
};

export default UserForm;
