import type { Print } from "@/types/catalog";
import { aldousFenn, juneVale, miraSolenne, noorAdesina } from "./people";
import { externalArtistSource, secondhandSource, studioSource } from "./sources";

export const prints: Print[] = [
  {
    type: "print",
    slug: "first-light",
    title: "First Light",
    medium: "Linocut on cotton rag",
    dimensions: "400 × 300 mm",
    edition: "Edition of 25",
    price: { amount: 120, currency: "CAD" },
    condition: "new",
    source: studioSource,
    status: "for-sale",
    contributors: [{ person: miraSolenne, role: "artist" }],
    description: "A study in radiance, cut and pulled by hand in the studio.",
  },
  {
    type: "print",
    slug: "house-mark-broadside",
    title: "House Mark Broadside",
    medium: "Letterpress on mould-made paper",
    dimensions: "500 × 350 mm",
    edition: "Edition of 40",
    condition: "new",
    source: studioSource,
    status: "sold-out",
    contributors: [{ person: aldousFenn, role: "printer" }],
    description: "The Colophon house mark printed as a broadside.",
  },
  {
    type: "print",
    slug: "still-water",
    title: "Still Water",
    medium: "Screenprint",
    dimensions: "420 × 297 mm",
    edition: "Edition of 30",
    price: { amount: 95, currency: "CAD" },
    condition: "new",
    source: externalArtistSource,
    status: "for-sale",
    contributors: [{ person: juneVale, role: "artist" }],
    description: "A quiet study of reflected form and open colour.",
  },
  {
    type: "print",
    slug: "winter-room",
    title: "Winter Room",
    medium: "Lithograph",
    dimensions: "380 × 280 mm",
    condition: "used",
    source: secondhandSource,
    status: "for-sale",
    contributors: [{ person: noorAdesina, role: "artist" }],
    description: "A previously loved lithograph with a soft, time-worn surface.",
  },
  {
    type: "print",
    slug: "paper-study-one",
    title: "Paper Study I",
    medium: "Relief print",
    condition: "new",
    source: studioSource,
    status: "draft",
    contributors: [{ person: miraSolenne, role: "artist" }],
  },
];

export function getPrint(slug: string): Print | undefined {
  return prints.find((print) => print.slug === slug);
}
