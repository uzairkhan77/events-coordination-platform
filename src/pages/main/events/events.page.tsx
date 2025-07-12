import EventsView from "@/views/main/events/events.view";
import { useEffect } from "react";

export const EventsPage = () => {
  useEffect(() => {
    document.title = "Events | Events Coordination";
  }, []);
  return (
    <>
      <EventsView />
    </>
  );
};
