import Image from "next/image";
import { banner_1 } from "@/images";
import Link from "next/link";
import { ShoppingBag, Star, TrendingUp, Zap } from "lucide-react";
import Container from "./Container";
import Title from "./Title";

const HomeBanner = async () => {
  return (
    <div className="overflow-hidden">
      <div className="relative py-8 md:py-12 bg-linear-to-br from-shop_light_pink via-pink-50 to-orange-50 rounded-2xl shadow-2xl">
        <Container>
          {/* Animated Background Elements */}
          {/* <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-linear-to-br from-shop_light_green/20 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-linear-to-tr from-shop_dark_green/10 to-transparent rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-shop_light_green/30 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-orange-300/40 rounded-full animate-pulse delay-700"></div>
          </div>  */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <Title className="text-shop_dark_green font-bold text-4xl sm:text-5xl leading-tight animate-fadeInUp delay-200">
                  <span className="block">Your trusted platform</span>
                  <span className="block bg-linear-to-r from-shop_light_green to-shop_dark_green bg-clip-text text-transparent">
                    for refurbished electronics
                  </span>
                  <span className="block text-2xl font-medium text-gray-700">
                    
                  </span>
                </Title>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-fadeInUp delay-400">
                {[
                  {
                    icon: Star,
                    text: "Premium Quality",
                    color: "text-yellow-500",
                  },
                  {
                    icon: TrendingUp,
                    text: "Best Deals",
                    color: "text-green-500",
                  },
                  {
                    icon: ShoppingBag,
                    text: "Free Shipping",
                    color: "text-blue-500",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105"
                  >
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp delay-600">
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center gap-3 bg-linear-to-r from-shop_dark_green to-shop_light_green text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-shop_light_green to-shop_dark_green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                    Shop Now
                  </span>
                  <div className="absolute inset-0 -top-40 -left-10 bg-white/20 w-6 h-40 rotate-12 group-hover:left-full transition-all duration-700"></div>
                </Link>

                <Link
                  href="/deal"
                  className="group inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-shop_dark_green px-8 py-4 rounded-xl text-base font-semibold shadow-md hover:shadow-lg border-2 border-shop_dark_green/20 hover:border-shop_dark_green/40 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse text-orange-500" />
                  View Deals
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div>
              <div>
               
                {/* Main Image */}
                <Image
                  src={banner_1}
                  alt="Premium Headphones"
                  className="relative z-10 w-80 sm:w-96 lg:w-[400px] xl:w-[480px] drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  priority
                />                
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomeBanner;
