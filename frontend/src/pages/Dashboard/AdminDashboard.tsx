import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash } from "lucide-react"
import { FaPlus } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useShipmentStore from '../../store/useShipmentStore';
import { Shipment } from '../../types';
import DashLayout from '../../layouts/DashLayout';
import { Portal } from "@radix-ui/react-portal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";

const AdminDashboard: React.FC = () => {
  const {
    allShipments,
    loading,
    error,
    fetchAllShipments,
    updateShipmentStatus,
    deleteShipment,
  } = useShipmentStore();
  const [deleteShipmentId, setDeleteShipmentId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllShipments();
  }, [fetchAllShipments]);

  const handleStatusChange = async (shipmentId: number, newStatus: string) => {
    try {
      await updateShipmentStatus(shipmentId, newStatus);

    } catch (error) {

      console.error("Failed to update status:", error);
    }
  };

  const openDeleteConfirmation = (shipmentId: number) => {
    setDeleteShipmentId(shipmentId);
  };


  const closeDeleteConfirmation = () => {
    setDeleteShipmentId(null);
  };


  const handleDelete = async () => {
    if (deleteShipmentId !== null) {
      try {
        await deleteShipment(deleteShipmentId);
        closeDeleteConfirmation(); 
      } catch (error) {
        console.error("Failed to delete shipment:", error);
      }
    }
  };

  if (loading) {
    return (
      <DashLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading shipments...</p>
        </div>
      </DashLayout>
    );
  }

  if (error) {
    return (
      <DashLayout>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </DashLayout>
    );
  }

  return (
    <DashLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-700">Shipments Overview</h3>
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
                {allShipments.length > 0 ? (
                  allShipments.map((shipment: Shipment) => (
                    <TableRow key={shipment.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">
                        {shipment.tracking_number}
                      </TableCell>
                      <TableCell>{shipment.recipient_name}</TableCell>
                      <TableCell>
                        <Select
                          value={shipment.status}
                          onValueChange={(value) => handleStatusChange(shipment.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <Portal>
                            <SelectContent
                              position="popper"
                              className="z-[9999] bg-white shadow-lg border rounded-md"
                              sideOffset={5}
                            >
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                              <SelectItem value="Exception">Exception</SelectItem>
                            </SelectContent>
                          </Portal>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild className="hover:bg-gray-100">
                            <Link to={`/track/${shipment.tracking_number}`}>
                              Track
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openDeleteConfirmation(shipment.id)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No shipments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* Global delete confirmation dialog */}
      {deleteShipmentId !== null && (
        <AlertDialog
          open
          onOpenChange={(open) => {
            if (!open) closeDeleteConfirmation();
          }}
        >
          {/* Render the overlay with a lower z-index */}
          <AlertDialogOverlay className="fixed inset-0 z-40 bg-black/50" />

          {/* Wrap the content in a container that centers it and sets a higher z-index */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <AlertDialogContent className="bg-white rounded-xl shadow p-6">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the shipment.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDeleteConfirmation}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </div>
        </AlertDialog>
      )}
    </DashLayout>
  );
};

export default AdminDashboard;