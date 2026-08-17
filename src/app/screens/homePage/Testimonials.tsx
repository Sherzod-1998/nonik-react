import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./Testimonials.css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    rating: 5,
    quote:
      "My skin has never looked this glowy! After three weeks of following the recommended routine, my friends keep asking what I'm using now.",
    avatar: "/icons/default-user.svg",
  },
  {
    name: "Emily Park",
    rating: 5,
    quote:
      "The essence completely changed my morning routine. It absorbs instantly and my makeup sits so much smoother on top.",
    avatar: "/icons/default-user.svg",
  },
  {
    name: "Michael Lee",
    rating: 4,
    quote:
      "I was skeptical about K-beauty products, but the cleansing balm removes even waterproof sunscreen without stripping my skin.",
    avatar: "/icons/default-user.svg",
  },
  {
    name: "Ava Thompson",
    rating: 5,
    quote:
      "The sheet masks are a weekly ritual now. My skin feels hydrated for days and the brightening effect is real.",
    avatar: "/icons/default-user.svg",
  },
  {
    name: "Daniel Kim",
    rating: 4,
    quote:
      "Great value for the quality. The toner calmed my breakouts within a week and the packaging feels premium too.",
    avatar: "/icons/default-user.svg",
  },
  {
    name: "Olivia Martinez",
    rating: 5,
    quote:
      "Customer service and product quality are both outstanding. This is my go-to shop for anything skincare related now.",
    avatar: "/icons/default-user.svg",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <Box className={"star-rating"}>
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? (
          <StarIcon key={index} className={"star-icon filled"} />
        ) : (
          <StarBorderIcon key={index} className={"star-icon"} />
        )
      )}
    </Box>
  );
}

export default function Testimonials() {
  return (
    <div className={"testimonials-frame"}>
      <Container>
        <Stack className={"testimonials-main"}>
          <Box className={"testimonials-text"}>
            <span className={"category-title"}>What Our Customers Say</span>
          </Box>

          <Swiper
            className={"testimonials-info swiper-wrapper"}
            slidesPerView={1}
            spaceBetween={24}
            navigation={{
              nextEl: ".testimonials-next",
              prevEl: ".testimonials-prev",
            }}
            pagination={{
              el: ".testimonials-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial, index) => {
              return (
                <SwiperSlide key={index} className={"testimonial-card"}>
                  <Box className={"testimonial-quote-mark"}>&#8220;</Box>
                  <p className={"testimonial-quote"}>{testimonial.quote}</p>
                  <StarRating rating={testimonial.rating} />
                  <Box className={"testimonial-reviewer"}>
                    <img
                      src={testimonial.avatar ?? "/icons/default-user.svg"}
                      className={"testimonial-avatar"}
                      alt={testimonial.name}
                    />
                    <span className={"testimonial-name"}>
                      {testimonial.name}
                    </span>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Box className={"prev-next-frame"}>
            <img
              src={"/icons/arrow-right.svg"}
              className={"testimonials-prev"}
            />
            <div
              className={"dot-frame-pagination testimonials-pagination"}
            ></div>
            <img
              src={"/icons/arrow-right.svg"}
              className={"testimonials-next"}
              style={{ transform: "rotate(-180deg)" }}
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
