import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop.tsx";
import RadarLoader from "./components/ui/RadarLoader.tsx";

// Lazy load page-level route components
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Process = lazy(() => import("./pages/Process.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Logs = lazy(() => import("./pages/Logs.tsx"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails.tsx"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails.tsx"));
const Clients = lazy(() => import("./pages/Clients.tsx"));
const ClientDetails = lazy(() => import("./pages/ClientDetails.tsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.tsx"));
const PricingDetail = lazy(() => import("./pages/PricingDetail.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RadarLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId" element={<ClientDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:projectId" element={<ProjectDetails />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/:serviceId" element={<PricingDetail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
