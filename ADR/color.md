# Color

We are not updating `colors`. The latest major release (v4) changes from ES5 to ES6 so the final code is not transpiled, which causes Babel to break during the build.

```
Failed to compile.
../node_modules/color/index.js 272:26
Module parse failed: Identifier directly after number (272:26)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 		for (const [i, element] of rgb.entries()) {
| 			const chan = element / 255;
> 			lum[i] = (chan <= 0.039_28) ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
| 		}
|
> Build error occurred
    at /vercel/path0/node_modules/next/dist/build/index.js:15:918
    at async /vercel/path0/node_modules/next/dist/build/tracer.js:1:525
Error: Command "yarn run build" exited with 1
```

We decided not to update because, the change from ES5 to ES6 is the only meaningful change.
