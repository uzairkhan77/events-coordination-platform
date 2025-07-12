"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateEvent } from "@/hooks/firebase/events/useCreateEvent";
import {
  useUserSearch,
  type UserProfile,
} from "@/hooks/firebase/users/useUserSearch";

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [invitees, setInvitees] = useState<UserProfile[]>([]);

  const { searchResults, searchUsers, loading } = useUserSearch();
  const { createEvent } = useCreateEvent();

  const handleSelectInvitee = (user: UserProfile) => {
    if (!invitees.find((u) => u.uid === user.uid)) {
      setInvitees((prev) => [...prev, user]);
    }
    setSearchInput("");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createEvent({
        ...values,
        participants: invitees.map((u) => u.uid), // Pass UIDs
      });
      resetForm();
      setInvitees([]);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-2">
          {/* Basic Inputs */}
          <Input
            name="title"
            placeholder="Event Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-sm text-red-500">{formik.errors.title}</p>
          )}

          <Textarea
            name="description"
            placeholder="Event Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-sm text-red-500">{formik.errors.description}</p>
          )}

          <Input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            name="location"
            placeholder="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {/* Invite Users */}
          <div>
            <Input
              placeholder="Invite user by email"
              value={searchInput}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInput(val);
                if (val.trim()) searchUsers(val);
              }}
            />

            {searchInput && (
              <div className="border rounded mt-2 p-2 max-h-40 overflow-y-auto">
                {loading && (
                  <p className="text-sm text-muted-foreground">Searching...</p>
                )}
                {searchResults.map((user) => (
                  <div
                    key={user.uid}
                    className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                    onClick={() => handleSelectInvitee(user)}
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            )}

            {/* Selected Users */}
            {invitees.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Invitees:</p>
                <ul className="list-disc pl-5 text-sm">
                  {invitees.map((user) => (
                    <li key={user.uid}>{user.email}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
