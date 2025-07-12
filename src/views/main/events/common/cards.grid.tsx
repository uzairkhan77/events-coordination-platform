import EventCard from "@/components/common/eventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { EventData } from "@/types/interface/common.interface";
import type { ComponentType } from "react";

interface PaginatedEventGridProps {
  title: string;
  events: EventData[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  CreateButtonComponent?: ComponentType;
  showCreateButton?: boolean;
}

const PaginatedEventGrid = ({
  title,
  events,
  loading,
  hasMore,
  onLoadMore,
  CreateButtonComponent,
  showCreateButton = false,
}: PaginatedEventGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6 py-6 px-4">
      <div className="flex flex-col md:flex-row gap-y-5 items-start justify-between md:items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {showCreateButton && CreateButtonComponent && <CreateButtonComponent />}
      </div>

      {/* Loading Skeletons */}
      {loading && events.length === 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-muted-foreground">No events found.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button onClick={onLoadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaginatedEventGrid;
