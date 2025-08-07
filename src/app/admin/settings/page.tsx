"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  fields: SettingsField[];
}

interface SettingsField {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "checkbox" | "select" | "textarea" | "color";
  value: string | number | boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  description?: string;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  
  const [settings, setSettings] = useState<SettingsSection[]>([
    {
      id: "general",
      title: "General Settings",
      description: "Configure basic platform settings and preferences",
      fields: [
        {
          id: "site_name",
          label: "Platform Name",
          type: "text",
          value: "WorkOut",
          placeholder: "Enter platform name",
          description: "The name of your platform as it appears to users"
        },
        {
          id: "support_email",
          label: "Support Email",
          type: "email",
          value: "support@workout.com",
          placeholder: "Enter support email",
          description: "Email address for user support inquiries"
        },
        {
          id: "maintenance_mode",
          label: "Maintenance Mode",
          type: "checkbox",
          value: false,
          description: "Enable to show maintenance page to all users"
        },
        {
          id: "default_currency",
          label: "Default Currency",
          type: "select",
          value: "USD",
          options: [
            { value: "USD", label: "US Dollar ($)" },
            { value: "EUR", label: "Euro (€)" },
            { value: "GBP", label: "British Pound (£)" },
            { value: "JPY", label: "Japanese Yen (¥)" }
          ],
          description: "Default currency for prices and payments"
        }
      ]
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel of your platform",
      fields: [
        {
          id: "primary_color",
          label: "Primary Color",
          type: "color",
          value: "#0ea5e9",
          description: "Main accent color for buttons and highlights"
        },
        {
          id: "secondary_color",
          label: "Secondary Color",
          type: "color",
          value: "#7c3aed",
          description: "Secondary accent color for elements"
        },
        {
          id: "dark_mode_default",
          label: "Dark Mode Default",
          type: "checkbox",
          value: false,
          description: "Enable dark mode by default for all users"
        },
        {
          id: "logo_url",
          label: "Logo URL",
          type: "text",
          value: "/logo.svg",
          placeholder: "Enter logo URL",
          description: "URL to your company logo"
        }
      ]
    },
    {
      id: "bookings",
      title: "Booking Settings",
      description: "Configure booking related settings",
      fields: [
        {
          id: "min_booking_time",
          label: "Minimum Booking Time (hours)",
          type: "number",
          value: 1,
          description: "Minimum duration for a workspace booking"
        },
        {
          id: "max_booking_time",
          label: "Maximum Booking Time (hours)",
          type: "number",
          value: 8,
          description: "Maximum duration for a workspace booking"
        },
        {
          id: "advance_booking_days",
          label: "Advance Booking (days)",
          type: "number",
          value: 30,
          description: "How many days in advance users can book"
        },
        {
          id: "cancellation_period",
          label: "Cancellation Period (hours)",
          type: "number",
          value: 24,
          description: "Hours before booking when cancellation is allowed with full refund"
        }
      ]
    },
    {
      id: "payments",
      title: "Payment Settings",
      description: "Configure payment processing and financial settings",
      fields: [
        {
          id: "payment_gateway",
          label: "Payment Gateway",
          type: "select",
          value: "stripe",
          options: [
            { value: "stripe", label: "Stripe" },
            { value: "paypal", label: "PayPal" },
            { value: "square", label: "Square" }
          ],
          description: "Primary payment processor for the platform"
        },
        {
          id: "transaction_fee",
          label: "Platform Transaction Fee (%)",
          type: "number",
          value: 5,
          description: "Percentage fee charged on each transaction"
        },
        {
          id: "tax_rate",
          label: "Default Tax Rate (%)",
          type: "number",
          value: 8.5,
          description: "Default tax rate applied to transactions"
        },
        {
          id: "payout_schedule",
          label: "Payout Schedule",
          type: "select",
          value: "weekly",
          options: [
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "biweekly", label: "Bi-weekly" },
            { value: "monthly", label: "Monthly" }
          ],
          description: "Schedule for paying venues their earnings"
        }
      ]
    },
    {
      id: "notifications",
      title: "Notification Settings",
      description: "Configure platform notifications and alerts",
      fields: [
        {
          id: "email_notifications",
          label: "Email Notifications",
          type: "checkbox",
          value: true,
          description: "Enable email notifications system-wide"
        },
        {
          id: "push_notifications",
          label: "Push Notifications",
          type: "checkbox",
          value: true,
          description: "Enable push notifications system-wide"
        },
        {
          id: "sms_notifications",
          label: "SMS Notifications",
          type: "checkbox",
          value: false,
          description: "Enable SMS notifications system-wide"
        },
        {
          id: "admin_alert_email",
          label: "Admin Alert Email",
          type: "email",
          value: "alerts@workout.com",
          placeholder: "Enter admin alert email",
          description: "Email to receive system alerts and notifications"
        }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      description: "Configure third-party service integrations",
      fields: [
        {
          id: "google_analytics_id",
          label: "Google Analytics ID",
          type: "text",
          value: "UA-XXXXXXXXX-X",
          placeholder: "Enter Google Analytics ID",
          description: "Your Google Analytics tracking ID"
        },
        {
          id: "mailchimp_api_key",
          label: "Mailchimp API Key",
          type: "text",
          value: "",
          placeholder: "Enter Mailchimp API Key",
          description: "API key for Mailchimp email marketing integration"
        },
        {
          id: "google_maps_api_key",
          label: "Google Maps API Key",
          type: "text",
          value: "",
          placeholder: "Enter Google Maps API Key",
          description: "API key for Google Maps integration"
        },
        {
          id: "social_login_enabled",
          label: "Social Login",
          type: "checkbox",
          value: true,
          description: "Enable social media login options"
        }
      ]
    }
  ]);
  
