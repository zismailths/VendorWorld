
"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CameraOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QrScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Unsupported Browser",
          description: "Your browser does not support camera access.",
        });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        });
      }
    };

    getCameraPermission();

    return () => {
        // Stop camera stream on component unmount
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  return (
    <>
      <PageHeader
        title="Scan QR Code"
        description="Point your camera at a product's QR code to add it."
      >
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </PageHeader>
      <main className="p-6 pt-0">
        <Card>
            <CardContent className="pt-6">
                <div className="relative aspect-video w-full max-w-2xl mx-auto overflow-hidden rounded-lg border bg-muted">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />

                    {hasCameraPermission === false && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                            <CameraOff className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 text-lg font-semibold text-muted-foreground">Camera is not available</p>
                             <Alert variant="destructive" className="mt-4 max-w-md text-left">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    To scan QR codes, please grant camera access in your browser settings and refresh the page.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                     {hasCameraPermission === null && (
                         <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                             <p className="text-muted-foreground">Requesting camera permission...</p>
                         </div>
                    )}

                    {/* QR Code Finder Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-3/4 h-3/4 max-w-sm max-h-sm">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
