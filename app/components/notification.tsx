import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Zap, Star, MessageSquare } from "lucide-react";

export const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New AI Insight",
      description:
        "Your AI assistant has generated a new insight based on your recent conversations.",
      type: "insight",
    },
    {
      id: 2,
      title: "Goal Reminder",
      description:
        "Don't forget to work on your 'Improve Communication' goal today.",
      type: "reminder",
    },
    {
      id: 3,
      title: "Chat Summary Ready",
      description: "Your weekly chat summary is now available for review.",
      type: "summary",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
          >
            {notifications.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Notifications
            </h4>
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 last:mb-0">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-muted rounded-full p-1">
                    {notification.type === "insight" && (
                      <Zap className="h-5 w-5 text-muted-foreground" />
                    )}
                    {notification.type === "reminder" && (
                      <Star className="h-5 w-5 text-muted-foreground" />
                    )}
                    {notification.type === "summary" && (
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
