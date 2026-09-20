# Geometry verification

The verification scripts are intentionally dependency-light. They build the
application into a temporary static surface, run deterministic audits, and
report measurable deviations.

Run from the repository root:

```bash
node scripts/verify-geometry/verify-release.mjs
```

Individual scripts can be run when debugging a specific surface.
