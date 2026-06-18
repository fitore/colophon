import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";

const consumerRoots = ["src/app", "src/components"];

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return [".ts", ".tsx"].includes(extname(entry.name)) ? [path] : [];
  });
}

describe("catalogue import boundary", () => {
  it("prevents UI consumers from importing repository-owned static data", () => {
    const violations = consumerRoots
      .flatMap(sourceFiles)
      .filter((file) => /from\s+["']@\/data(?:\/[^"']*)?["']/.test(readFileSync(file, "utf8")));

    expect(violations).toEqual([]);
  });
});
