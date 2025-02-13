import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
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
import './css/TrackPublic.css'

const PublicTrackShipment: React.FC = () => {
    const [trackingNumberInput, setTrackingNumberInput] = useState('');
    const { trackedShipment, loading, error, trackShipment } = useShipmentStore();

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
        <AuthLayout>
            <div className="min-h-screen gradient-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 space-y-8 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                            Track Your Shipment
                        </span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto">
                        <Input
                            type="text"
                            placeholder="Enter Tracking Number"
                            value={trackingNumberInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="tracking-input text-lg p-6 rounded-xl border-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                        <Button
                            onClick={handleTrack}
                            className="w-full sm:w-auto tracking-button px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                        >
                            Track
                        </Button>
                    </div>

                    {loading && (
                        <div className="flex justify-center p-4">
                            <div className="shimmer-effect p-4 rounded-lg w-full max-w-md text-center">
                                Loading shipment details...
                            </div>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="mb-4 border-l-4 border-red-500 rounded-xl bg-red-50">
                            <AlertTitle className="text-lg font-semibold text-red-800">Error</AlertTitle>
                            <AlertDescription className="text-red-600">
                                {error === "404"
                                    ? "The tracking code was not found. Please check the code and try again."
                                    : error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {trackedShipment && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 space-y-4 transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
                                Shipment Details
                            </h3>
                            <Table className="shipment-table divide-y divide-gray-200">
                                <TableBody>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Tracking Number:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.tracking_number}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Status:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.status}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Recipient Name:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.recipient_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Recipient Address:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.recipient_address}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Sender Name:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.sender_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Sender Address:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.sender_address}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Shipment Details:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.shipment_details}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Weight:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.weight}</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="font-medium text-gray-700 py-4">Dimensions:</TableCell>
                                        <TableCell className="text-gray-800">{trackedShipment.dimensions}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <div className="pt-6 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-200 font-medium hover:underline gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default PublicTrackShipment;