import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface DetailItem {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DetailSection {
  title: string;
  items: DetailItem[];
}

export interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sections: DetailSection[];
  statusBadge?: {
    text: string;
    className: string;
  };
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "destructive";
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  size?: "sm" | "md" | "lg";
}

export function DetailsModal({
  isOpen,
  onClose,
  title,
  sections,
  statusBadge,
  actions = [],
  size = "md",
}: DetailsModalProps) {
  const sizeClasses = {
    sm: "sm:max-w-[500px]",
    md: "sm:max-w-[700px]",
    lg: "sm:max-w-[900px]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${sizeClasses[size]} bg-white border-slate-200 shadow-xl`}
      >
        <DialogHeader className="flex justify-between items-start">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
              {title}
            </DialogTitle>
            {statusBadge && (
              <Badge className={`mb-4 ${statusBadge.className}`}>
                {statusBadge.text}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    {item.icon && (
                      <item.icon className="h-5 w-5 text-slate-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <p className="text-slate-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {actions.length > 0 && (
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <div className="flex space-x-3">
                {actions.slice(0, -1).map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "outline"}
                    onClick={action.onClick}
                    className={
                      action.variant === "destructive"
                        ? "border-red-200 text-red-600 hover:bg-red-50"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    {action.icon &&
                      React.createElement(action.icon, {
                        className: "mr-2 h-4 w-4",
                      })}
                    {action.label}
                  </Button>
                ))}
              </div>
              {actions.length > 0 && (
                <Button
                  variant={actions[actions.length - 1].variant || "outline"}
                  onClick={actions[actions.length - 1].onClick}
                  className={
                    actions[actions.length - 1].variant === "destructive"
                      ? "border-red-200 text-red-600 hover:bg-red-50"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }
                >
                  {actions[actions.length - 1].icon &&
                    React.createElement(actions[actions.length - 1].icon, {
                      className: "mr-2 h-4 w-4",
                    })}
                  {actions[actions.length - 1].label}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
