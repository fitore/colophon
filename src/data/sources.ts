import type { Source } from "@/types/catalog";

export const colophonSource: Source = {
  kind: "imprint",
  name: "Colophon",
  slug: "colophon",
  lockup: "Colophon · Bookstore & Press",
};

export const studioSource: Source = {
  kind: "studio",
  name: "The Studio",
  slug: "the-studio",
};

export const externalPublisherSource: Source = {
  kind: "external",
  name: "Other publishers",
  slug: "other-publishers",
};

export const externalArtistSource: Source = {
  kind: "external",
  name: "Other artists",
  slug: "other-artists",
};

export const secondhandSource: Source = {
  kind: "external",
  name: "Secondhand",
  slug: "secondhand",
};
