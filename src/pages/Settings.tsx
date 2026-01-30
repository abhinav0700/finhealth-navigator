import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  Palette, 
  Globe, 
  Link, 
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("inr");
  const [theme, setTheme] = useState("dark");

  return (
    <AppLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="space-y-6">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="business">
              <Building2 className="h-4 w-4 mr-2" />
              Business
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Palette className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Link className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-foreground mb-2 block">Full Name</Label>
                  <Input defaultValue="Rahul Sharma" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Email Address</Label>
                  <Input type="email" defaultValue="rahul@company.com" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Phone Number</Label>
                  <Input type="tel" defaultValue="+91 98765 43210" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Role</Label>
                  <Input defaultValue="Business Owner" disabled />
                </div>
              </div>
              <Button className="mt-6">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="business" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-foreground mb-2 block">Business Name</Label>
                  <Input defaultValue="Sharma Enterprises Pvt. Ltd." />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Industry</Label>
                  <Select defaultValue="manufacturing">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">GSTIN</Label>
                  <Input defaultValue="27AABCS1234Z1ZV" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">PAN Number</Label>
                  <Input defaultValue="AABCS1234Z" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-foreground mb-2 block">Business Address</Label>
                  <Textarea defaultValue="123, Industrial Area, Phase 2, Pune, Maharashtra - 411001" />
                </div>
              </div>
              <Button className="mt-6">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Financial Year Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-foreground mb-2 block">Financial Year Start</Label>
                  <Select defaultValue="april">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Reporting Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <SettingsIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly financial summary reports</p>
                    </div>
                  </div>
                  <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Risk Alerts</Label>
                      <p className="text-sm text-muted-foreground">Immediate notifications for critical risks</p>
                    </div>
                  </div>
                  <Switch checked={riskAlerts} onCheckedChange={setRiskAlerts} />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Display Preferences</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-2 block">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground mb-2 block">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <Palette className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground mb-2 block">Number Format</Label>
                  <Select defaultValue="indian">
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian (12,34,567.89)</SelectItem>
                      <SelectItem value="international">International (1,234,567.89)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Connected Services</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-success/10">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">HDFC Bank</p>
                      <p className="text-sm text-muted-foreground">Current Account ••••1234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/20 text-success">Connected</Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Building2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">GST Portal</p>
                      <p className="text-sm text-muted-foreground">GSTIN: 27AABCS1234Z1ZV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/20 text-success">Connected</Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-dashed border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Add Bank Account</p>
                      <p className="text-sm text-muted-foreground">Connect another bank for auto-sync</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-dashed border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Link className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Accounting Software</p>
                      <p className="text-sm text-muted-foreground">Connect Tally, Zoho, or QuickBooks</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
