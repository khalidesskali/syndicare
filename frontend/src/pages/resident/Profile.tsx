import React from "react";
import { Mail, Phone, Building, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile: React.FC = () => {
  const residentInfo = {
    name: "John Doe",
    email: "john.doe@building.com",
    apartmentNumber: "A-305",
    buildingName: "Sunset Residences",
    phone: "+1 (555) 123-4567",
    moveInDate: "2022-03-15",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-2">
          Your personal and apartment information
        </p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 rounded-full p-4">
                <User className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {residentInfo.name}
              </h2>
              <p className="text-slate-600">
                Resident since {formatDate(residentInfo.moveInDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-slate-900 font-medium">
                  {residentInfo.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-slate-900 font-medium">
                  {residentInfo.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Emergency Contact
                </p>
                <p className="text-slate-900 font-medium">
                  {residentInfo.emergencyContact}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apartment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Apartment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">Building</p>
                <p className="text-slate-900 font-medium">
                  {residentInfo.buildingName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Apartment Number
                </p>
                <p className="text-slate-900 font-medium">
                  {residentInfo.apartmentNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-muted-foreground">Move-in Date</p>
                <p className="text-slate-900 font-medium">
                  {formatDate(residentInfo.moveInDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Account Status</p>
              <p className="font-medium text-slate-900">Active</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Payments</p>
              <p className="font-medium text-slate-900">Up to Date</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Portal Access</p>
              <p className="font-medium text-slate-900">Enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Information Updates
              </h3>
              <p className="mt-2 text-sm text-blue-700">
                If you need to update any of your personal information, please
                contact the building management office. Changes can be made by
                submitting a written request or by visiting the management
                office during business hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
