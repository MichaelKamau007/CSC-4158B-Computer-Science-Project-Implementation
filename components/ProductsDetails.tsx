"use client";

import { Product } from "@/sanity.types";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductsDetails = ({ product }: Props) => {
  return (
    <div className="w-full space-y-8 mb-10">
      {/* Description Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-shop_dark_green mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-shop_orange rounded-full"></span>
          Description
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          {product?.richDescription ? (
            <PortableText
              value={product.richDescription}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="my-4 text-base leading-relaxed text-gray-600 first:mt-0 last:mb-0">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="my-6 text-3xl font-bold text-shop_dark_green first:mt-0 last:mb-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="my-5 text-2xl font-bold text-shop_dark_green first:mt-0 last:mb-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="my-4 text-xl font-semibold text-shop_dark_green first:mt-0 last:mb-0">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 border-l-4 border-shop_light_green bg-shop_light_bg pl-4 py-2 text-base italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                },
                types: {
                  image: ({ value }) => (
                    <div className="my-6 overflow-hidden rounded-lg shadow-md">
                      <Image
                        alt={value.alt || "Product Image"}
                        src={urlFor(value).width(800).url()}
                        className="w-full h-auto object-cover"
                        width={800}
                        height={600}
                        unoptimized
                      />
                    </div>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="my-4 list-disc pl-5 space-y-1 text-gray-600">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="my-4 list-decimal pl-5 space-y-1 text-gray-600">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li className="pl-1">{children}</li>,
                  number: ({ children }) => <li className="pl-1">{children}</li>,
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-shop_dark_green">
                      {children}
                    </strong>
                  ),
                  link: ({ value, children }) => (
                    <Link
                      href={value.href}
                      className="font-medium text-shop_light_green hover:text-shop_dark_green underline decoration-shop_light_green underline-offset-4 hover:decoration-shop_dark_green transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </Link>
                  ),
                },
              }}
            />
          ) : product?.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="text-gray-400 italic">No description available.</p>
          )}
        </div>
      </div>

      {/* Additional Information Section */}
      {/* <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-shop_dark_green mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-shop_orange rounded-full"></span>
          Additional Information
        </h2>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 w-1/3">
                  Weight
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  190 kg
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 w-1/3">
                  Dimensions
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  3 × 72 × 109 cm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default ProductsDetails;
