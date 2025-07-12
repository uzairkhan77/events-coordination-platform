import EventDetailsView from "@/views/main/events/event-details/event-details.view";
import { useEffect } from "react";

const EventDetailsPage = () => {
  useEffect(() => {
    document.title = "Event Details | Events Coordination";
  }, []);
  return <EventDetailsView />;
};

export default EventDetailsPage;
