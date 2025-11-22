import { BedDouble, User, AlertCircle, Wrench } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Bed {
  id: string;
  number: string;
  status: 'empty' | 'occupied' | 'cleaning' | 'maintenance';
  patient?: {
    id: string;
    name: string;
    age: number;
    gender: string;
    contact: string;
    address: string;
    aadhaar: string;
    disease: string;
    doctor: string;
    admissionDate: string;
    emergencyContact: string;
  };
}

interface BedGridProps {
  beds: Bed[];
  onBedClick: (bed: Bed) => void;
}

export function BedGrid({ beds, onBedClick }: BedGridProps) {
  const getBedColor = (status: Bed['status']) => {
    switch (status) {
      case 'empty':
        return 'bg-gray-200 border-gray-300 text-gray-600 hover:bg-gray-300';
      case 'occupied':
        return 'bg-sky-100 border-sky-300 text-sky-700 hover:bg-sky-200';
      case 'cleaning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200';
      case 'maintenance':
        return 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-200 border-gray-300 text-gray-600';
    }
  };

  const getBedIcon = (status: Bed['status']) => {
    switch (status) {
      case 'occupied':
        return User;
      case 'cleaning':
        return AlertCircle;
      case 'maintenance':
        return Wrench;
      default:
        return BedDouble;
    }
  };

  const getTooltipText = (bed: Bed) => {
    switch (bed.status) {
      case 'empty':
        return `${bed.number} - Click to admit patient`;
      case 'occupied':
        return `${bed.number} - ${bed.patient?.name} - Click to view/discharge`;
      case 'cleaning':
        return `${bed.number} - Under cleaning`;
      case 'maintenance':
        return `${bed.number} - Under maintenance`;
      default:
        return bed.number;
    }
  };

  if (beds.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        <div className="text-center">
          <BedDouble className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No beds in this department</p>
          <p className="text-sm">Click "Add Bed" to add the first bed</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {beds.map((bed) => {
          const IconComponent = getBedIcon(bed.status);
          
          return (
            <Tooltip key={bed.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onBedClick(bed)}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all duration-200 
                    transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${getBedColor(bed.status)}
                  `}
                  disabled={bed.status === 'cleaning' || bed.status === 'maintenance'}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs font-medium">{bed.number}</span>
                  </div>
                  
                  {bed.status === 'occupied' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  )}
                  
                  {bed.status === 'maintenance' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                  )}
                  
                  {bed.status === 'cleaning' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border border-white"></div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText(bed)}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}