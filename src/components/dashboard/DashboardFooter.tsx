export default function DashboardFooter() {
  return (
    <footer className="border-t border-border py-6 bg-background">
      <div className="workout-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} WorkOut. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="/terms-of-service" className="hover:text-primary">Terms</a>
            <a href="/privacy-policy" className="hover:text-primary">Privacy</a>
            <a href="/help" className="hover:text-primary">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}