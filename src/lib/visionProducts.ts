import type { VisionProduct } from "@/lib/types";

/**
 * Hidden future-catalogue taster — dummy data for /vision-catalogue.
 * Most images are intentionally left undefined so components render the
 * CSS placeholder; the two approved glass panels are wired where they fit.
 * scarcityLabel carries the ruby status language reserved for this page.
 */
export const visionProducts: VisionProduct[] = [
  {
    slug: "first-light-edition",
    title: "First Light",
    kind: "edition",
    description:
      "The inaugural Colophon edition — letterpress text, hand-sewn, in a cloth case stamped with the colophon.",
    material: "Mohawk cotton, book cloth, foil",
    dimensions: "210 × 140 mm",
    edition: "Edition of 50",
    scarcityLabel: "First 50",
    provenance: "Set and bound in Ontario, Canada.",
    image: "/images/glass/vision-panel.png",
    imageAlt: "Small stained-glass panel for Future Catalogue page.",
  },
  {
    slug: "colophon-print-i",
    title: "Colophon, Print I",
    kind: "print",
    description:
      "A pulled print of the house mark — hand, paper, and leaf — on heavyweight cotton rag.",
    material: "Cotton rag, archival ink",
    dimensions: "400 × 300 mm",
    edition: "Edition of 25",
    scarcityLabel: "12 remaining",
    provenance: "Signed and numbered.",
    image: "/images/glass/vision-print-panel.png",
    imageAlt: "Future catalogue print panel crop.",
  },
  {
    slug: "the-quiet-page-deluxe",
    title: "The Quiet Page — Deluxe",
    kind: "edition",
    description:
      "A clothbound deluxe binding of The Quiet Page with a tipped-in frontispiece.",
    material: "Book cloth, mould-made endpapers",
    dimensions: "230 × 155 mm",
    edition: "Edition of 30",
    scarcityLabel: "By request",
    provenance: "Bound to order.",
  },
  {
    slug: "composing-stick-object",
    title: "Composing Stick",
    kind: "object",
    description:
      "A restored brass-and-steel composing stick, the tool at the heart of hand composition.",
    material: "Brass, steel",
    dimensions: "Adjustable to 30 picas",
    scarcityLabel: "One of a kind",
    provenance: "Sourced and restored.",
  },
  {
    slug: "margins-broadside",
    title: "Margins, Broadside",
    kind: "print",
    description:
      "A single passage from Margins, set large and printed as a broadside to be read on a wall.",
    material: "Mould-made paper, letterpress",
    dimensions: "500 × 350 mm",
    edition: "Edition of 40",
    scarcityLabel: "Open until sold",
  },
  {
    slug: "forms-of-permanence-portfolio",
    title: "Forms of Permanence — Portfolio",
    kind: "object",
    description:
      "A clamshell portfolio collecting loose signatures, swatches, and binding samples.",
    material: "Greyboard, book cloth",
    dimensions: "320 × 240 mm",
    edition: "Edition of 15",
    scarcityLabel: "8 remaining",
    provenance: "Assembled by hand.",
  },
  {
    slug: "house-mark-medallion",
    title: "House Mark Medallion",
    kind: "object",
    description:
      "A small pressed-metal medallion of the Colophon house mark, tucked into the deluxe editions.",
    material: "Pressed brass",
    dimensions: "32 mm",
    scarcityLabel: "With editions only",
  },
  {
    slug: "first-light-proof",
    title: "First Light — Proof Set",
    kind: "edition",
    description:
      "The working proofs of First Light, kept and offered as a record of how the edition was made.",
    material: "Proofing stock, annotations",
    dimensions: "210 × 140 mm",
    edition: "Edition of 5",
    scarcityLabel: "5 only",
    provenance: "From the press archive.",
  },
];

export function getVisionProduct(slug: string): VisionProduct | undefined {
  return visionProducts.find((product) => product.slug === slug);
}
