import { MyEventsView } from "@/views/main/events/my-events.view";
import { useEffect } from "react";

export const MyEventsPage = () => {
  useEffect(() => {
    document.title = "My Events | Events Coordination";
  }, []);
  return <MyEventsView />;
};
