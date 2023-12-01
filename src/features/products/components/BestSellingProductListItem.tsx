interface BestSellingProductListItemProps {
  number: number;
  name: string;
  totalQuantitySold: number;
}

export const BestSellingProductListItem: React.FC<
  BestSellingProductListItemProps
> = ({ number, name, totalQuantitySold }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-0 bg-primary text-white font-semibold w-12 aspect-square rounded-full flex items-center justify-center">
        {number}
      </div>
      <div className="grow flex items-center justify-between border rounded-lg px-2 py-1 pl-10 ml-5">
        <p>{name}</p>
        <p className="text-sm">
          <span className="font-semibold">{totalQuantitySold}</span> Terjual
        </p>
      </div>
    </div>
  );
};
