# Cascara SASS

This will likely be only a collection of consistent styling patterns and mixins we want to use for the library. We are using SASS so we do not end up with vendor lock-in for our styles. There are dozens of options for CSS in JS out there. Some make it, and some do not. The risk is too great for us in trying to support one of these technologies for a platform like our design system.

We are using the latest version of Dart Sass. [Please review all documentation(https://sass-lang.com/documentation)] as there are some minor differences with LibSass and Ruby Sass which are older.

At some point, maybe it makes sense to move all tokens and build tooling for tokens here and make into a package to more easily include in FDS components. That time may come soon as we build more and see the limitations.
