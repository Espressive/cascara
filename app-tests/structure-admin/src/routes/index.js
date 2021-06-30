import settings from '../sections/settings';
import integrations from '../sections/integrations';
import MainRoutes from './MainRoutes';
// console.log(settings);
const sections = [settings, integrations];

const routes = sections.map((section) => section.routes);
const paths = sections.map((section) => section.basePath);

export { MainRoutes, routes, paths };
