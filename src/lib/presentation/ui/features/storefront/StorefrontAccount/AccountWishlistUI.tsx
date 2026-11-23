"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { EmptyState, ProductThumbnail } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import type { WishlistItem } from "./accountData";

export interface AccountWishlistUIProps {
  items: WishlistItem[];
  notice: string | null;
  onClickRemove: (id: string) => void;
  onClickRemoveAll: () => void;
  onClickAddToCart: (item: WishlistItem) => void;
}

export default function AccountWishlistUI({
  items,
  notice,
  onClickRemove,
  onClickRemoveAll,
  onClickAddToCart,
}: AccountWishlistUIProps) {
  const copy = accountCopy.sections.wishlist;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="hidden min-w-0 flex-1 text-xl font-extrabold lg:block lg:text-2xl">
          {copy.desktopTitle}
        </h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClickRemoveAll}
            className="h-11 rounded-lg border border-input bg-white px-4 text-sm font-semibold text-destructive"
          >
            {copy.removeAll}
          </button>
        )}
      </div>

      {notice && (
        <p
          role="status"
          className="rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
        >
          {notice}
        </p>
      )}

      {items.length === 0 ? (
        <EmptyState>{copy.empty}</EmptyState>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="relative grid aspect-[4/3] place-items-center bg-muted">
                <ProductThumbnail
                  illustration={item.illustration}
                  className="size-16 bg-white/60"
                  iconSize={38}
                />
                {item.discount && (
                  <span className="absolute start-2 top-2 inline-flex h-6 items-center rounded-full bg-accent px-2.5 text-xs font-semibold text-accent-foreground">
                    {item.discount}
                  </span>
                )}
                <button
                  type="button"
                  aria-label={copy.remove}
                  onClick={() => onClickRemove(item.id)}
                  className="absolute end-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 text-muted-foreground hover:text-destructive"
                >
                  <Heart
                    size={17}
                    className="fill-destructive text-destructive"
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <Link
                  href={`/product/${item.id}`}
                  className="line-clamp-2 min-h-12 text-sm leading-[1.7] font-medium hover:text-primary"
                >
                  {item.title}
                </Link>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  {item.rating} ({item.reviews.toLocaleString("fa-IR")})
                </span>
                <span className="text-base font-bold tabular-nums">
                  {item.price.toLocaleString("fa-IR")}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {copy.toman}
                  </span>
                </span>
                {item.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {item.oldPrice.toLocaleString("fa-IR")}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onClickAddToCart(item)}
                  className="mt-auto h-11 rounded-lg border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
                >
                  {copy.addToCart}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
