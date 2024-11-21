import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New message received",
    message: "You have a new message from PathFinder.",
    timestamp: "2 minutes ago",
  },
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </header>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className="border-0 bg-gray-300 dark:bg-gray-800 rounded-xl "
          >
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <div>
                <CardTitle className="text-xl lg:text-2xl text-black dark:text-white">
                  {notification.title}
                </CardTitle>
                <CardDescription className="text-blue-700 text-sm font-normal">
                  {notification.timestamp}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-gray-400 p-4">
              <p>{notification.message}</p>
            </CardContent>
          </Card>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications</p>
        )}
      </div>
    </div>
  );
}
