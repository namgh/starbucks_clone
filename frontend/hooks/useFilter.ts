import Config from "@/configs/config.export";
import { productType } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default (url: string, keyword: string | string[]): productType[] => {
  const [data, setData] = useState<productType[]>([]);
  const { baseUrl } = Config();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/product/n/search/${url}`)
      .then((res) => {
        setData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword]);

  return data;
};
