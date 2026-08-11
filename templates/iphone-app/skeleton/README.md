# ${{ values.name }}

${{ values.description }}

SwiftUI iPhone app scaffolded by Backstage.

## Details

- **Bundle ID:** `${{ values.bundleId }}`
- **Owner:** `${{ values.owner }}`

## Open in Xcode

1. Open Xcode
2. **File → New → Project → App** (iOS), or open the sources under `App/`
3. Set the product name to `${{ values.name }}` and bundle identifier to `${{ values.bundleId }}`
4. Replace the generated Swift files with the ones in this folder

Alternatively, create a new iOS App project and copy:

- `App/${{ values.name }}App.swift`
- `App/ContentView.swift`

## Run

Build and run on an iPhone Simulator from Xcode.
