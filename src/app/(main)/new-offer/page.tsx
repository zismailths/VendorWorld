"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { laptopModels } from "@/lib/data";
import { QrCode, Upload, ListPlus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const offerFormSchema = z.object({
  modelId: z.string({ required_error: "Please select a laptop model." }),
  uniqueSerialNumber: z.string().min(6, "Serial number must be at least 6 characters."),
  sellerPrice: z.coerce.number().positive("Price must be a positive number."),
  images: z.any().optional(), // In a real app, this would be more specific
  notes: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerFormSchema>;

export default function NewOfferPage() {
  const [entryMethod, setEntryMethod] = useState<"choice" | "manual">("choice");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      uniqueSerialNumber: "",
      notes: "",
    },
  });

  function onSubmit(data: OfferFormValues) {
    console.log("New offer submitted:", data);
    toast({
      title: "Offer Submitted!",
      description: "Your new offer has been successfully listed.",
    });
    router.push('/offers');
  }

  const renderChoiceScreen = () => (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">How do you want to add a product?</CardTitle>
        <CardDescription>Choose an option below to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <Button variant="outline" className="h-auto p-6 flex flex-col gap-2 items-center" onClick={() => { /* Implement QR Scan */ }}>
          <QrCode className="h-10 w-10 text-primary" />
          <span className="font-semibold text-lg">Scan QR Code</span>
          <span className="text-sm text-muted-foreground">Faster for multiple entries</span>
        </Button>
        <Button variant="outline" className="h-auto p-6 flex flex-col gap-2 items-center" onClick={() => setEntryMethod("manual")}>
          <ListPlus className="h-10 w-10 text-primary" />
          <span className="font-semibold text-lg">Add Product Manually</span>
          <span className="text-sm text-muted-foreground">Enter all the details by hand</span>
        </Button>
      </CardContent>
    </Card>
  );

  const renderManualForm = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setEntryMethod("choice")}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <div>
                <CardTitle className="font-headline text-xl">Laptop Details</CardTitle>
                <CardDescription>Provide accurate information to attract buyers.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="modelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laptop Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {laptopModels.map(model => (
                          <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uniqueSerialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Serial Number</FormLabel>
                    <div className="flex gap-2">
                       <FormControl>
                        <Input placeholder="e.g. C02G8R2JLV2F" {...field} />
                      </FormControl>
                      <Button variant="outline" type="button" size="icon">
                          <QrCode className="h-4 w-4" />
                          <span className="sr-only">Scan QR code</span>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sellerPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Price</FormLabel>
                     <div className="relative">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                       <FormControl>
                          <Input type="number" placeholder="e.g. 150000" className="pl-7" {...field} />
                       </FormControl>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <div className="md:col-span-2">
                 <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Images</FormLabel>
                        <FormControl>
                           <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <Input id="dropzone-file" type="file" className="hidden" {...field} />
                                </label>
                            </div> 
                        </FormControl>
                        <FormDescription>Upload up to 5 images of the device.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
               <div className="md:col-span-2">
                 <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Any scratches, dents, or functional issues? Mention them here."
                              className="resize-none"
                              {...field}
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">Upload Product</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageHeader
        title="Upload New Product"
        description="Fill out the details to list a new laptop for sale."
      />
      <main className="p-6 pt-0">
        {entryMethod === 'choice' ? renderChoiceScreen() : renderManualForm()}
      </main>
    </>
  );
}
