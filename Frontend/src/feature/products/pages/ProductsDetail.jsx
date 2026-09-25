import { useParams, useNavigate, Link } from "react-router";
import { useProduct } from "../Hooks/useProduct";
import { useEffect, useState } from "react";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

const CURRENCY_LABEL = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  PKR: "PKR",
  INR: "INR",
  AED: "AED",
  CAD: "CAD",
  AUD: "AUD",
};

const formatPrice = (price) => {
  if (!price) return "—";
  const label = CURRENCY_LABEL[price.currency] || price.currency || "";
  const amount = Number(price.amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${label} ${amount}`.trim();
};

const DETAILS_ROWS = [
  { label: "Shipping", value: "Complimentary over INR 10,000" },
  { label: "Returns", value: "Within 14 days of delivery" },
  { label: "Authenticity", value: "100% guaranteed" },
];

const ProductsDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleProductDetail } = useProduct();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchProductDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await handleProductDetail(productId);
        if (!cancelled) {
          setProduct(data);
          setActiveImage(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load product."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProductDetail();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const images = product?.images || [];
  const currentImage = images[activeImage]?.url;
  const hasMultiple = images.length > 1;

  const showPrev = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setActiveImage((i) => (i + 1) % images.length);

  return (
    <div className="min-h-screen bg-[#f6f3ec] text-[#2b2622]">
      {/* Top bar */}
      <header className="border-b border-[#e4ddd0]">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            to="/"
            style={serif}
            className="text-lg font-medium uppercase tracking-[0.35em] text-[#b79b6e]"
          >
            Snitch.
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {loading ? (
          <DetailSkeleton />
        ) : error || !product ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p style={serif} className="text-2xl text-[#2b2622]">
              {error || "Product not found."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="border border-[#c9bfad] px-6 py-2 text-xs uppercase tracking-[0.2em] text-[#6b6357] transition-colors hover:bg-[#2b2622] hover:text-[#f6f3ec]"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,340px)]">
            {/* Thumbnail rail */}
            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
              {images.map((img, index) => (
                <button
                  key={img._id || index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden transition-opacity ${
                    activeImage === index
                      ? "opacity-100 ring-1 ring-[#b79b6e]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${product.title || "Product"} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="order-1 md:order-2">
              <div className="group relative aspect-3/4 w-full overflow-hidden bg-[#e9e3d8]">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.title || "Product"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#c9bfad]">
                    <svg
                      className="h-12 w-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}

                {/* Swipe / navigation buttons */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#f6f3ec]/85 text-[#2b2622] shadow-sm backdrop-blur transition-all hover:bg-[#f6f3ec] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b79b6e] md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#f6f3ec]/85 text-[#2b2622] shadow-sm backdrop-blur transition-all hover:bg-[#f6f3ec] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b79b6e] md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>

                    {/* Counter */}
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#26221e]/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#f6f3ec]">
                      {activeImage + 1} / {images.length}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Info column */}
            <div className="order-3 flex flex-col pt-2">
              <h1
                style={serif}
                className="text-4xl font-normal leading-tight text-[#2b2622]"
              >
                {product.title || "Untitled product"}
              </h1>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6357]">
                {formatPrice(product.price)}
              </p>

              <div className="mt-8 border-t border-[#e4ddd0] pt-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#b79b6e]">
                  The Details
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a443c]">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  className="w-full bg-[#26221e] py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f6f3ec] transition-colors hover:bg-[#3a342d]"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="w-full border border-[#cfc6b5] py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#4a443c] transition-colors hover:border-[#26221e] hover:text-[#26221e]"
                >
                  Buy Now
                </button>
              </div>

              {/* Details table */}
              <dl className="mt-8 space-y-0 border-t border-[#e4ddd0] text-[11px] uppercase tracking-[0.15em] text-[#8a8172]">
                {DETAILS_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-[#e4ddd0] py-3"
                  >
                    <dt>{row.label}</dt>
                    <dd className="text-right text-[#a49a88]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="grid grid-cols-1 gap-10 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,340px)]">
    <div className="hidden flex-col gap-3 md:flex">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-16 w-16 animate-pulse bg-[#e9e3d8]" />
      ))}
    </div>
    <div className="aspect-3/4 w-full animate-pulse bg-[#e9e3d8]" />
    <div className="space-y-4 pt-2">
      <div className="h-10 w-3/4 animate-pulse bg-[#e9e3d8]" />
      <div className="h-4 w-1/3 animate-pulse bg-[#e9e3d8]" />
      <div className="h-20 w-full animate-pulse bg-[#e9e3d8]" />
      <div className="h-12 w-full animate-pulse bg-[#e9e3d8]" />
      <div className="h-12 w-full animate-pulse bg-[#e9e3d8]" />
    </div>
  </div>
);

export default ProductsDetail;
