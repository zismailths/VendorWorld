
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { QrCode, Upload, ListPlus, ArrowLeft, Bot, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import type { SellerOffer } from "@/lib/types";
import { cn } from "@/lib/utils";

const offerFormSchema = z.object({
  modelId: z.string({ required_error: "Please select a laptop model." }),
  serialNumbers: z.array(z.object({
    value: z.string().min(6, "Serial number must be at least 6 characters."),
  })).min(1, "At least one serial number is required."),
  sellerPrice: z.coerce.number().positive("Price must be a positive number."),
  quantity: z.coerce.number().int().positive("Quantity must be at least 1."),
  ram: z.string({ required_error: "Please select RAM configuration." }),
  storage: z.string({ required_error: "Please select storage capacity." }),
  gpu: z.string().min(1, "Please specify the GPU."),
  screenSize: z.string({ required_error: "Please select a screen size." }),
  images: z.any().optional(),
  notes: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerFormSchema>;

type CopiedOffer = Omit<SellerOffer, 'serialNumbers'> & { serial: string, ram?: string, storage?: string, gpu?: string, screenSize?: string };

const defaultValues: OfferFormValues = {
  modelId: "",
  serialNumbers: [{ value: "" }],
  sellerPrice: 0,
  quantity: 1,
  ram: "",
  storage: "",
  gpu: "",
  screenSize: "",
  notes: "",
  images: undefined,
};

export default function NewOfferPage() {
  const [entryMethod, setEntryMethod] = useState<"choice" | "manual">("choice");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "serialNumbers",
  });

  const quantity = form.watch("quantity");

   useEffect(() => {
    const newQuantity = Number(quantity) || 0;
    const currentCount = fields.length;
    if (newQuantity > 0 && newQuantity !== currentCount) {
        const newFields = Array.from({ length: newQuantity }, (_, i) => ({
            value: fields[i]?.value || ''
        }));
        replace(newFields);
    }
  }, [quantity, fields.length, replace]);


  function onSubmit(data: OfferFormValues) {
    console.log("New offer submitted:", data);
    toast({
      title: "Offer Submitted!",
      description: "Your new offer has been successfully listed.",
    });
    localStorage.removeItem('copiedOffer');
    router.push('/offers');
  }

  function handleAutofill() {
    const copiedOfferString = localStorage.getItem('copiedOffer');
    if (copiedOfferString) {
      try {
        const copiedOffer: CopiedOffer = JSON.parse(copiedOfferString);
        
        form.reset({
          modelId: copiedOffer.modelId || "",
          sellerPrice: copiedOffer.price || 0,
          serialNumbers: [{ value: "" }],
          quantity: 1,
          ram: copiedOffer.ram || "",
          storage: copiedOffer.storage || "",
          gpu: copiedOffer.gpu || "",
          screenSize: copiedOffer.screenSize || "",
          notes: `Copied from offer ${copiedOffer.serial}`,
        });

        toast({
          title: "Form Auto-filled",
          description: `Details from ${copiedOffer.model} have been filled in. Please provide a new serial number.`,
        });

      } catch (error) {
        console.error("Failed to parse copied offer:", error);
        toast({
          variant: "destructive",
          title: "Auto-fill Failed",
          description: "Could not load the copied product details.",
        });
        form.reset(defaultValues);
      }
    } else {
      form.reset(defaultValues);
      toast({
        title: "Nothing to Auto-fill",
        description: "No copied data found. Please copy an offer first.",
      });
    }
  }

  const renderChoiceScreen = () => (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">How do you want to add a product?</CardTitle>
        <CardDescription>Choose an option below to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <Button variant="outline" className="h-auto p-6 flex flex-col gap-2 items-center justify-center text-center" onClick={() => router.push('/qr-scan')}>
          <QrCode className="h-10 w-10 text-primary" />
          <span className="font-semibold text-lg text-primary">Scan QR Code</span>
          <span className="text-sm text-muted-foreground">Faster for multiple entries</span>
        </Button>
        <Button variant="outline" className="h-auto p-6 flex flex-col gap-2 items-center justify-center text-center" onClick={() => setEntryMethod("manual")}>
          <ListPlus className="h-10 w-10 text-green-600" />
          <span className="font-semibold text-lg text-green-600">Add Product Manually</span>
          <span className="text-sm text-muted-foreground">Enter all the details by hand</span>
        </Button>
      </CardContent>
    </Card>
  );

  const renderManualForm = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => setEntryMethod("choice")}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <div>
                <CardTitle className="font-headline text-xl">Laptop Details</CardTitle>
                <CardDescription>Provide accurate information to attract buyers.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="ml-auto" onClick={handleAutofill}>
                <Bot className="mr-2 h-4 w-4"/>
                Auto-fill
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="modelId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Laptop Model</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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
                    name="quantity"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input type="number" min={1} placeholder="e.g. 1" {...field} onChange={event => field.onChange(+event.target.value)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>
            
            <Separator />
            
            <div className={cn("space-y-4", quantity > 0 ? "block" : "hidden")}>
                <h3 className="text-lg font-medium text-foreground">Serial Numbers</h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    {fields.map((field, index) => (
                         <FormField
                            key={field.id}
                            control={form.control}
                            name={`serialNumbers.${index}.value`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Serial Number #{index + 1}</FormLabel>
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
                    ))}
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Hardware Specifications</h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FormField
                        control={form.control}
                        name="ram"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>RAM</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select RAM" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="8gb">8GB</SelectItem>
                                <SelectItem value="16gb">16GB</SelectItem>
                                <SelectItem value="32gb">32GB</SelectItem>
                                <SelectItem value="64gb">64GB</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="storage"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Storage</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select Storage" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="256gb">256GB SSD</SelectItem>
                                <SelectItem value="512gb">512GB SSD</SelectItem>
                                <SelectItem value="1tb">1TB SSD</SelectItem>
                                <SelectItem value="2tb">2TB SSD</SelectItem>
                                <SelectItem value="4tb">4TB SSD</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gpu"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>GPU</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. NVIDIA RTX 4080" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="screenSize"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Screen Size</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="13in">13-inch</SelectItem>
                                <SelectItem value="14in">14-inch</SelectItem>
                                <SelectItem value="15in">15-inch</SelectItem>
                                <SelectItem value="16in">16-inch</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Offer Details</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="sellerPrice"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Price</FormLabel>
                            <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">Rs</span>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 150000" className="pl-8" {...field} onChange={event => field.onChange(+event.target.value)} />
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
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
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
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" variant="gradient" size="lg">Upload Product</Button>
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
