import { usePaginatedParticipantEvents } from "@/hooks/firebase/events/usePaginatedParticipantEvents";
import CreateEventDialog from "../modals/createEvent.modal";
import PaginatedEventGrid from "./common/cards.grid";

const EventsView = () => {
  const { events, loading, fetchNextPage, hasMore, refetch } =
    usePaginatedParticipantEvents();

  return (
    <PaginatedEventGrid
      title="My Participating Events"
      events={events}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={fetchNextPage}
      showCreateButton
      CreateButtonComponent={CreateEventDialog}
      refetch={refetch}
    />
  );
};

export default EventsView;
