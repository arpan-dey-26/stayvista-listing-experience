# 08 — Data model

Types: `src/lib/types.ts`. Content: `src/data/listing.ts`. Nothing else holds
user-visible copy.

## Shape

```text
Listing
├── identity      id, title, subtitle
├── capacity      { guests, bedrooms, beds, bathrooms }
├── rating        rating, reviewCount, ratingBreakdown, isGuestFavourite
├── photos        Photo[]            ← flat, ordered, the single source
├── photoCategories PhotoCategory[]  ← groups referencing photo ids
├── highlights    Highlight[]
├── description   string
├── amenityGroups AmenityGroup[] + featuredAmenityIds
├── reviews       Review[]
├── host          Host (+ coHosts)
├── location      LocationInfo
├── houseRules    HouseRule[]
└── pricing       Pricing (+ breakdown lines)
```

## Decisions worth defending

**Photos are one flat ordered array; categories reference ids.** The lightbox
navigates a single linear sequence while the photo tour presents the same photos
grouped. One array, one index, no desync.

**Capacity is structured, not a string.** The renderer builds the list, which
means correct pluralisation, a real `<ul>` for screen readers, and a CSS
separator rather than a dot baked into content.

**Money is integer minor units.** `nightlyMinor: 450000` → `₹4,500`. No float
arithmetic on prices; formatting happens at the edge via `src/lib/format.ts`.
Dates are ISO-8601 in data and formatted at render.

**Alt text is required on `Photo`.** A photo cannot be added without describing
it.

**Icons are a closed union.** `IconName` rather than `string`, so an amenity
referencing a missing icon fails to compile.

**Amenities are grouped, with a separate featured list.** The page shows a
subset in a grid and all of them in a show-all surface.

## Persistence

None. The data is a static module, imported at build time and server-rendered.
The Save toggle stays in memory for this build; `localStorage` would add a
hydration-mismatch failure mode for no fidelity gain.

## Filling it in

`src/data/listing.ts` is a typed skeleton — structure final, content empty.
`VERIFICATION-QUEUE.md` items DATA-1 … DATA-6 list what must be captured from
the reference. That capture is the first task of Phase 1.
