# Issue Draft: CT-008 — VQ-VAE Codebook Alias Rate Must Be Validated Before Optical Slugs Can Be Trusted

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-008: VQ-VAE codebook alias rate must be validated before optical slugs can be trusted

**Type:** validation

**Labels:** codec, vq-vae, aliasing, testing

**Depends on:** — (validation gap; requires empirical testing before deployment)

---

## Summary

The codec adapters section requires that VQ-VAE (Vector-Quantized Variational Autoencoder) optical slugs undergo alias collision testing — verifying that distinct inputs do not produce identical compressed outputs. The RFC explicitly requires this testing and acknowledges that undersized codebooks cause aliasing (distinct inputs mapping to the same code). The evaluation blog cited in the RFC shows that codebook size is a hard constraint on VQ-VAE quality — small codebooks cause performance to plateau regardless of other hyperparameters.

---

## Evidence

**From "Codec Adapters" — Aliasing Tests and Quality Control:**
> "We must ensure aliasing is minimized: i.e. two different pieces of text should not compress to the same code (unless they're semantically essentially identical). During codec evaluation, we perform collision tests – feed in large corpora to see if distinct inputs ever yield the same slug. A well-designed VQ should avoid this by design (since it usually outputs a sequence of multiple codes, the combination should be unique or at least extremely unlikely to collide for different inputs). If collisions are found (aliasing), the codebook or compression parameters might need enlargement."

**From VQ-VAE evaluation blog cited in RFC:**
> "codebook size k seems to put a hard limit on the benefits of larger d. In fact, even with a rather large 4096 codebook entries, performance maxes out at d=8, with no benefits for more latent channels. Also, already for d=8, performance lags far behind the basic no-VQ autoencoder. It seems an absurd number of codebook entries would be required to catch up."

---

## Discussion

Aliasing (two different inputs producing identical compressed outputs) is fatal for the codec's use case:
- If two different images produce the same optical slug, an agent believing it has retrieved one image may actually have the other
- For knowledge verification (where the slug is evidence), this corrupts the proof chain
- The RFC's own language confirms this is a serious risk: "That is unacceptable for EGC, so any learned compression would need to be fine-tuned to avoid it, or human-curated code assignments used instead"

The evaluation blog finding is concerning: even with 4096 codebook entries, performance significantly lags behind non-VQ baseline. This suggests the VQ-VAE codec may not meet the "≤10× near-lossless" fidelity target claimed in the RFC.

Rosetta action needed before adopting optical slugs:
1. **Empirical alias testing**: Train VQ-VAE on representative corpus; test collision rate across held-out data
2. **Fidelity benchmarking**: Compare decoded output quality (PSNR/SSIM) against target thresholds
3. **Codebook sizing study**: Determine minimum codebook size for acceptable alias rate and fidelity
4. **Alternative approaches**: If VQ-VAE doesn't meet targets, evaluate VQGAN, residual VQ, or other compression schemes

---

## Action Items

- [ ] Do not integrate VQ-VAE optical slugs in production until alias collision testing is complete
- [ ] Commission ML evaluation: train VQ-VAE on representative image dataset; measure collision rate
- [ ] If alias rate > 0 (any collisions found): increase codebook size or switch codec algorithm
- [ ] Validate against "≤10× near-lossless" fidelity target before production use
- [ ] Document codec acceptance criteria: alias rate = 0, PSNR ≥ 40dB (or equivalent domain metric)

---

## Related

- Codec adapter spec (optical slugs section): "target is ≤10× size with near-lossless fidelity"
- This is a prerequisite for any ML-based content compression in Rosetta