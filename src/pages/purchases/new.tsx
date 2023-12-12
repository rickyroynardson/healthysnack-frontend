import { SubHeader } from "@/components/elements/SubHeader";
import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CreatePurchaseFormSchema,
  createPurchaseFormSchema,
} from "@/features/purchases/forms/create-purchase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Save } from "lucide-react";
import { NextPage } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const NewPurchasePage: NextPage = () => {
  const form = useForm<CreatePurchaseFormSchema>({
    defaultValues: {
      invoiceNumber: "",
      vendor: "",
      orderDate: new Date(),
      memo: "",
      inventories: [],
    },
    resolver: zodResolver(createPurchaseFormSchema),
    reValidateMode: "onChange",
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "inventories",
  });

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="New Purchase" />
      <FullPageLayout>
        <SubHeader url="/purchases" title="New Purchase" />
        <div className="container py-4 pb-24 lg:pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => console.log(values))}
              className="space-y-4"
            >
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 aspect-square" />
                  <span>Save</span>
                </Button>
              </div>
              <div className="border rounded-lg p-4 grid grid-cols-1 lg:grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="memo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button type="button">Add item</Button>
              </div>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Detail</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
            </form>
          </Form>
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default NewPurchasePage;
