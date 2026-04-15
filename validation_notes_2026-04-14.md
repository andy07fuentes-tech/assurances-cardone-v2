# Validation notes — 2026-04-14

The live preview at `https://3000-ir5khrwugflnqh25tqk3q-6b298ebd.us2.manus.computer` loads successfully.

Observed after the preloader finishes:

- The hero logo treatment is visually centered within the main composition rather than being offset to one side.
- The hero now reads as a more modern editorial/security interface, with a stronger cinematic background, centered messaging, and a prominent glass information panel.
- Primary calls to action remain visible in the hero, including the quote CTA and the exploration CTA.
- The page content continues below the fold with the existing sections intact.

Build verification also succeeded locally with `pnpm build`, with only a non-blocking bundle-size warning from Vite.

## Broker Quote Connector validation

The new Broker Quote Connector renders on the homepage between the service cards and the secure application vault, and it visually matches the existing black-and-gold Digital Vault treatment.

A live input test with `Tesla Model Y`, driver age `24`, Montréal postal code `H2X 1Y4`, and `0 accident` produced an estimated annual premium of `2,970 $` and a monthly estimate of `248 $`, which aligns with the configured formula: `1,500 × 1.50 × 1.20 × 1.00 × 1.10`.

The page also makes clear that no live-rate provider is connected yet and labels the estimate as indicative and non-binding.

A second interaction switched the claims field to `2+ accidents`. The selector updated correctly in the UI, confirming the higher-risk state can be chosen. The dedicated manual-review message exists in the source logic and copy, although the compact browser viewport did not fully expose that panel during the final visual pass.

A production build completed successfully after the feature addition. The only build note remained the existing non-blocking bundle-size warning.
