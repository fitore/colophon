export type SourceKind = "imprint" | "studio" | "external";

export type Source = {
  kind: SourceKind;
  name: string;
  slug: string;
  lockup?: string;
};

export function isInHouseSource(source: Source): boolean {
  return source.kind === "imprint" || source.kind === "studio";
}

export type Person = {
  name: string;
  slug: string;
  bio?: string;
  photo?: string;
};

export type Condition = "new" | "used";
export type BookStatus = "draft" | "forthcoming" | "for-sale" | "out-of-print";
export type PrintStatus = "draft" | "for-sale" | "sold-out";
export type EssayStatus = "draft" | "published" | "archived";

export type Money = {
  amount: number;
  currency: "CAD";
};

export type PersonRoleLink = {
  person: Person;
  role: "author" | "artist" | "editor" | "translator" | "illustrator" | "printer";
};

export type Book = {
  type: "book";
  title: string;
  slug: string;
  isbn?: string;
  formats?: string[];
  price?: Money;
  condition: Condition;
  source: Source;
  status: BookStatus;
  contributors: PersonRoleLink[];
  description?: string;
  image?: string;
};

export type Print = {
  type: "print";
  title: string;
  slug: string;
  medium?: string;
  dimensions?: string;
  edition?: string;
  price?: Money;
  condition: Condition;
  source: Source;
  status: PrintStatus;
  contributors: PersonRoleLink[];
  description?: string;
  image?: string;
};

export type Essay = {
  type: "essay";
  title: string;
  slug: string;
  body?: string;
  excerpt?: string;
  status: EssayStatus;
  contributors: PersonRoleLink[];
  aboutBookSlug?: string;
  publishedAt?: string;
};

export type Acquirable = Book | Print;

export type Catalogue = {
  name: string;
  slug: string;
  visibility: "public" | "hidden";
  features: Acquirable[];
};

export type AcquisitionCta = {
  label: string;
  href?: string;
  disabled?: boolean;
};
