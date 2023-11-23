import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductList } from "@/features/sales/components";
import {
  CreateSaleFormSchema,
  createSaleFormSchema,
} from "@/features/sales/forms/create-sale";
import { useCreateSale } from "@/features/sales/useCreateSale";
import { queryClient } from "@/lib/react-query";
import { toRupiah } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Minus, Plus } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const SalesPage: NextPage = () => {
  const [payTotal, setPayTotal] = useState("0");
  const { mutateAsync: createSaleMutate } = useCreateSale();

  const form = useForm<CreateSaleFormSchema>({
    defaultValues: {
      products: [],
    },
    resolver: zodResolver(createSaleFormSchema),
    reValidateMode: "onChange",
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onProductClick = (productId: number, name: string, price: number) => {
    const index = fieldArray.fields.findIndex(
      (value) => value.productId === productId
    );

    if (index !== -1) {
      fieldArray.update(index, {
        ...fieldArray.fields[index],
        quantity: fieldArray.fields[index].quantity + 1,
      });
    } else {
      fieldArray.append({ productId, name, price, quantity: 1 });
    }
  };

  const handleCheckout = async (values: CreateSaleFormSchema) => {
    try {
      const response = await createSaleMutate(values);
      toast.success(response.data.message);
      form.reset();
      setPayTotal("0");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  const totalPrice = fieldArray.fields.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Sale" />
      <FullPageLayout>
        <div className="container py-4 pb-24 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProductList onProductClick={onProductClick} />
            <div className="border rounded-lg p-4 space-y-2 h-fit max-h-[40vh] lg:max-h-[95vh] overflow-y-auto">
              {fieldArray.fields.map(
                (
                  value: {
                    id: string;
                    productId: number;
                    name: string;
                    price: number;
                    quantity: number;
                  },
                  index
                ) => (
                  <div
                    key={value.id}
                    className="p-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <p>{value.quantity}x</p>
                      <div>
                        <p>{value.name}</p>
                        <p className="text-sm">{toRupiah(value.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newQuantity = value.quantity - 1;
                          if (newQuantity === 0) {
                            fieldArray.remove(index);
                          } else {
                            fieldArray.update(index, {
                              ...value,
                              quantity: newQuantity,
                            });
                          }
                        }}
                      >
                        <Minus className="w-4 aspect-square" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          fieldArray.update(index, {
                            ...value,
                            quantity: value.quantity + 1,
                          })
                        }
                      >
                        <Plus className="w-4 aspect-square" />
                      </Button>
                    </div>
                  </div>
                )
              )}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Total price:</p>
                  <p>{toRupiah(totalPrice)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Pay:</p>
                  <Input
                    type="number"
                    className="w-fit"
                    value={payTotal}
                    onChange={(e) => setPayTotal(e.target.value)}
                  />
                </div>
                <Button
                  onClick={form.handleSubmit((values) =>
                    handleCheckout(values)
                  )}
                  className="w-full"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default SalesPage;
