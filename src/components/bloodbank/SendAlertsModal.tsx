import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle, Users, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SendAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBloodGroup?: string;
  onAlertSent: (alertData: {
    bloodGroup: string;
    radius: number;
    estimatedRecipients: number;
    message: string;
    timestamp: string;
    status: 'sent' | 'failed' | 'partial';
  }) => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const defaultMessageTemplate = `🚨 URGENT BLOOD DONATION ALERT 🚨

Hello {name},

We urgently need {blood_group} blood donors at {blood_bank_name}.

📍 Location: {location}
🩸 Blood Type: {blood_group}
⏰ Available: 24/7

Your donation can save lives! Please contact us immediately if you can donate.

{call_to_action}

Thank you for being a lifesaver!
- {blood_bank_name} Team`;

export function SendAlertsModal({ 
  isOpen, 
  onClose, 
  preselectedBloodGroup = '',
  onAlertSent 
}: SendAlertsModalProps) {
  const [formData, setFormData] = useState({
    bloodGroup: preselectedBloodGroup,
    radius: [5],
    message: defaultMessageTemplate
  });
  
  const [estimatedRecipients, setEstimatedRecipients] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  // Mock function to estimate recipients based on blood group and radius
  const calculateEstimatedRecipients = (bloodGroup: string, radius: number) => {
    if (!bloodGroup || radius === 0) return 0;
    
    // Mock calculation based on blood group rarity and radius
    const baseCount = {
      'O+': 150, 'O-': 50, 'A+': 120, 'A-': 40,
      'B+': 100, 'B-': 35, 'AB+': 60, 'AB-': 25
    };
    
    const base = baseCount[bloodGroup as keyof typeof baseCount] || 50;
    const radiusMultiplier = Math.min(radius * 0.8, 10); // Max multiplier of 10
    
    return Math.floor(base * radiusMultiplier);
  };

  // Update estimated recipients when blood group or radius changes
  useEffect(() => {
    const recipients = calculateEstimatedRecipients(formData.bloodGroup, formData.radius[0]);
    setEstimatedRecipients(recipients);
  }, [formData.bloodGroup, formData.radius]);

  // Update message length
  useEffect(() => {
    setMessageLength(formData.message.length);
  }, [formData.message]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        bloodGroup: preselectedBloodGroup,
        radius: [5],
        message: defaultMessageTemplate
      });
    }
  }, [isOpen, preselectedBloodGroup]);

  const handleSendAlerts = async () => {
    if (!formData.bloodGroup || formData.radius[0] === 0) {
      toast.error("Please select blood group and set radius > 0");
      return;
    }

    if (estimatedRecipients === 0) {
      toast.error("No recipients found for selected criteria");
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success with some potential failures
      const actualSent = Math.floor(estimatedRecipients * (0.85 + Math.random() * 0.15));
      const status: 'sent' | 'partial' = actualSent === estimatedRecipients ? 'sent' : 'partial';
      
      const alertData = {
        bloodGroup: formData.bloodGroup,
        radius: formData.radius[0],
        estimatedRecipients: actualSent,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status
      };

      onAlertSent(alertData);
      
      toast.success(
        `Notifications sent — ${actualSent} recipients notified`,
        {
          description: status === 'partial' 
            ? `${estimatedRecipients - actualSent} notifications failed due to network issues`
            : 'All notifications sent successfully'
        }
      );
      
      onClose();
    } catch (error) {
      toast.error("Failed to send notifications. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const renderMessagePreview = () => {
    return formData.message
      .replace(/{name}/g, 'John Doe')
      .replace(/{blood_group}/g, formData.bloodGroup || '[Blood Group]')
      .replace(/{blood_bank_name}/g, 'Apollo Blood Bank')
      .replace(/{location}/g, '123 Health Street, Mumbai')
      .replace(/{call_to_action}/g, 'Call +91 22 1234 5678 or visit us immediately');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Send Emergency Blood Alert</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Blood Group Selection */}
          <div>
            <Label htmlFor="bloodGroup">Blood Group *</Label>
            <Select 
              value={formData.bloodGroup}
              onValueChange={(value) => setFormData(prev => ({ ...prev, bloodGroup: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Radius Selection */}
          <div>
            <Label htmlFor="radius">
              Notification Radius: {formData.radius[0]} km
            </Label>
            <div className="mt-2 px-2">
              <Slider
                id="radius"
                value={formData.radius}
                onValueChange={(value) => setFormData(prev => ({ ...prev, radius: value }))}
                max={25}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 km</span>
                <span>25 km</span>
              </div>
            </div>
          </div>

          {/* Estimated Recipients */}
          <Card className={estimatedRecipients === 0 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className={`h-5 w-5 ${estimatedRecipients === 0 ? 'text-yellow-600' : 'text-green-600'}`} />
                <div>
                  <p className="font-medium">
                    Estimated Recipients: 
                    <Badge className={`ml-2 ${estimatedRecipients === 0 ? 'bg-yellow-600' : 'bg-green-600'}`}>
                      {estimatedRecipients}
                    </Badge>
                  </p>
                  {estimatedRecipients === 0 ? (
                    <p className="text-sm text-yellow-700">
                      No registered donors found in selected radius for {formData.bloodGroup || 'selected blood group'}
                    </p>
                  ) : (
                    <p className="text-sm text-green-700">
                      {estimatedRecipients} registered donors will be notified via SMS and push notifications
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Template */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="message">Message Template</Label>
              <span className="text-xs text-gray-500">
                {messageLength} characters {messageLength > 160 && '(Multiple SMS)'}
              </span>
            </div>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={8}
              placeholder="Enter your emergency alert message..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Use placeholders: {'{name}'}, {'{blood_group}'}, {'{blood_bank_name}'}, {'{location}'}, {'{call_to_action}'}
            </p>
          </div>

          {/* Message Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium">Message Preview</h4>
              </div>
              <div className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-line">
                {renderMessagePreview()}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Privacy Notice:</strong> Notifications will only be sent to users who have opted-in to receive emergency alerts. 
              Users on DND lists or who have opted out will be excluded automatically.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendAlerts}
              disabled={isSending || estimatedRecipients === 0 || !formData.bloodGroup || formData.radius[0] === 0}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSending ? (
                <>
                  <Send className="h-4 w-4 mr-2 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notifications
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}