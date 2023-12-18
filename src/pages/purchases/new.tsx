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
import { CalendarIcon, Save, X } from "lucide-react";
import { NextPage } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllInventories } from "@/features/inventories";
import { Inventory } from "@/features/inventories/types";
import { useState } from "react";
import { toRupiah } from "@/utils/format";
import { useCreatePurchase } from "@/features/purchases/useCreatePurchase";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const NewPurchasePage: NextPage = () => {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const { data: inventories } = useGetAllInventories();
  const { mutateAsync: createPurchaseMutate } = useCreatePurchase();
  const router = useRouter();

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

  const handleAddItem = ({
    inventoryId,
    inventoryDetail,
  }: {
    inventoryId: number;
    inventoryDetail: { name: string; stock: number; unit: string };
  }) => {
    fieldArray.append({
      inventoryId,
      inventoryDetail,
      quantity: "",
      price: "",
    });
    setSearchItem("");
    setIsAddItemDialogOpen(false);
  };

  const handleCreatePurchase = async (values: CreatePurchaseFormSchema) => {
    try {
      const response = await createPurchaseMutate(values);
      toast.success(response.data.message);
      form.reset();
      router.push("/purchases");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  const totalPrice = fieldArray.fields.reduce((total, _, index) => {
    const quantity = form.watch(`inventories.${index}.quantity`);
    const price = form.watch(`inventories.${index}.price`);
    const subTotal = parseInt(quantity) * parseInt(price) || 0;
    return total + subTotal;
  }, 0);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="New Purchase" />
      <FullPageLayout>
        <SubHeader url="/purchases" title="New Purchase" />
        <div className="container py-4 pb-24 lg:pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                handleCreatePurchase(values)
              )}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Fill the form to create a new purchase data
                </p>
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
                <Dialog
                  open={isAddItemDialogOpen}
                  onOpenChange={setIsAddItemDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button type="button">Add item</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add item</DialogTitle>
                      <DialogDescription>
                        Select item to add in purchase list
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search item..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                      />
                      <div className="flex gap-2">
                        {inventories?.data.data
                          .filter((inventory: Inventory) =>
                            inventory.name
                              .toLowerCase()
                              .includes(searchItem.toLowerCase())
                          )
                          .map((inventory: Inventory) => (
                            <Button
                              key={inventory.id}
                              variant="outline"
                              onClick={() =>
                                handleAddItem({
                                  inventoryId: inventory.id,
                                  inventoryDetail: {
                                    name: inventory.name,
                                    stock: inventory.stock,
                                    unit: inventory.unit,
                                  },
                                })
                              }
                            >
                              {inventory.name}
                            </Button>
                          ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Detail</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead colSpan={2}>Sub total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell colSpan={2}>{toRupiah(totalPrice)}</TableCell>
                    </TableRow>
                  </TableFooter>
                  <TableBody>
                    {fieldArray.fields.map((field, index) => {
                      const quantity = form.watch(
                        `inventories.${index}.quantity`
                      );
                      const price = form.watch(`inventories.${index}.price`);
                      const subTotal =
                        parseInt(quantity) * parseInt(price) || 0;

                      return (
                        <TableRow key={field.id}>
                          <TableCell>
                            <ul>
                              <li>{field.inventoryDetail.name}</li>
                              <li className="text-sm text-muted-foreground">
                                ({field.inventoryDetail.stock}{" "}
                                {field.inventoryDetail.unit})
                              </li>
                            </ul>
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`inventories.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Qty"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`inventories.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Price"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>{toRupiah(subTotal)}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => fieldArray.remove(index)}
                            >
                              <X className="w-4 aspect-square" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
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
