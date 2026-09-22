# ORLYVA public marketing site

Source-only V1 for the public `orlyva.co` marketing domain.

## Scope

This package is intentionally independent from the authenticated seller app at
`app.orlyva.co`. It does not contain Supabase credentials, checkout logic,
provider execution, billing logic, or any Production mutation path.

The site uses only approved ORLYVA brand assets copied at build time from the
repository:

- `assets/brand/orlyva-wordmark.png`
- `assets/brand/lyva-logo.png`
- `assets/brand/phase11-entry-a-editorial.png`

## Local preview

```bash
cd marketing-site
npm run build
npm run dev
```

The preview defaults to `http://127.0.0.1:4175`.

## Publication boundary

Publishing this site, creating a new Bolt project, connecting `orlyva.co`,
or changing DNS are separate owner-gated actions. A source merge does not
authorize any of those actions.
