interface StatusBadgeProps {
    status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'in transit':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusStyles(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;