"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(
  ({ href, ...props }, ref) => <NextLink href={href} ref={ref} {...props} />,
);

Link.displayName = "Link";
