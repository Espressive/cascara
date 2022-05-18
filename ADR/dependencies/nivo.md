# Nivo

Version: 0.79.0
Date: 20220112

## Cannot update (yet)

We tried to update @nivo and friends but all attempts rendered the yarn install broken. The project is in a migration from `prop-types` to `typescript` and some packages still depend on the former, [this bug](https://github.com/plouc/nivo/issues/1788) and [this other ](https://github.com/plouc/nivo/issues/1403) are reporting this behavior:

```
➤ YN0000: ┌ Resolution step
➤ YN0002: │ @nivo/annotations@npm:0.79.1 [2526e] doesn't provide prop-types (p062fe), requested by @nivo/colors
➤ YN0002: │ @nivo/annotations@npm:0.79.1 [c3e9c] doesn't provide prop-types (p7f9fe), requested by @nivo/colors
➤ YN0002: │ @nivo/arcs@npm:0.79.1 [65395] doesn't provide prop-types (p68823), requested by @nivo/colors
➤ YN0002: │ @nivo/arcs@npm:0.79.1 [7817b] doesn't provide prop-types (pb6a34), requested by @nivo/colors
➤ YN0002: │ @nivo/arcs@npm:0.79.1 [7817b] doesn't provide react-dom (pe973e), requested by @react-spring/web
➤ YN0002: │ @nivo/bar@npm:0.79.1 [033a3] doesn't provide prop-types (pbebd5), requested by @nivo/colors
➤ YN0002: │ @nivo/bar@npm:0.79.1 [033a3] doesn't provide prop-types (pb48b1), requested by @nivo/axes
➤ YN0002: │ @nivo/bar@npm:0.79.1 [033a3] doesn't provide prop-types (p6244d), requested by @nivo/legends
➤ YN0002: │ @nivo/bar@npm:0.79.1 [f27cf] doesn't provide prop-types (p4ad96), requested by @nivo/colors
➤ YN0002: │ @nivo/bar@npm:0.79.1 [f27cf] doesn't provide prop-types (p46a91), requested by @nivo/axes
➤ YN0002: │ @nivo/bar@npm:0.79.1 [f27cf] doesn't provide prop-types (pd6ca8), requested by @nivo/legends
➤ YN0002: │ @nivo/bump@npm:0.79.1 [033a3] doesn't provide prop-types (p4db7f), requested by @nivo/colors
➤ YN0002: │ @nivo/bump@npm:0.79.1 [033a3] doesn't provide prop-types (pb9c41), requested by @nivo/axes
➤ YN0002: │ @nivo/bump@npm:0.79.1 [033a3] doesn't provide prop-types (pea9f4), requested by @nivo/legends
➤ YN0002: │ @nivo/bump@npm:0.79.1 [f27cf] doesn't provide prop-types (p01f32), requested by @nivo/colors
➤ YN0002: │ @nivo/bump@npm:0.79.1 [f27cf] doesn't provide prop-types (pdfd53), requested by @nivo/axes
➤ YN0002: │ @nivo/bump@npm:0.79.1 [f27cf] doesn't provide prop-types (p8028c), requested by @nivo/legends
➤ YN0002: │ @nivo/circle-packing@npm:0.79.1 [033a3] doesn't provide prop-types (p30a7d), requested by @nivo/colors
➤ YN0002: │ @nivo/circle-packing@npm:0.79.1 [f27cf] doesn't provide prop-types (pc8e00), requested by @nivo/colors
➤ YN0002: │ @nivo/heatmap@npm:0.79.1 [033a3] doesn't provide prop-types (p4e407), requested by @nivo/colors
➤ YN0002: │ @nivo/heatmap@npm:0.79.1 [033a3] doesn't provide prop-types (p9e346), requested by @nivo/axes
➤ YN0002: │ @nivo/heatmap@npm:0.79.1 [f27cf] doesn't provide prop-types (p07710), requested by @nivo/colors
➤ YN0002: │ @nivo/heatmap@npm:0.79.1 [f27cf] doesn't provide prop-types (pa1874), requested by @nivo/axes
➤ YN0002: │ @nivo/treemap@npm:0.79.1 [033a3] doesn't provide prop-types (pd4ae6), requested by @nivo/colors
➤ YN0002: │ @nivo/treemap@npm:0.79.1 [f27cf] doesn't provide prop-types (pfbe64), requested by @nivo/colors
➤ YN0060: │ cascara@workspace:. provides eslint-plugin-flowtype (p4f693) with version 6.1.0, which doesn't satisfy what @espressive/eslint-config and some of its descendants request
➤ YN0060: │ cascara@workspace:. provides eslint-plugin-testing-library (pba2e2) with version 4.12.4, which doesn't satisfy what @espressive/eslint-config and some of its descendants request
➤ YN0060: │ docs@workspace:docs provides react (p261a6) with version 16.13.1, which doesn't satisfy what @espressive/cascara and some of its descendants request
➤ YN0000: │ Some peer dependencies are incorrectly met
```

Our best option is to wait for the Nivo team to fully migrate to `typescript` and finally drop `prop-types`.

### Ecosystem updates (on hold)

- @nivo/bar: v0.67.0 -> v0.79.1
- @nivo/bump: v0.67.0 -> v0.79.1
- @nivo/circle-packing: v0.67.0 -> v0.79.1
- @nivo/core: v0.67.0 -> v0.79.0
- @nivo/geo: v0.67.0 -> v0.79.1
- @nivo/heatmap: v0.67.0 -> v0.79.1
- @nivo/line: v0.67.0 -> v0.79.1
- @nivo/pie: v0.67.0 -> v0.79.1
- @nivo/tooltip: v0.67.0 -> v0.79.0
- @nivo/treemap: v0.67.0 -> v0.79.1
