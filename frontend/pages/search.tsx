import SearchHistoryList from "@/components/widgets/SearchHistoryList";
import SearchRecommandList from "@/components/widgets/SearchRecommandList";
import SearchTop from "@/components/widgets/SearchTop";
import Head from "next/head";
import React from "react";

export default function Search() {
  return (
    <>
      <Head>
        <title>Starbucks | Search</title>
      </Head>
      <SearchTop />
      <SearchHistoryList />
      <SearchRecommandList />
    </>
  );
}
