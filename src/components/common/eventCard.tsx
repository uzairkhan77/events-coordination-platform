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
    <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow rounded-2xl border relative overflow-visible">
      {isMyEvent && (
        <Badge className="absolute top-2 right-2 z-10" variant="secondary">
          My Event
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{event.description}</p>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(`${event.date}T${event.time}`), "PPpp")}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback>{creatorInitial}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500">
            Created by {creator?.email || "Unknown"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
