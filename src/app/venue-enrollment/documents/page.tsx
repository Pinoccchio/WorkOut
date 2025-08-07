"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EnrollmentStepper from "@/components/venue-enrollment/EnrollmentStepper";

interface DocumentItem {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  category: "business" | "identification" | "permits" | "other";
  status: "uploading" | "processing" | "verified" | "rejected";
}

export default function DocumentVerificationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [activeCategory, setActiveCategory] = useState<string>("business");
  
  // List of required documents
  const documentRequirements = [
    {
      category: "business",
      title: "Business Documents",
      description: "Legal documents proving your business ownership and operation",
      required: true,
      examples: ["Business Registration", "Certificate of Incorporation", "Operating License"]
    },
    {
      category: "identification",
      title: "Owner Identification",
      description: "Official government-issued ID of the business owner or authorized representative",
      required: true,
      examples: ["Passport", "Driver's License", "National ID Card"]
    },
    {
      category: "permits",
      title: "Permits & Certifications",
      description: "Health, safety, and operational permits for your venue",
      required: false,
      examples: ["Food Service Permit", "Health Department Certificate", "Fire Safety Inspection"]
    },
    {
      category: "other",
      title: "Additional Documents",
      description: "Any other documents that support your application",
      required: false,
      examples: ["Insurance Policy", "Floor Plan", "Menu Licenses"]
    }
  ];
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    handleFiles(Array.from(files), category as "business" | "identification" | "permits" | "other");
  };
  
  // Process files
  const handleFiles = (files: File[], category: "business" | "identification" | "permits" | "other") => {
    // Create new document items
    const newDocuments = files.map(file => {
      const id = `doc_${Math.random().toString(36).substring(2, 11)}`;
      
      // Simulate upload progress
      simulateUpload(id);
      
      return {
        id,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        category,
        status: "uploading"
      };
    });
    
    setDocuments(prev => [...prev, ...newDocuments]);
  };
  
  // Simulate file upload
  const simulateUpload = (id: string) => {
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // After upload, set status to processing
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === id ? { ...doc, status: "processing" as const } : doc
          )
        );
        
        // After a short delay, set to verified (in a real app, this would depend on backend verification)
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === id ? { ...doc, status: "verified" as const } : doc
            )
          );
        }, 2000);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [id]: progress
      }));
    }, 300);
  };
  
  // Remove a document
  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    }
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-accent/50 text-muted-foreground";
    }
  };
  
  // Get icon for document type
  const getDocumentIcon = (type: string) => {
    if (type.includes("pdf")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      );
    } else if (type.includes("image")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      );
    }
  };
  
  // Check if all required documents are uploaded and verified
  const areRequiredDocumentsComplete = () => {
    const requiredCategories = documentRequirements
      .filter(req => req.required)
      .map(req => req.category);
    
    // Check if we have at least one verified document in each required category
    return requiredCategories.every(category => 
      documents.some(doc => 
        doc.category === category && doc.status === "verified"
      )
    );
  };
  
  // Handle continue button
  const handleContinue = () => {
    router.push("/venue-enrollment/payment");
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <EnrollmentStepper currentStep={4} />
      
      <div className="workout-card p-6 mt-8">
        <h1 className="text-2xl font-bold mb-2">Document Verification</h1>
        <p className="text-muted-foreground mb-6">
          We need to verify your business documents to ensure the legitimacy of your venue. All documents are securely stored and handled with strict confidentiality.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category navigation */}
          <aside className="md:w-1/3 lg:w-1/4">
            <nav className="workout-card overflow-hidden">
              <ul>
                {documentRequirements.map((req) => (
                  <li key={req.category}>
                    <button
                      onClick={() => setActiveCategory(req.category)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                        activeCategory === req.category 
                          ? "bg-primary text-white" 
                          : "hover:bg-accent/50"
                      } transition-colors`}
                    >
                      <span className="font-medium">{req.title}</span>
                      
                      {req.required && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          documents.some(doc => doc.category === req.category && doc.status === "verified")
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {req.required ? "Required" : "Optional"}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Completed
              </p>
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                Required
              </p>
            </div>
          </aside>
          
          {/* Document upload area */}
          <div className="flex-1">
            {documentRequirements.map((req) => (
              <div
                key={req.category}
                className={activeCategory === req.category ? "block" : "hidden"}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-medium mb-2">{req.title}</h2>
                  <p className="text-muted-foreground mb-2">{req.description}</p>
                  
                  <div className="bg-accent/30 p-4 rounded-md mb-4">
                    <h3 className="text-sm font-medium mb-1">Examples:</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {req.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* File upload button */}
                <div className="mb-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileSelect(e, req.category)}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    multiple
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary py-2 px-4 w-full flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload {req.title}
                  </button>
                  
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Accepted formats: PDF, JPG, PNG, DOC (Max 10MB)
                  </p>
                </div>
                
                {/* Document list for this category */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Uploaded Documents</h3>
                  
                  {documents.filter(doc => doc.category === req.category).length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center p-6 border border-dashed border-border rounded-md">
                      No documents uploaded yet
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {documents
                        .filter(doc => doc.category === req.category)
                        .map((doc) => (
                          <div 
                            key={doc.id} 
                            className="workout-card p-4 flex items-center"
                          >
                            <div className="mr-4 text-muted-foreground">
                              {getDocumentIcon(doc.type)}
                            </div>
                            
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center">
                                <p className="font-medium truncate mr-2">{doc.name}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(doc.status)}`}>
                                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </span>
                              </div>
                              
                              {doc.status === "uploading" ? (
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{formatFileSize(doc.size)}</span>
                                    <span>{uploadProgress[doc.id]}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-accent/50 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary"
                                      style={{ width: `${uploadProgress[doc.id]}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(doc.size)}
                                </p>
                              )}
                            </div>
                            
                            {doc.status !== "uploading" && (
                              <button
                                onClick={() => removeDocument(doc.id)}
                                className="text-muted-foreground hover:text-red-500 transition-colors ml-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/venue-enrollment/photos" className="btn-outline py-2 px-4">
            Back
          </Link>
          
          <button
            onClick={handleContinue}
            className="btn-primary py-2 px-6"
            disabled={!areRequiredDocumentsComplete()}
          >
            Continue
          </button>
        </div>
        
        {!areRequiredDocumentsComplete() && (
          <p className="text-sm text-red-500 mt-2 text-center">
            Please upload and verify all required documents before continuing.
          </p>
        )}
      </div>
    </div>
  );
}