  const handleFieldChange = (sectionId: string, fieldId: string, newValue: string | number | boolean) => {
    setSettings(prevSettings => 
      prevSettings.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map(field => {
              if (field.id === fieldId) {
                return {
                  ...field,
                  value: newValue
                };
              }
              return field;
            })
          };
        }
        return section;
      })
    );
  };
  
  const handleSaveSettings = () => {
    setSaveStatus("saving");
    
    // Simulate API call to save settings
    setTimeout(() => {
      setSaveStatus("success");
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    }, 1500);
  };
  
  const currentSection = settings.find(section => section.id === activeTab);
  
  const renderField = (field: SettingsField, sectionId: string) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            id={field.id}
            value={field.value as string | number}
            onChange={(e) => handleFieldChange(sectionId, field.id, field.type === "number" ? Number(e.target.value) : e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
          />
        );
      
      case "checkbox":
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.value as boolean}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-accent/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        );
      
      case "select":
        return (
          <select
            id={field.id}
            value={field.value as string}
            onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
            className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case "textarea":
        return (
          <textarea
            id={field.id}
            value={field.value as string}
            onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
          />
        );
      
      case "color":
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id={field.id}
              value={field.value as string}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              className="w-10 h-10 rounded-md border border-border cursor-pointer"
            />
            <input
              type="text"
              value={field.value as string}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              className="flex-1 p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">System Settings</h1>
        <p className="text-muted-foreground">
          Configure and manage all aspects of your WorkOut platform
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="workout-card overflow-hidden">
            <div className="p-4 bg-accent/50">
              <h2 className="font-medium">Settings Categories</h2>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                {settings.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeTab === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          {currentSection && (
            <div className="workout-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-medium mb-1">{currentSection.title}</h2>
                <p className="text-muted-foreground text-sm">{currentSection.description}</p>
              </div>
              
              <div className="p-6 space-y-6">
                {currentSection.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor={field.id} className="font-medium">
                        {field.label}
                      </label>
                      {field.type === "checkbox" && renderField(field, currentSection.id)}
                    </div>
                    
                    {field.type !== "checkbox" && renderField(field, currentSection.id)}
                    
                    {field.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {field.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-border flex justify-between items-center">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 rounded-md border border-border hover:bg-accent/50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSaveSettings}
                  disabled={saveStatus === "saving"}
                  className={`px-4 py-2 rounded-md ${
                    saveStatus === "saving" 
                      ? "bg-primary/70 text-primary-foreground cursor-not-allowed" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {saveStatus === "idle" && "Save Changes"}
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "success" && "Saved Successfully!"}
                  {saveStatus === "error" && "Error Saving"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}