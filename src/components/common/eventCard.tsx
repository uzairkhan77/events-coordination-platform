import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { auth } from "@/services/firebase/config";
import type { EventData } from "@/types/interface/common.interface";
import { useUserById } from "@/hooks/firebase/users/userUserById";

interface EventCardProps {
  event: EventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const currentUser = auth.currentUser;
  const isMyEvent = currentUser?.uid === event.createdBy;

  const { user: creator } = useUserById(event.createdBy);

  const creatorInitial = creator?.displayName
    ? creator?.displayName.charAt(0).toUpperCase()
    : "U";

  return (
    <Link to={`/events/${event.id}`} className="block">
      <Card
        className="w-full max-w-md shadow-md hover:shadow-lg transition-transform rounded-2xl border relative overflow-visible hover:cursor-pointer
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        xl:max-w-2xl
        p-4
        mx-auto
        hover:scale-105 duration-300
        "
      >
        {isMyEvent && (
          <Badge
            className="absolute top-2 right-2 z-10 bg-red-300"
            variant="secondary"
          >
            My Event
          </Badge>
        )}

        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg sm:text-xl font-semibold break-words">
            {event.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm sm:text-base text-muted-foreground p-0">
          <p className="break-words">{event.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="truncate">
              {format(new Date(`${event.date}T${event.time}`), "PPpp")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback>{creatorInitial}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500 truncate">
              Created by {creator?.email || "Unknown"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
