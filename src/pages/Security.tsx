import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Users,
  FileText,
  Clock,
  LogIn,
  LogOut,
  Settings,
  Smartphone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const activityLogs = [
  { id: 1, action: "Login", user: "Rahul Sharma", ip: "192.168.1.1", timestamp: "2024-01-28 10:30 AM", status: "success" },
  { id: 2, action: "Report Downloaded", user: "Rahul Sharma", ip: "192.168.1.1", timestamp: "2024-01-28 10:25 AM", status: "success" },
  { id: 3, action: "Settings Changed", user: "Rahul Sharma", ip: "192.168.1.1", timestamp: "2024-01-27 03:45 PM", status: "success" },
  { id: 4, action: "Failed Login Attempt", user: "Unknown", ip: "203.45.67.89", timestamp: "2024-01-27 02:10 PM", status: "failed" },
  { id: 5, action: "Data Export", user: "Priya Patel", ip: "192.168.1.5", timestamp: "2024-01-26 11:20 AM", status: "success" },
  { id: 6, action: "User Added", user: "Rahul Sharma", ip: "192.168.1.1", timestamp: "2024-01-25 04:30 PM", status: "success" },
];

const teamMembers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@company.com", role: "Owner", status: "active", lastActive: "2 hours ago" },
  { id: 2, name: "Priya Patel", email: "priya@company.com", role: "Accountant", status: "active", lastActive: "1 day ago" },
  { id: 3, name: "Amit Kumar", email: "amit@company.com", role: "Viewer", status: "invited", lastActive: "Never" },
];

const Security = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  return (
    <AppLayout title="Security & Access" subtitle="Manage security settings and access controls">
      <div className="space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: "Security Score", value: "92/100", color: "text-success" },
            { icon: Lock, label: "Encryption", value: "AES-256", color: "text-primary" },
            { icon: Users, label: "Team Members", value: "3", color: "text-info" },
            { icon: AlertTriangle, label: "Alerts", value: "1", color: "text-warning" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="settings">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="logs">
              <FileText className="h-4 w-4 mr-2" />
              Activity Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6 space-y-6">
            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Auto Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
                    </div>
                  </div>
                  <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">Security Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about suspicious login attempts</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-foreground">IP Whitelist</Label>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                    </div>
                  </div>
                  <Switch checked={ipWhitelist} onCheckedChange={setIpWhitelist} />
                </div>
              </div>
            </motion.div>

            {/* Password & Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Password & Authentication</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground mb-2 block">Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button>Update Password</Button>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Data Protection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">AES-256 Encryption</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All data encrypted at rest using bank-grade encryption</p>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">TLS 1.3 in Transit</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All communications secured with latest TLS protocol</p>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">GDPR Compliant</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Data handling follows GDPR guidelines</p>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Regular Backups</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Automated daily backups with 30-day retention</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.role}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{member.lastActive}</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Activity Logs</h3>
                <Button variant="outline">Export Logs</Button>
              </div>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${log.status === "success" ? "bg-success/10" : "bg-destructive/10"}`}>
                        {log.status === "success" ? (
                          <LogIn className={`h-4 w-4 ${log.status === "success" ? "text-success" : "text-destructive"}`} />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{log.action}</p>
                        <p className="text-sm text-muted-foreground">by {log.user} • IP: {log.ip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={log.status === "success" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Security;
