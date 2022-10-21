import { medusaClient } from "../config"

export const getProductIds = async (): Promise<string[]> => {
  const products = await medusaClient.products
    .list({ limit: 25 })
    .then(({ products }) => products)

  const ids: string[] = []
  
  for (const product of products) {
    if (product.id) {
      ids.push(product.id)
    }
  }

  return ids
}
