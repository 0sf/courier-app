import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useShipmentStore from '../../store/useShipmentStore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashLayout from '../../layouts/DashLayout';


const TrackShipment: React.FC = () => {
    const { trackingNumber: trackingNumberParam } = useParams<{ trackingNumber: string }>();
    const [trackingNumberInput, setTrackingNumberInput] = useState(trackingNumberParam || '');
    const { trackedShipment, loading, error, trackShipment, clearTrackedShipment } = useShipmentStore();


    useEffect(() => {
        if (trackingNumberParam) {
            setTrackingNumberInput(trackingNumberParam);
            trackShipment(trackingNumberParam);
        }
        return () => {
            clearTrackedShipment();
        }
    }, [trackingNumberParam, trackShipment, clearTrackedShipment]);

    const handleTrack = () => {
        if (trackingNumberInput) {

            trackShipment(trackingNumberInput);
            setTrackingNumberInput('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingNumberInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTrack();
        }
    };

    return (
        <DashLayout>
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-500">Track Shipment</h2>
                        {(trackingNumberParam || trackedShipment) && (
                            <Link 
                                to="/dashboard" 
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                <span className="mr-2">←</span> Back to Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-3 text-amber-100">
                            <Input
                                type="text"
                                placeholder="Enter Tracking Number"
                                value={trackingNumberInput}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                className="flex-1 text-lg"
                            />
                            <Button 
                                onClick={handleTrack}
                                variant={"outline"}
                                className="w-full sm:w-auto px-8"
                            >
                                Track Package
                            </Button>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-8">
                            <p className="text-gray-600 dark:text-gray-400">Loading shipment details...</p>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="border-red-200">
                            <AlertTitle className="text-lg">Error</AlertTitle>
                            <AlertDescription className="text-sm">{error}</AlertDescription>
                        </Alert>
                    )}

                    {trackedShipment && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                Shipment Details
                            </h3>
                            <Table>
                                <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Tracking Number:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.tracking_number}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Status:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.status}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Recipient Name:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.recipient_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Recipient Address:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.recipient_address}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Sender Name:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.sender_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Sender Address:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.sender_address}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Shipment Details:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.shipment_details}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Weight:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.weight}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="py-4 font-medium text-gray-700 dark:text-gray-300">
                                            Dimensions:
                                        </TableCell>
                                        <TableCell className="py-4 text-gray-900 dark:text-gray-100">
                                            {trackedShipment.dimensions}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </DashLayout>
    );
};

export default TrackShipment;