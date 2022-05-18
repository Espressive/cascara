## Admin Docs

- [Release Process](./RELEASE.PROCESS.md)

## Brian's video training

- [Overview of Cascara](https://espressive.zoom.us/rec/share/ErX_UYqn8-Zk5X-1dkQkePVNvrkshHdGaGw1NSprNfRMibhIT5mgHroa_5zFDn-F.O4LciN98-ILPgwYP) (passcode: `Xhh.51K8`)
- [Cascara Toolchain](https://espressive.zoom.us/rec/share/JmtjHjxUJDdQ85-kk19dtPoRNqeKNRN5JRv6fJ0BYeD2m6Tl8onZUGaCteidQ_6e.DzIxCNJZVorVCOed) (Passcode: `52v.Hps#`)
- [Releasing Cascara](https://espressive.zoom.us/rec/share/5AFWNzN5q3dBJaR38zH2pZouYqwtFU8a609Bb4mQnxaKN0CnoCdja-H_8hVjh9lM.Mugj6eVJdXtw2O6k) (passcode: `&J7hv14J`)

## Yarn

Cascara is hosted in a monorepo, it's consumed in almost all Espressive Apps and internally by all the packages in its monorepo. This requires an elaborated setup using `yarn v3` in `loose mode` and using `node_modules` as package linker. All this configuration is located [yarn config file](./.yarnrc.yml)
