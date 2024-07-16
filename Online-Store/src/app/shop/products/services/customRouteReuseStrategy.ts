import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig.path;
    return path && ['products/:category', 'home'].includes(path);
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.routeStore.set(route.routeConfig.path, handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig.path;
    return (path && ['products/:category', 'home'].includes(path) && !!this.routeStore.get(path));
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const path = route.routeConfig.path;
    return this.routeStore.get(path);
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

}