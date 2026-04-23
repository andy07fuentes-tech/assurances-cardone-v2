# Quote Form Reference Notes

The provided reference uses a centered, card-based lead form with strong focus on one question or one grouped input set at a time. The visual hierarchy is simple and conversion-oriented: prominent headline, grouped inputs, then a clear next-step action.

| Area | Reference observation | Cardone adaptation |
| --- | --- | --- |
| Layout | Centered card with concentrated focus and progressive disclosure | Use a premium darker quote module with stronger contrast and cleaner step grouping inside the existing page |
| Vehicle inputs | Dependent dropdown behavior, especially Make → Model | Expand to Year → Make → Model with each field unlocking the next |
| Input grouping | Short grouped sets rather than one overwhelming long form | Keep the Cardone quote intake structured into logical subsections while still feeling fast |
| CTA rhythm | Strong single primary action at each step | Preserve one dominant submit/continue action with luxury-styled emphasis |
| Trust cues | Subtle proof and clean spacing reduce friction | Use small premium reassurance copy instead of cluttered badges |

The UI feeling to preserve is not the white-and-green palette itself, but the clarity, speed, and dependency logic. For Cardone, this should be translated into a **dark theme with metallic silver accents**, restrained glass effects, and a more upscale brokerage tone rather than a generic lead-funnel aesthetic.

The official vPIC documentation confirms two key endpoint patterns for this build. First, the API supports **GetMakesForManufacturerAndYear**, which can retrieve makes filtered by year. Second, it supports **GetModelsForMakeYear**, which can retrieve models for a specific make and model year. The documentation also notes automated traffic rate control, so the implementation should avoid wasteful repeated calls and should fetch only when the dependent field becomes active.
The NHTSA datasets page frames the vehicle-data flow as a sequence: first choose a model year, then retrieve makes for that year, then retrieve models for the selected make and year. Even though the main vPIC method list is terse, the UX implementation should follow this progressive lookup structure and cache responses per selected year and make to stay within NHTSA rate controls.
