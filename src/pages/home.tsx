import { columns } from "@/components/product-table/colums";
import { DataTable } from "@/components/product-table/data-table";
import { TableProvider } from "@/components/product-table/table-context";
import { productKeys } from "@/lib/query-key-factory";
import { getAllProductAsync } from "@/services/product/get-all.service";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: productKeys.all,
    queryFn: getAllProductAsync,
  });

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TableProvider>
          <DataTable isError={isError} columns={columns} data={data!.data.products} />
        </TableProvider>
      )}
    </div>
  );
};

export default HomePage;
