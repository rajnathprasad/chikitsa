import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  BedDouble, 
  Activity, 
  Package, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Settings,
  TrendingUp,
  Users,
  Calendar,
  Edit,
  ArrowRightLeft
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { PatientTransferModal } from "./PatientTransferModal";

interface Ward {
  id: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  reservedBeds: number;
  maintenanceBeds: number;
  lastUpdated: string;
}

interface Consumable {
  id: string;
  name: string;
  totalUnits: number;
  usedUnits: number;
  availableUnits: number;
  reorderThreshold: number;
  supplier: string;
  lastOrderedDate: string;
  autoReorder: boolean;
  unitCost: number;
  category: string;
}

interface Equipment {
  id: string;
  name: string;
  total: number;
  available: number;
  inUse: number;
  maintenance: number;
  category: string;
}

export function HospitalResourceManagement() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAddConsumableOpen, setIsAddConsumableOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [wards, setWards] = useState<Ward[]>([
    {
      id: 'general',
      name: 'General Ward',
      totalBeds: 50,
      occupiedBeds: 35,
      reservedBeds: 3,
      maintenanceBeds: 2,
      lastUpdated: '2024-01-19T10:30:00Z'
    },
    {
      id: 'icu',
      name: 'ICU',
      totalBeds: 20,
      occupiedBeds: 18,
      reservedBeds: 1,
      maintenanceBeds: 1,
      lastUpdated: '2024-01-19T11:15:00Z'
    },
    {
      id: 'emergency',
      name: 'Emergency',
      totalBeds: 25,
      occupiedBeds: 15,
      reservedBeds: 2,
      maintenanceBeds: 0,
      lastUpdated: '2024-01-19T09:45:00Z'
    },
    {
      id: 'surgical',
      name: 'Surgical Ward',
      totalBeds: 30,
      occupiedBeds: 22,
      reservedBeds: 1,
      maintenanceBeds: 1,
      lastUpdated: '2024-01-19T08:20:00Z'
    },
    {
      id: 'maternity',
      name: 'Maternity',
      totalBeds: 15,
      occupiedBeds: 8,
      reservedBeds: 0,
      maintenanceBeds: 0,
      lastUpdated: '2024-01-19T07:30:00Z'
    },
    {
      id: 'pediatric',
      name: 'Pediatric',
      totalBeds: 18,
      occupiedBeds: 12,
      reservedBeds: 1,
      maintenanceBeds: 0,
      lastUpdated: '2024-01-19T09:00:00Z'
    }
  ]);

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 'ventilators',
      name: 'Ventilators',
      total: 15,
      available: 3,
      inUse: 11,
      maintenance: 1,
      category: 'Critical Care'
    },
    {
      id: 'xray',
      name: 'X-Ray Machines',
      total: 4,
      available: 2,
      inUse: 2,
      maintenance: 0,
      category: 'Diagnostic'
    },
    {
      id: 'dialysis',
      name: 'Dialysis Machines',
      total: 8,
      available: 3,
      inUse: 4,
      maintenance: 1,
      category: 'Treatment'
    },
    {
      id: 'monitors',
      name: 'Patient Monitors',
      total: 50,
      available: 8,
      inUse: 40,
      maintenance: 2,
      category: 'Monitoring'
    }
  ]);

  const [consumables, setConsumables] = useState<Consumable[]>([
    {
      id: 'syringes',
      name: 'Disposable Syringes',
      totalUnits: 5000,
      usedUnits: 3200,
      availableUnits: 1800,
      reorderThreshold: 1000,
      supplier: 'MedSupply Co.',
      lastOrderedDate: '2024-01-15',
      autoReorder: true,
      unitCost: 2.5,
      category: 'Disposables'
    },
    {
      id: 'gloves',
      name: 'Medical Gloves',
      totalUnits: 10000,
      usedUnits: 7500,
      availableUnits: 2500,
      reorderThreshold: 3000,
      supplier: 'Healthcare Plus',
      lastOrderedDate: '2024-01-12',
      autoReorder: true,
      unitCost: 0.15,
      category: 'PPE'
    },
    {
      id: 'masks',
      name: 'Surgical Masks',
      totalUnits: 8000,
      usedUnits: 6200,
      availableUnits: 1800,
      reorderThreshold: 2000,
      supplier: 'Safety First Inc.',
      lastOrderedDate: '2024-01-10',
      autoReorder: false,
      unitCost: 0.25,
      category: 'PPE'
    },
    {
      id: 'bandages',
      name: 'Sterile Bandages',
      totalUnits: 3000,
      usedUnits: 2100,
      availableUnits: 900,
      reorderThreshold: 500,
      supplier: 'MedSupply Co.',
      lastOrderedDate: '2024-01-08',
      autoReorder: true,
      unitCost: 1.2,
      category: 'Wound Care'
    },
    {
      id: 'oxygen',
      name: 'Oxygen Cylinders',
      totalUnits: 100,
      usedUnits: 75,
      availableUnits: 25,
      reorderThreshold: 30,
      supplier: 'OxyGen Supply',
      lastOrderedDate: '2024-01-14',
      autoReorder: true,
      unitCost: 25.0,
      category: 'Gases'
    }
  ]);

  const totalBeds = wards.reduce((sum, ward) => sum + ward.totalBeds, 0);
  const totalOccupied = wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0);
  const totalAvailable = wards.reduce((sum, ward) => sum + (ward.totalBeds - ward.occupiedBeds - ward.reservedBeds - ward.maintenanceBeds), 0);
  const occupancyRate = Math.round((totalOccupied / totalBeds) * 100);

  const criticalWards = wards.filter(ward => {
    const available = ward.totalBeds - ward.occupiedBeds - ward.reservedBeds - ward.maintenanceBeds;
    return available <= 2;
  });

  const lowStockConsumables = consumables.filter(item => item.availableUnits <= item.reorderThreshold);

  const updateWardOccupancy = (wardId: string, change: number, action: 'admit' | 'discharge') => {
    setWards(prev => 
      prev.map(ward => {
        if (ward.id === wardId) {
          const newOccupied = action === 'admit' 
            ? Math.min(ward.totalBeds - ward.reservedBeds - ward.maintenanceBeds, ward.occupiedBeds + change)
            : Math.max(0, ward.occupiedBeds - change);
          
          return {
            ...ward,
            occupiedBeds: newOccupied,
            lastUpdated: new Date().toISOString()
          };
        }
        return ward;
      })
    );
    
    toast.success(`${action === 'admit' ? 'Admitted' : 'Discharged'} ${change} patient(s) in ${wards.find(w => w.id === wardId)?.name}`);
  };

  const updateConsumableStock = (consumableId: string, change: number, action: 'add' | 'use') => {
    setConsumables(prev => 
      prev.map(item => {
        if (item.id === consumableId) {
          const newUsed = action === 'use' 
            ? Math.min(item.totalUnits, item.usedUnits + change)
            : Math.max(0, item.usedUnits - change);
          
          const newAvailable = item.totalUnits - newUsed;
          
          return {
            ...item,
            usedUnits: newUsed,
            availableUnits: newAvailable
          };
        }
        return item;
      })
    );
    
    const item = consumables.find(c => c.id === consumableId);
    toast.success(`${action === 'add' ? 'Added' : 'Used'} ${change} units of ${item?.name}`);
  };

  const initiateTransfer = () => {
    // Mock patient data for transfer
    const mockPatient = {
      id: 'PAT-001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      disease: 'Acute myocardial infarction requiring immediate cardiac intervention',
      requiredResources: ['ICU Bed', 'Cardiac Monitor', 'Ventilator']
    };
    
    setSelectedPatient(mockPatient);
    setIsTransferModalOpen(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="consumables">Consumables</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Critical Alerts */}
          {(criticalWards.length > 0 || lowStockConsumables.length > 0) && (
            <div className="space-y-4">
              {criticalWards.length > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-orange-900">Low Bed Availability Alert</p>
                          <p className="text-orange-700 text-sm">
                            {criticalWards.length} ward(s) have critically low bed availability
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={initiateTransfer}
                      >
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        Initiate Transfer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {lowStockConsumables.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-900">Low Stock Alert</p>
                          <p className="text-red-700 text-sm">
                            {lowStockConsumables.length} item(s) are below reorder threshold
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Package className="h-4 w-4 mr-2" />
                        Request Supplies
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BedDouble className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Beds</p>
                    <p className="text-2xl font-bold text-gray-900">{totalBeds}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available Beds</p>
                    <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-purple-600">{occupancyRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Package className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                    <p className="text-2xl font-bold text-red-600">{lowStockConsumables.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ward Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Ward Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wards.map((ward) => {
                  const available = ward.totalBeds - ward.occupiedBeds - ward.reservedBeds - ward.maintenanceBeds;
                  const occupancyPercentage = (ward.occupiedBeds / ward.totalBeds) * 100;
                  
                  return (
                    <Card key={ward.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{ward.name}</h3>
                          <Badge className={
                            available <= 2 ? 'bg-red-100 text-red-800' :
                            available <= 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {available} available
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Occupancy</span>
                            <span>{ward.occupiedBeds}/{ward.totalBeds}</span>
                          </div>
                          <Progress value={occupancyPercentage} className="h-2" />
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <span>Reserved: {ward.reservedBeds}</span>
                            <span>Maintenance: {ward.maintenanceBeds}</span>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            Updated: {formatDateTime(ward.lastUpdated)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Equipment Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Critical Equipment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.available} available</p>
                      <p className="text-xs text-gray-600">{item.inUse} in use</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bed Management by Ward</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ward</TableHead>
                    <TableHead>Total Beds</TableHead>
                    <TableHead>Occupied</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Reserved</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wards.map((ward) => {
                    const available = ward.totalBeds - ward.occupiedBeds - ward.reservedBeds - ward.maintenanceBeds;
                    
                    return (
                      <TableRow key={ward.id}>
                        <TableCell className="font-medium">{ward.name}</TableCell>
                        <TableCell>{ward.totalBeds}</TableCell>
                        <TableCell>{ward.occupiedBeds}</TableCell>
                        <TableCell>
                          <Badge className={
                            available <= 2 ? 'bg-red-100 text-red-800' :
                            available <= 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {available}
                          </Badge>
                        </TableCell>
                        <TableCell>{ward.reservedBeds}</TableCell>
                        <TableCell>{ward.maintenanceBeds}</TableCell>
                        <TableCell className="text-sm">{formatDateTime(ward.lastUpdated)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateWardOccupancy(ward.id, 1, 'admit')}
                              disabled={available <= 0}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateWardOccupancy(ward.id, 1, 'discharge')}
                              disabled={ward.occupiedBeds <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumables" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Consumables Management</CardTitle>
                <Dialog open={isAddConsumableOpen} onOpenChange={setIsAddConsumableOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Consumable Stock</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Item Name</Label>
                        <Input placeholder="Enter item name" />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input type="number" placeholder="Number of units" />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="disposables">Disposables</SelectItem>
                            <SelectItem value="ppe">PPE</SelectItem>
                            <SelectItem value="wound-care">Wound Care</SelectItem>
                            <SelectItem value="gases">Gases</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddConsumableOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setIsAddConsumableOpen(false);
                          toast.success("Stock added successfully");
                        }}>
                          Add Stock
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Reorder Threshold</TableHead>
                    <TableHead>Auto Reorder</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consumables.map((item) => {
                    const stockPercentage = (item.availableUnits / item.totalUnits) * 100;
                    const isLowStock = item.availableUnits <= item.reorderThreshold;
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.availableUnits}</TableCell>
                        <TableCell>{item.usedUnits}</TableCell>
                        <TableCell className="w-32">
                          <div className="space-y-1">
                            <Progress value={stockPercentage} className="h-2" />
                            <p className="text-xs text-gray-600">
                              {item.availableUnits}/{item.totalUnits}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={isLowStock ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                            {item.reorderThreshold}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={item.autoReorder ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {item.autoReorder ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateConsumableStock(item.id, 100, 'add')}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateConsumableStock(item.id, 10, 'use')}
                              disabled={item.availableUnits <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {equipment.map((item) => (
                  <Card key={item.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="font-medium text-green-800">{item.available}</p>
                            <p className="text-green-600">Available</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <p className="font-medium text-blue-800">{item.inUse}</p>
                            <p className="text-blue-600">In Use</p>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <p className="font-medium text-orange-800">{item.maintenance}</p>
                            <p className="text-orange-600">Maintenance</p>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Utilization</span>
                            <span>{item.inUse}/{item.total}</span>
                          </div>
                          <Progress value={(item.inUse / item.total) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="h-3 w-3 mr-1" />
                            Maintain
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PatientTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />
    </div>
  );
}