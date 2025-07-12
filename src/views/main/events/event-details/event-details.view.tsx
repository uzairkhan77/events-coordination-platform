import { useParams } from "react-router-dom";
import { useEventById } from "@/hooks/firebase/events/useEventById";
import { useUserById } from "@/hooks/firebase/users/userUserById";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  User2Icon,
} from "lucide-react";
import EventMessages from "../messages/messages.view";

const EventDetailsView = () => {
  const { id } = useParams();
  const { event, loading, error } = useEventById(id || "");

  const { user: creator } = useUserById(event?.createdBy || "");

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="p-6 text-center text-destructive font-semibold">
        {error || "Event not found"}
      </div>
    );
  }

  const creatorInitial = creator?.displayName
    ? creator.displayName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <p className="text-muted-foreground">{event.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="w-4 h-4" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon className="w-4 h-4" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UsersIcon className="w-4 h-4" />
            <span>{event.participants.length} participant(s)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User2Icon className="w-4 h-4" />
            <span>Created by {creator?.email || "Unknown"}</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback>{creatorInitial}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500">
              {creator?.displayName || creator?.email || "User"}
            </span>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground">
            Created on{" "}
            {event.createdAt.toDate().toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </CardContent>
      </Card>
      <EventMessages />
    </div>
  );
};

export default EventDetailsView;
