import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashLayout from '../../layouts/DashLayout';
import useShipmentStore from '../../store/useShipmentStore';
import { Shipment } from '../../types';
import useAuthStore from '../../store/useAuthStore';
import StatusBadge from '@/components/dashboard/SatusBadge';
import { FaPlus, FaMapPin } from 'react-icons/fa';

const DashboardPage = () => {
  const { shipments, loading: shipmentsLoading, error: shipmentsError, fetchUserShipments } = useShipmentStore();
  const { user, loading: authLoading } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchUserShipments();
    }
  }, [fetchUserShipments, user]);

  if (authLoading || shipmentsLoading) {
    return (
      <DashLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </DashLayout>
    );
  }

  if (shipmentsError) {
    return (
      <DashLayout>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{shipmentsError}</AlertDescription>
        </Alert>
      </DashLayout>
    );
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <DashLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="px-6 py-4 bg-white border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user?.name}!</h2>
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-700">Your Shipments</h3>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link to="/create-shipment">
                <span className="flex items-center gap-2">
                  <FaPlus size={20} /> Create New Shipment
                </span>
              </Link>
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Tracking Number</TableHead>
                  <TableHead className="font-semibold">Recipient</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.length > 0 ? (
                  shipments.map((shipment: Shipment) => (
                    <TableRow key={shipment.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
                      <TableCell>{shipment.recipient_name}</TableCell>
                      <TableCell>
                        <StatusBadge status={shipment.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild className="hover:bg-gray-100">
                            <Link to={`/track/${shipment.tracking_number}`}>
                              <span className="flex items-center gap-1">
                                <FaMapPin size={16} /> Track
                              </span>
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No shipments found. Create your first shipment to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </DashLayout>
  );
};

export default DashboardPage;