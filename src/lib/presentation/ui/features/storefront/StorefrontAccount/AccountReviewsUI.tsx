"use client";

import { EmptyState, ProductThumbnail, StatusBadge } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import type { AccountReview } from "./accountData";

export interface AccountReviewsUIProps {
  reviews: AccountReview[];
  notice: string | null;
  onClickEdit: (id: string) => void;
}

const statusTones = {
  approved: "success",
  pending: "primary",
} as const;

export default function AccountReviewsUI({
  reviews,
  notice,
  onClickEdit,
}: AccountReviewsUIProps) {
  const copy = accountCopy.sections.reviews;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="hidden text-xl font-extrabold lg:mb-2 lg:block lg:text-2xl">
        {copy.desktopTitle}
      </h1>

      {notice && (
        <p
          role="status"
          className="rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
        >
          {notice}
        </p>
      )}

      {reviews.length === 0 ? (
        <EmptyState>{copy.empty}</EmptyState>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <ProductThumbnail
                  illustration={review.illustration}
                  className="size-16"
                />
                <p className="min-w-0 flex-1 text-sm leading-[1.8] font-semibold">
                  {review.product}
                </p>
                <StatusBadge tone={statusTones[review.status]}>
                  {copy.statusLabels[review.status]}
                </StatusBadge>
              </div>
              <p className="text-sm leading-[2] text-muted-foreground">
                {review.body}
              </p>
              <button
                type="button"
                onClick={() => onClickEdit(review.id)}
                className="h-12 self-start rounded-lg border border-input bg-white px-5 text-base font-semibold"
              >
                {copy.edit}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
