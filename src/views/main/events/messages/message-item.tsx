import { useUserById } from "@/hooks/firebase/users/userUserById";
import { format } from "date-fns";

interface MessageItemProps {
  id: string;
  message: string;
  createdBy: string;
  createdAt: Date;
}

const MessageItem = ({
  id,
  message,
  createdBy,
  createdAt,
}: MessageItemProps) => {
  const { user } = useUserById(createdBy);

  return (
    <div key={id} className="border-b pb-2 text-sm">
      <div className="font-semibold">
        {user?.email}{" "}
        <span className="text-xs text-gray-400 ml-1">
          {format(new Date(createdAt), "PPpp")}
        </span>
      </div>
      <div className="text-muted-foreground">{message}</div>
    </div>
  );
};

export default MessageItem;
