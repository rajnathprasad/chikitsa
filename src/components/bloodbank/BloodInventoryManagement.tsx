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
import { 
  Droplets, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Calendar, 
  TrendingDown,
  Package,
  Edit,
  Trash2,
  Send
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { SendAlertsModal } from "./SendAlertsModal";

interface BloodBatch {
  id: string;
  bloodGroup: string;
  units: number;
  availableUnits: number;
  collectedDate: string;
  expiryDate: string;
  donorId: string;
  location: string;
  status: 'available' | 'expired' | 'reserved' | 'used';
}

interface BloodGroupStock {
  bloodGroup: string;
  totalUnits: number;
  availableUnits: number;
  minThreshold: number;
  status: 'good' | 'low' | 'critical';
  batches: BloodBatch[];
}

interface AlertHistory {
  id: string;
  bloodGroup: string;
  radius: number;
  estimatedRecipients: number;
  message: string;
  timestamp: string;
  status: 'sent' | 'failed' | 'partial';
}

export function BloodInventoryManagement() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isSendAlertOpen, setIsSendAlertOpen] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [alertHistory, setAlertHistory] = useState<AlertHistory[]>([
    {
      id: '1',
      bloodGroup: 'O-',
      radius: 5,
      estimatedRecipients: 42,
      message: 'Urgent: O- blood needed for emergency surgery',
      timestamp: '2024-01-19T14:30:00Z',
      status: 'sent'
    },
    {
      id: '2',
      bloodGroup: 'AB-',
      radius: 10,
      estimatedRecipients: 18,
      message: 'Critical shortage of AB- blood units',
      timestamp: '2024-01-18T09:15:00Z',
      status: 'sent'
    }
  ]);

  const [bloodStock, setBloodStock] = useState<BloodGroupStock[]>([
    {
      bloodGroup: 'A+',
      totalUnits: 45,
      availableUnits: 25,
      minThreshold: 15,
      status: 'good',
      batches: [
        {
          id: 'batch-001',
          bloodGroup: 'A+',
          units: 15,
          availableUnits: 12,
          collectedDate: '2024-01-15',
          expiryDate: '2024-02-15',
          donorId: 'DON-001',
          location: 'Storage-A1',
          status: 'available'
        },
        {
          id: 'batch-002',
          bloodGroup: 'A+',
          units: 10,
          availableUnits: 8,
          collectedDate: '2024-01-17',
          expiryDate: '2024-02-17',
          donorId: 'DON-002',
          location: 'Storage-A2',
          status: 'available'
        }
      ]
    },
    {
      bloodGroup: 'A-',
      totalUnits: 20,
      availableUnits: 8,
      minThreshold: 12,
      status: 'low',
      batches: [
        {
          id: 'batch-003',
          bloodGroup: 'A-',
          units: 8,
          availableUnits: 8,
          collectedDate: '2024-01-16',
          expiryDate: '2024-02-16',
          donorId: 'DON-003',
          location: 'Storage-B1',
          status: 'available'
        }
      ]
    },
    {
      bloodGroup: 'B-',
      totalUnits: 15,
      availableUnits: 3,
      minThreshold: 10,
      status: 'critical',
      batches: [
        {
          id: 'batch-004',
          bloodGroup: 'B-',
          units: 3,
          availableUnits: 3,
          collectedDate: '2024-01-18',
          expiryDate: '2024-02-18',
          donorId: 'DON-004',
          location: 'Storage-B2',
          status: 'available'
        }
      ]
    },
    {
      bloodGroup: 'O+',
      totalUnits: 60,
      availableUnits: 40,
      minThreshold: 25,
      status: 'good',
      batches: [
        {
          id: 'batch-005',
          bloodGroup: 'O+',
          units: 20,
          availableUnits: 18,
          collectedDate: '2024-01-14',
          expiryDate: '2024-02-14',
          donorId: 'DON-005',
          location: 'Storage-C1',
          status: 'available'
        },
        {
          id: 'batch-006',
          bloodGroup: 'O+',
          units: 25,
          availableUnits: 22,
          collectedDate: '2024-01-16',
          expiryDate: '2024-02-16',
          donorId: 'DON-006',
          location: 'Storage-C2',
          status: 'available'
        }
      ]
    }
  ]);

  const handleSendAlert = (bloodGroup: string) => {
    setSelectedBloodGroup(bloodGroup);
    setIsSendAlertOpen(true);
  };

  const handleAlertSent = (alertData: AlertHistory) => {
    setAlertHistory(prev => [alertData, ...prev]);
    setIsSendAlertOpen(false);
    setSelectedBloodGroup('');
  };

  const updateStock = (bloodGroup: string, change: number, action: 'add' | 'use') => {
    setBloodStock(prev => 
      prev.map(stock => {
        if (stock.bloodGroup === bloodGroup) {
          const newAvailable = Math.max(0, stock.availableUnits + (action === 'add' ? change : -change));
          const newStatus = 
            newAvailable <= stock.minThreshold * 0.3 ? 'critical' :
            newAvailable <= stock.minThreshold ? 'low' : 'good';
          
          return {
            ...stock,
            availableUnits: newAvailable,
            status: newStatus as 'good' | 'low' | 'critical'
          };
        }
        return stock;
      })
    );
    
    toast.success(`${action === 'add' ? 'Added' : 'Used'} ${change} units of ${bloodGroup}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const criticalCount = bloodStock.filter(stock => stock.status === 'critical').length;
  const lowCount = bloodStock.filter(stock => stock.status === 'low').length;
  const totalUnits = bloodStock.reduce((sum, stock) => sum + stock.availableUnits, 0);

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Detailed Inventory</TabsTrigger>
          <TabsTrigger value="alerts">Alert History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Critical Alerts Banner */}
          {criticalCount > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">Critical Blood Shortage Alert</p>
                      <p className="text-red-700 text-sm">
                        {criticalCount} blood type(s) are critically low. Immediate action required.
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setIsSendAlertOpen(true)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Emergency Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Droplets className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Units</p>
                    <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Stock</p>
                    <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">{lowCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Batches</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {bloodStock.reduce((sum, stock) => sum + stock.batches.length, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blood Stock Grid */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Blood Stock Overview</CardTitle>
                <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Blood Stock</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Blood Group</Label>
                        <Input placeholder="e.g., A+" />
                      </div>
                      <div>
                        <Label>Units</Label>
                        <Input type="number" placeholder="Number of units" />
                      </div>
                      <div>
                        <Label>Batch ID</Label>
                        <Input placeholder="Batch identifier" />
                      </div>
                      <div>
                        <Label>Collection Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddStockOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setIsAddStockOpen(false);
                          toast.success("Blood stock added successfully");
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bloodStock.map((stock) => (
                  <Card key={stock.bloodGroup} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold">{stock.bloodGroup}</span>
                        <Badge className={
                          stock.status === 'good' ? 'bg-green-100 text-green-800' :
                          stock.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {stock.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Available</span>
                            <span>{stock.availableUnits}/{stock.totalUnits}</span>
                          </div>
                          <Progress 
                            value={(stock.availableUnits / stock.totalUnits) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          Threshold: {stock.minThreshold} units
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStock(stock.bloodGroup, 1, 'add')}
                            className="flex-1"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStock(stock.bloodGroup, 1, 'use')}
                            className="flex-1"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {stock.status === 'critical' && (
                          <Button 
                            size="sm" 
                            className="w-full bg-red-600 hover:bg-red-700 text-xs"
                            onClick={() => handleSendAlert(stock.bloodGroup)}
                          >
                            Send Alert
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Total Units</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Collection Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bloodStock.flatMap(stock => 
                    stock.batches.map(batch => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.bloodGroup}</TableCell>
                        <TableCell>{batch.id}</TableCell>
                        <TableCell>{batch.units}</TableCell>
                        <TableCell>{batch.availableUnits}</TableCell>
                        <TableCell>{formatDate(batch.collectedDate)}</TableCell>
                        <TableCell>{formatDate(batch.expiryDate)}</TableCell>
                        <TableCell>
                          <Badge className={
                            getDaysUntilExpiry(batch.expiryDate) <= 7 ? 'bg-red-100 text-red-800' :
                            getDaysUntilExpiry(batch.expiryDate) <= 14 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {getDaysUntilExpiry(batch.expiryDate)} days
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            batch.status === 'available' ? 'bg-green-100 text-green-800' :
                            batch.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              {alertHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Send className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No alerts sent yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alertHistory.map((alert) => (
                    <Card key={alert.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className="bg-red-100 text-red-800">
                                {alert.bloodGroup}
                              </Badge>
                              <Badge className={
                                alert.status === 'sent' ? 'bg-green-100 text-green-800' :
                                alert.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {alert.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {formatDateTime(alert.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {alert.message.substring(0, 100)}...
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Radius: {alert.radius} km</span>
                              <span>Recipients: {alert.estimatedRecipients}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory Reports</h3>
              <p className="text-gray-500">Detailed reports and analytics will be available here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SendAlertsModal
        isOpen={isSendAlertOpen}
        onClose={() => {
          setIsSendAlertOpen(false);
          setSelectedBloodGroup('');
        }}
        preselectedBloodGroup={selectedBloodGroup}
        onAlertSent={handleAlertSent}
      />
    </div>
  );
}