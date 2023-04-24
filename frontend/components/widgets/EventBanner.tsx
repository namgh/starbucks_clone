import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LinkImage from "../ui/LinkImage";
import axios from "axios";
import { eventType } from "@/types/types";
import Loading from "../ui/Loading";
import Config from "@/configs/config.export";

function NextArrow(props: { style?: any }) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

function PrevArrow(props: { style?: any }) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

export default function EventBanner() {
  const [loading, setLoading] = useState<boolean>(true);
  const [eventList, setEventList] = useState<eventType[]>();
  const { baseUrl } = Config();

  useEffect(() => {
    axios.get(`${baseUrl}/api/event`).then((result) => {
      setEventList(result.data);
      setLoading(false);
    });
  }, [baseUrl]);

  const settings = {
    infinite: true,
    speed: 500,
    centerPadding: "0px",
    arrow: false,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2300,
    dots: true,
  };

  return (
    <section id="event-banner" className="first-section">
      <div className="event-banner">
        {loading ? (
          <div
            style={{
              zIndex: 1,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba( 255, 255, 255, 0.5 )",
              paddingTop: "50%",
            }}
          >
            <Loading />
          </div>
        ) : (
          <Slider {...settings}>
            {eventList &&
              eventList.map((e: eventType) => (
                <LinkImage
                  key={e.id}
                  route={`/event?category=${e.tag}`}
                  imageSrc={`https://storage.googleapis.com/ghbt/event_thumbnail/${e.thumbnailUrl}`}
                  alt={e.description}
                />
              ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
