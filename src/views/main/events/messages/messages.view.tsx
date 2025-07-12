import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useFetchEventMessages } from "@/hooks/firebase/messages/useFetchEventMessages";
import MessageItem from "./message-item";

const EventMessages = () => {
  const { id: eventId } = useParams();
  const [text, setText] = useState("");
  const { messages, loading, sendMessage } = useFetchEventMessages(
    eventId || ""
  );

  const handleSend = async () => {
    await sendMessage(text);
    setText("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        <div className="flex items-center gap-2 pt-4">
          <Input
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          messages.map((msg, id) => (
            <MessageItem
              createdAt={msg.createdAt}
              createdBy={msg.createdBy}
              id={msg.id}
              message={msg.message}
              key={id}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EventMessages;
