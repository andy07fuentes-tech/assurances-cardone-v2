# Hero Video Handoff

The homepage hero video is **not stored inside the web project folder**. It is referenced as an externally hosted static asset so the site can deploy correctly without large media files inside the codebase.

| Item | Value |
| --- | --- |
| Original local asset | `/home/ubuntu/webdev-static-assets/cardone-hero-peace-of-mind-loop.mp4` |
| Hosted asset URL used by the site | `https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-hero-peace-of-mind-loop_2e4c36ed.mp4` |
| Code reference file | `/home/ubuntu/assurances-cardone-site/client/src/pages/Home.tsx` |
| Code reference | `<source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-hero-peace-of-mind-loop_2e4c36ed.mp4" type="video/mp4" />` |

This is why the batch-downloaded ZIP contains the **code** but not the raw video file itself.
