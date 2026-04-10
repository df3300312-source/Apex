import React from "react";
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../css/testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Forex Trader",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      text: "ApexMarkets has transformed my investment journey. The returns are consistent and the platform is incredibly user‑friendly. Highly recommended!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Crypto Investor",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      text: "I've been with ApexMarkets for over a year now. The daily profits are reliable, and the support team is always responsive. A game‑changer!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Retirement Planner",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4.5,
      text: "The variety of investment plans allowed me to tailor my portfolio perfectly. I've seen steady growth without any stress. Very satisfied.",
    },
    {
      id: 4,
      name: "David Okafor",
      role: "Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
      text: "I was skeptical at first, but the transparency and regular updates won me over. My investments are safe and growing daily.",
    },
    {
      id: 5,
      name: "Linda Martinez",
      role: "Gold Investor",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
      text: "The Gold investment option has been fantastic. Great returns and excellent customer service. I'm telling all my friends about ApexMarkets.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Real Estate Investor",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 4.5,
      text: "Real estate through ApexMarkets gave me access to opportunities I never thought possible. Professional and trustworthy.",
    },
  ];

  // Helper to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star-filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star-filled" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star-empty" />);
    }
    return stars;
  };

  return (
    <section className="testimonials-section py-5">
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h2 className="display-6 fw-bold">
            What Our <span className="title-span">Clients Say</span>{" "}
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Real experiences from investors who trust us with their financial
            future.
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial) => (
            <div className="col-lg-4 col-md-6" key={testimonial.id}>
              <div className="testimonial-card h-100">
                <FaQuoteLeft className="quote-icon" />
                <div className="testimonial-rating mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h5 className="author-name">{testimonial.name}</h5>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
                <div className="card-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
