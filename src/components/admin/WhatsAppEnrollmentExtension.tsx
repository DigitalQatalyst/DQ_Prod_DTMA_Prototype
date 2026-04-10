import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Phone, CheckCircle, XCircle } from 'lucide-react';

interface WhatsAppEnrollmentExtensionProps {
  learnerId?: string;
  onSave?: (data: WhatsAppEnrollmentData) => void;
}

export interface WhatsAppEnrollmentData {
  whatsappOptIn: boolean;
  phoneNumber: string;
  countryCode: string;
}

export const WhatsAppEnrollmentExtension = ({ learnerId, onSave }: WhatsAppEnrollmentExtensionProps) => {
  const [optIn, setOptIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+971'); // UAE default

  const handleSave = () => {
    const data: WhatsAppEnrollmentData = {
      whatsappOptIn: optIn,
      phoneNumber,
      countryCode,
    };
    onSave?.(data);
  };

  const isValidPhone = phoneNumber.length >= 9;

  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] leading-[24px] font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            WhatsApp Learning Opt-In
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Enable WhatsApp-based learning for this enrollment
          </p>
        </div>
        <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
          REQ-ADM-02
        </Badge>
      </div>

      {/* Opt-In Prompt */}
      <div className="p-5 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-xl border border-[#25D366]/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-[16px] font-semibold text-foreground mb-2">
              Continue Learning via WhatsApp?
            </h4>
            <p className="text-[14px] text-muted-foreground mb-4">
              Get daily micro-lessons, practice questions, and course reminders directly on WhatsApp. 
              Stay engaged and learn on the go! 📱
            </p>
            <div className="flex items-center gap-3">
              <Switch
                checked={optIn}
                onCheckedChange={setOptIn}
                className="data-[state=checked]:bg-[#25D366]"
              />
              <span className="text-[14px] font-medium text-foreground">
                {optIn ? 'Opted In ✓' : 'Opt In to WhatsApp Learning'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Input (shown when opted in) */}
      {optIn && (
        <div className="space-y-4 p-5 bg-accent/50 rounded-xl">
          <label className="text-[14px] font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4" />
            WhatsApp Phone Number
          </label>
          
          <div className="flex gap-3">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-32 px-3 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
            >
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+254">🇰🇪 +254</option>
              <option value="+234">🇳🇬 +234</option>
              <option value="+27">🇿🇦 +27</option>
              <option value="+966">🇸🇦 +966</option>
            </select>
            
            <div className="flex-1 relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="501234567"
                className="w-full px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
              />
              {phoneNumber && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValidPhone ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-[12px] text-muted-foreground">
            Enter the phone number registered with WhatsApp (without country code)
          </p>

          {isValidPhone && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-[12px] text-green-900">
                <strong>Complete number:</strong> {countryCode} {phoneNumber}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Admin Visibility Info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="text-[13px] font-semibold text-blue-900 mb-2">Admin Visibility</h4>
        <ul className="space-y-1 text-[12px] text-blue-700">
          <li>• View WhatsApp opt-in status per learner</li>
          <li>• Track engagement metrics in analytics</li>
          <li>• Manage delivery preferences and schedules</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" className="border-border">
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          disabled={optIn && !isValidPhone}
        >
          Save Opt-In Preferences
        </Button>
      </div>
    </div>
  );
};
