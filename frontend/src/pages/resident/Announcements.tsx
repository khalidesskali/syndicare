import React from "react";
import { Megaphone, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockAnnouncements } from "../../data/mockData";

const Announcements: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-600 mt-2">
          Stay updated with the latest building news and notices
        </p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Megaphone className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {announcement.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {announcement.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{announcement.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(announcement.date)}</span>
                      </div>
                    </div>
                    <div className="text-xs">
                      {getRelativeTime(announcement.date)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (for when no announcements) */}
      {mockAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Announcements
            </h3>
            <p className="text-muted-foreground">
              There are no announcements at this time.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Megaphone className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Stay Informed
              </h3>
              <p className="text-blue-700">
                Check this page regularly for important building updates,
                maintenance schedules, and community events.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcements;
