# 16 — Performance note

What was measured, what could not be, and what is claimed. Nothing here is a
load-time number, because no load time has ever been observed.

## The limitation, first

**Performance of the image origin could not be fully validated because the
sandbox could not reach the reference asset origin.** Every photograph in this
project is fetched at runtime from the reference host. No image has ever
painted. So:

- no LCP, transfer size, decode time or waterfall
- no real-world layout-shift measurement
- no evidence about origin latency or caching headers

None of those is estimated below.

## What was measured

| Step | Image requests | Notes |
| --- | --- | --- |
| Listing, at rest | **5** | The hero mosaic. |
| Opening the photo tour | **+23** | Lazy loading holds back the rest of the 43. |
| Opening the lightbox | **+1** | The displayed photo only. |
| Stepping five photos | **+5** | Exactly one per photo. |

| Element | `loading` | `fetchpriority` | Intrinsic size |
| --- | --- | --- | --- |
| Hero tile 1 | `eager` | `high` | yes |
| Hero tiles 2–5 | `lazy` | — | yes |
| All 43 tour photos | `lazy` | — | yes |
| Lightbox image | `eager` | `high` | yes |

Every image carries width and height, reserving its box before bytes arrive.

## A measurement that was wrong first

The first probe reported 43 requests on opening the tour. The harness was wrong:
the next/image stub dropped `priority` and `loading`, making every image eager.
The stub now models lazy loading unless priority is set.

## Decisions

**No bulk preloading.** The tour requests roughly half its photos on open; the
rest arrive as the user scrolls.

**`priority` is spent once per view.** One hero tile and one lightbox image are
eager.

**No virtualization.** 43 nodes does not justify it, and TOUR-6 requires all 43
in the DOM.

**No image-management, animation or state library.** Dependencies are next,
react and react-dom.

Bundle size has **not** been measured: `next build` has never run (R-12), so
there is no build output to weigh. That is a blocked check, not a passed one.
