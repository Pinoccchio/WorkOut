"use client";

const steps = [
  {
    id: 0,
    title: "Basic Info",
    description: "Share your business details",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Venue Details",
    description: "Describe your workspace",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Agreement",
    description: "Accept terms & conditions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Photos",
    description: "Upload venue images",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Documents",
    description: "Verify your business",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Payment",
    description: "Set up payment methods",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
];

interface EnrollmentStepperProps {
  currentStep: number;
  steps?: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export default function EnrollmentStepper({ 
  currentStep, 
  steps: customSteps 
}: EnrollmentStepperProps) {
  // Use the provided steps if any, otherwise use the default steps
  const displaySteps = customSteps || steps;
  
  // Show only 4 steps at a time for better display
  const getVisibleSteps = () => {
    if (displaySteps.length <= 4) return displaySteps;
    
    // If we're near the end, show the last 4 steps
    if (currentStep > displaySteps.length - 4) {
      return displaySteps.slice(-4);
    }
    
    // Otherwise, show the current step and the next 3, or up to 3 previous steps
    if (currentStep <= 1) {
      return displaySteps.slice(0, 4);
    }
    
    // Center the current step
    return displaySteps.slice(currentStep - 1, currentStep + 3);
  };
  
  const visibleSteps = getVisibleSteps();
  
  return (
    <div className="mb-8">
      <div className="hidden md:grid grid-cols-4 gap-4">
        {visibleSteps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {step.id < displaySteps.length - 1 && step.id < visibleSteps[visibleSteps.length - 1].id && (
                <div className="absolute top-5 left-[calc(50%+1rem)] right-0 h-px bg-border z-0">
                  <div 
                    className={`h-full bg-primary transition-all duration-500 ${
                      isCompleted ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
              
              <div className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted 
                      ? 'bg-primary border-primary text-white' 
                      : isCurrent 
                        ? 'border-primary text-primary' 
                        : 'border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <span>{step.id + 1}</span>
                  )}
                </div>
                
                {/* Step Title */}
                <h3 className={`mt-2 font-medium text-center ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-xs text-muted-foreground text-center mt-1 max-w-[15rem] mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {visibleSteps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex-1 relative">
                {step.id < displaySteps.length - 1 && step.id < visibleSteps[visibleSteps.length - 1].id && (
                  <div className="absolute top-5 w-full h-px bg-border">
                    <div 
                      className={`h-full bg-primary transition-all duration-500 ${
                        isCompleted ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
                
                <div className="flex flex-col items-center relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-white' 
                        : isCurrent 
                          ? 'border-primary text-primary' 
                          : 'border-border text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <span>{step.id + 1}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <h3 className="font-medium text-primary">
            {displaySteps[currentStep].title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {displaySteps[currentStep].description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Step {currentStep + 1} of {displaySteps.length}
          </p>
        </div>
      </div>
    </div>
  );
}