import { usePaginatedCreatedEvents } from "@/hooks/firebase/events/usePaginatedCreatedEvents";
import CreateEventDialog from "../modals/createEvent.modal";
import PaginatedEventGrid from "./common/cards.grid";

export const MyEventsView = () => {
  const { events, loading, fetchNextPage, hasMore } =
    usePaginatedCreatedEvents();

  return (
    <PaginatedEventGrid
      title="My Created Events"
      events={events}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={fetchNextPage}
      showCreateButton
      CreateButtonComponent={<CreateEventDialog />}
    />
  );
};
