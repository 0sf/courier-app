import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useShipmentStore from '../../store/useShipmentStore';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DashLayout from '../../layouts/DashLayout';
import axios from 'axios';
import './css/createShipment.css'

interface ShipmentFormData {
  recipient_name: string;
  recipient_address: string;
  shipment_details: string;
  weight: string;
  dimensions: string;
}

const CreateShipment: React.FC = () => {
  const [formData, setFormData] = useState<ShipmentFormData>({
    recipient_name: '',
    recipient_address: '',
    shipment_details: '',
    weight: '',
    dimensions: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { createShipment: createShipmentAction } = useShipmentStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validations
    if (!formData.recipient_name || !formData.recipient_address) {
      setError('Recipient name and address are required.');
      return;
    }

    // Convert weight to number
    const weightNum = parseFloat(formData.weight);
    if (isNaN(weightNum)) {
      setError('Weight must be a valid number.');
      return;
    }


    try {
      await createShipmentAction({
        ...formData,
        weight: weightNum,
      });
      setSuccess(true);
      setFormData({
        recipient_name: '',
        recipient_address: '',
        shipment_details: '',
        weight: '',
        dimensions: '',
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create shipment.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <DashLayout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Shipment</h2>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle className="text-lg">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertTitle className="text-lg">Success</AlertTitle>
            <AlertDescription>Shipment created successfully! Redirecting to dashboard...</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipient_name" className="text-sm font-medium text-gray-700">
                Recipient Name
              </Label>
              <Input
                type="text"
                id="recipient_name"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required
                className="w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Weight (kg)
              </Label>
              <Input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient_address" className="text-sm font-medium text-gray-700">
              Recipient Address
            </Label>
            <Textarea
              id="recipient_address"
              name="recipient_address"
              value={formData.recipient_address}
              onChange={handleChange}
              required
              className="w-full h-24 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipment_details" className="text-sm font-medium text-gray-700">
              Shipment Details
            </Label>
            <Textarea
              id="shipment_details"
              name="shipment_details"
              value={formData.shipment_details}
              onChange={handleChange}
              className="w-full h-24 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions" className="text-sm font-medium text-gray-700">
              Dimensions
            </Label>
            <Input
              type="text"
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Length x Width x Height (cm)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sender_name" className="text-sm font-medium text-gray-700">
              Sender Name
            </Label>
            <Input
              type="text"
              id="sender_name"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleChange}
              required
              className="w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Create Shipment
            </Button>
          </div>
        </form>
      </div>
    </DashLayout>
  );
};

export default CreateShipment;