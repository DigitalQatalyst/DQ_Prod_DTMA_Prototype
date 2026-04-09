import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/switch';
import { Settings, Clock, Bell, MessageSquare, Save } from 'lucide-react';

export const WhatsAppSystemSettings = () => {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [deliveryFrequency, setDeliveryFrequency] = useState('daily');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');
  const [maxMessagesPerDay, setMaxMessagesPerDay] = useState('3');
  const [autoOptInReminder, setAutoOptInReminder] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState('7');

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#25D366]" />
            WhatsApp System Settings
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            Configure WhatsApp learning features and delivery preferences
          </p>
        </div>
        <Badge variant="outline" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20">
          REQ-ADM-07
        </Badge>
      </div>

      {/* Master Toggle */}
      <div className="p-6 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 rounded-2xl border border-[#25D366]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-[16px] font-semibold text-foreground mb-1">
                WhatsApp Learning
              </h4>
              <p className="text-[13px] text-muted-foreground">
                Enable or disable WhatsApp-based learning across the entire platform
              </p>
            </div>
          </div>
          <Switch
            checked={whatsappEnabled}
            onCheckedChange={setWhatsappEnabled}
            className="data-[state=checked]:bg-[#25D366]"
          />
        </div>
      </div>

      {whatsappEnabled && (
        <>
          {/* Delivery Settings */}
          <div className="p-6 bg-card rounded-2xl border border-border space-y-6">
            <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#ff6b4d]" />
              Delivery Settings
            </h4>

            {/* Delivery Frequency */}
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-foreground">
                Delivery Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['daily', 'weekly', 'custom'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setDeliveryFrequency(freq)}
                    className={`px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${
                      deliveryFrequency === freq
                        ? 'bg-[#25D366] text-white shadow-md'
                        : 'bg-accent text-muted-foreground hover:bg-accent/80'
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-muted-foreground">
                How often should micro-learning messages be sent to learners?
              </p>
            </div>

            {/* Max Messages Per Day */}
            <div className="space-y-3">
              <label className="text-[14px] font-medium text-foreground">
                Maximum Messages Per Day
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={maxMessagesPerDay}
                  onChange={(e) => setMaxMessagesPerDay(e.target.value)}
                  min="1"
                  max="10"
                  className="w-24 px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                />
                <span className="text-[14px] text-muted-foreground">messages per learner</span>
              </div>
              <p className="text-[12px] text-muted-foreground">
                Limit the number of WhatsApp messages sent to each learner per day to avoid overwhelming them
              </p>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="p-6 bg-card rounded-2xl border border-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#ff6b4d]" />
                  Quiet Hours
                </h4>
                <p className="text-[13px] text-muted-foreground mt-1">
                  Prevent messages from being sent during specific times
                </p>
              </div>
              <Switch
                checked={quietHoursEnabled}
                onCheckedChange={setQuietHoursEnabled}
              />
            </div>

            {quietHoursEnabled && (
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={quietHoursStart}
                    onChange={(e) => setQuietHoursStart(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={quietHoursEnd}
                    onChange={(e) => setQuietHoursEnd(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                  />
                </div>
              </div>
            )}

            {quietHoursEnabled && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-[13px] text-blue-900">
                  <strong>Active Quiet Hours:</strong> {quietHoursStart} - {quietHoursEnd}
                </p>
                <p className="text-[12px] text-blue-700 mt-1">
                  No messages will be sent during this time period. Scheduled messages will be queued and sent after quiet hours end.
                </p>
              </div>
            )}
          </div>

          {/* Opt-In Reminders */}
          <div className="p-6 bg-card rounded-2xl border border-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-semibold text-foreground">
                  Automatic Opt-In Reminders
                </h4>
                <p className="text-[13px] text-muted-foreground mt-1">
                  Remind learners who haven't opted in to WhatsApp learning
                </p>
              </div>
              <Switch
                checked={autoOptInReminder}
                onCheckedChange={setAutoOptInReminder}
              />
            </div>

            {autoOptInReminder && (
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-[14px] font-medium text-foreground">
                  Reminder Frequency (days)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                    min="1"
                    max="30"
                    className="w-24 px-4 py-2 border border-border rounded-xl text-[14px] bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]/40"
                  />
                  <span className="text-[14px] text-muted-foreground">days between reminders</span>
                </div>
                <p className="text-[12px] text-muted-foreground">
                  Send a gentle reminder every {reminderFrequency} days to learners who haven't opted in
                </p>
              </div>
            )}
          </div>

          {/* Feature Flags */}
          <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
            <h4 className="text-[16px] font-semibold text-foreground">
              Feature Flags
            </h4>

            <div className="space-y-3">
              {[
                { id: 'micro-learning', label: 'Micro-Learning Messages', enabled: true },
                { id: 'practice-questions', label: 'Practice Questions', enabled: true },
                { id: 'lesson-reminders', label: 'Lesson Reminders', enabled: true },
                { id: 'course-updates', label: 'Course Updates', enabled: false },
                { id: 'ai-responses', label: 'AI-Powered Responses', enabled: true },
              ].map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
                >
                  <span className="text-[14px] text-foreground">{feature.label}</span>
                  <Switch defaultChecked={feature.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="border-border">
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </>
      )}

      {/* Info Box */}
      <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
        <h5 className="text-[14px] font-semibold text-amber-900 mb-2">
          ⚙️ System Configuration
        </h5>
        <ul className="space-y-1 text-[13px] text-amber-700">
          <li>• Settings apply globally across all courses and learners</li>
          <li>• Individual learners can override delivery preferences in their profile</li>
          <li>• Changes take effect immediately for new messages</li>
          <li>• Scheduled messages respect the current settings at send time</li>
        </ul>
      </div>
    </div>
  );
};
