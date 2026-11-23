"use client";

import { PackageCheck, ShieldCheck, Smartphone, Truck } from "lucide-react";
import type { CustomerLoginCopy } from "./customerAuthCopy";

const benefitIcons = [ShieldCheck, Truck, PackageCheck, Smartphone];

export default function AuthBenefitsPanel({
  translations,
}: {
  translations: CustomerLoginCopy;
}) {
  return (
    <aside className="hidden rounded-xl bg-primary p-8 text-white lg:flex lg:flex-col lg:justify-center">
      <p className="text-xl leading-[1.7] font-bold">
        {translations.benefits.title}
      </p>
      <ul className="mt-6 space-y-6">
        {translations.benefits.items.map((item, index) => {
          const Icon = benefitIcons[index] ?? ShieldCheck;
          return (
            <li key={item.title} className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#095a5a] text-white">
                <Icon size={21} />
              </span>
              <span className="leading-[1.8]">
                <span className="block text-[15px] font-semibold">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[13px] text-[#c9e3e1]">
                  {item.description}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
