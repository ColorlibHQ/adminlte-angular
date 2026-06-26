# Releasing `@adminlte/angular`

The published npm package is the **ng-packagr build output** in `dist/adminlte-angular/`,
**not** the repository root. Its `package.json` is generated from
`projects/adminlte-angular/package.json` at build time, and the `npm run build` step also
copies `README.md`, `LICENSE`, and the AdminLTE base CSS into the dist so the tarball ships
them. Always publish from the `dist/adminlte-angular` folder.

npm publisher: **silkalns** (the `@adminlte` scope already hosts `@adminlte/vue` and
`@adminlte/react`). The scope is public, so the package's `publishConfig.access` is set to
`"public"` — required for scoped packages.

## 1. Bump the version

Bump the library version (the source of truth for the published package):

```bash
# Edit "version" in projects/adminlte-angular/package.json
# Keep the workspace root package.json version in sync (cosmetic; it is private).
```

Update `CHANGELOG.md` (move the `[Unreleased]` entries under the new version + date).

## 2. Build

```bash
npm ci            # clean install (matches CI)
npm run build     # builds the library + copies README/LICENSE/CSS into dist
npm run build:demo  # optional sanity check that the demo still compiles
```

Verify the tarball before publishing (this does NOT publish):

```bash
cd dist/adminlte-angular
npm pack --dry-run
```

The file list should include `fesm2022/*.mjs`, `types/*.d.ts`, `css/adminlte.css`,
`css/adminlte.rtl.css`, `README.md`, `LICENSE`, and `package.json`.

## 3. Publish

npm 2FA is enabled on the `silkalns` account, so an OTP (6-digit code from the
authenticator app) is required:

```bash
cd dist/adminlte-angular
npm publish --access public --otp=<code>
```

`--access public` is redundant with `publishConfig` but harmless and explicit.

## 4. Tag the release

From the repo root (replace with the version you just published):

```bash
git tag v0.2.0
git push origin v0.2.0   # done by a human; CI/repo lives at ColorlibHQ/adminlte-angular
```

## 5. Verify

```bash
npm view @adminlte/angular version
```
