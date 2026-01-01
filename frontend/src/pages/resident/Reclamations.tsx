import React, { useState } from "react";
import { Plus, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockReclamations } from "../../data/mockData";
import type { Reclamation } from "../../types/residentPortal";

const Reclamations: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as Reclamation["priority"],
  });

  const getStatusIcon = (status: Reclamation["status"]) => {
    const icons = {
      PENDING: Clock,
      IN_PROGRESS: AlertCircle,
      RESOLVED: CheckCircle,
      REJECTED: XCircle,
    };
    return icons[status];
  };

  const getStatusBadge = (status: Reclamation["status"]) => {
    const variants = {
      PENDING: "secondary",
      IN_PROGRESS: "default",
      RESOLVED: "default",
      REJECTED: "destructive",
    } as const;

    const Icon = getStatusIcon(status);

    return (
      <Badge variant={variants[status]} className="flex items-center">
        <Icon className="h-3 w-3 mr-1" />
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Reclamation["priority"]) => {
    const variants = {
      LOW: "outline",
      MEDIUM: "secondary",
      HIGH: "destructive",
    } as const;

    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New reclamation:", formData);
    // Reset form
    setFormData({ title: "", description: "", priority: "MEDIUM" });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reclamations</h1>
          <p className="text-slate-600 mt-2">
            Submit and track your complaints and requests
          </p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Reclamation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Reclamation</DialogTitle>
                <DialogDescription>
                  Submit a new complaint or request to the building management.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed description of the issue"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        priority: value as Reclamation["priority"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reclamations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReclamations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockReclamations.filter((r) => r.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {
                mockReclamations.filter((r) => r.status === "IN_PROGRESS")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockReclamations.filter((r) => r.status === "RESOLVED").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reclamations List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reclamations</CardTitle>
          <CardDescription>
            Track the status of your submitted reclamations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReclamations.map((reclamation) => (
              <div
                key={reclamation.id}
                className="border rounded-lg p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {reclamation.title}
                      </h3>
                      {getStatusBadge(reclamation.status)}
                      {getPriorityBadge(reclamation.priority)}
                    </div>
                    <p className="text-slate-600 mb-3 leading-relaxed">
                      {reclamation.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>
                        Created on {formatDate(reclamation.createdDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reclamations;
