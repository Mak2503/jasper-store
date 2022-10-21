import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { getProductIds } from "@lib/util/get-product-handles"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

interface Params extends ParsedUrlQuery {
  id: string
}

const fetchProduct = async (id: string) => {
  return await medusaClient.products
    .list({ id })
    .then(({ products }) => products[0])
}

const ProductPage: NextPageWithLayout<PrefetchedPageProps> = ({ notFound }) => {
  const { query, isFallback, replace } = useRouter()
  const id = typeof query.id === "string" ? query.id : ""

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, id],
    () => fetchProduct(id),
    {
      enabled: id.length > 0,
      keepPreviousData: true,
    }
  )
  console.log(data)

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }

  if (isSuccess) {
    return (
      <>
        <Head
          description={data.description}
          title={data.title}
          image={data.thumbnail}
        />
        <ProductTemplate product={data} />
      </>
    )
  }

  return <></>
}

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getProductIds()
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_product`, id], () => fetchProduct(id))

  const queryData = await queryClient.getQueryData([`get_product`, id])

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    },
  }
}

export default ProductPage
