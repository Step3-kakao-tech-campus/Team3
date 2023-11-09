import queryClient from "@/utils/providers/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { PageSearchParams } from "@/types/pageSearchParams";
import React, { Suspense } from "react";
import PostList from "..";
import PostCardSkeleton from "../../PostCard/Skeleton";

async function HydratePostList({ searchParams }: PageSearchParams) {
  await queryClient.prefetchInfiniteQuery(["/api/posts"], async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return { data };
  });

  const prefetchState = queryClient.getQueryState<any>(["/api/posts"]);

  if (prefetchState?.data?.pages[0]?.data?.status !== 200) {
    queryClient.removeQueries(["/api/posts"]);
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <Hydrate state={dehydratedState}>
        <PostList searchParams={searchParams} />
      </Hydrate>
    </Suspense>
  );
}

export default HydratePostList;