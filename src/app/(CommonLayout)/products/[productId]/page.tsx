import ProductDetails from "@/components/module/ProductDetails/ProductDetails";
import { getAProductDataByQuery } from "@/services/product/product.services";

export default async function SingleProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const data1 = await getAProductDataByQuery(`_id=${productId}`);
  const productData = data1?.data?.[0];
  //   console.log(productData);
  return <ProductDetails product={productData}></ProductDetails>;
}
