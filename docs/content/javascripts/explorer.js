function customize() {
  const browserIsIE = (navigator.userAgent.indexOf('MSIE') !== -1)
    || (navigator.appVersion.indexOf('Trident/') > -1);
  if (browserIsIE) {
    document.querySelectorAll('div.neon-data-api-app-ie').forEach(e => {
      e.style.display = e.hasAttribute('data-docs-app-ie-display')
        ? e.getAttribute('data-docs-app-ie-display')
        : 'block';
    });
  }
  var graphiql = document.querySelector('#graphiql-frame')
  if (graphiql) {
    var innerGrid = document.querySelector('div.md-main__inner.md-grid');
    if (innerGrid) {
      innerGrid.style.maxWidth = '100%';
      innerGrid.style.marginRight = '25px';
      innerGrid.style.marginLeft = '25px';
    }
  }
}

const Router = {
  jumpToReleasePage: () => Router.jumpTo('endpoints', 'endpoints/releases/'),
  jumpToProduct: () => Router.jumpTo('endpoints', 'endpoints/products/#product'),
  jumpToSite: () => Router.jumpTo('endpoints', 'endpoints/sites/#site'),
  jumpToData: () => Router.jumpTo('endpoints', 'endpoints/data/#data'),
  jumpTo: (anchor, route = '') => {
    event.preventDefault();
    event.stopPropagation();
    try {
      if (anchor && !(window.location.pathname.indexOf(anchor) > -1)) {
        console.log('Invalid anchor definition');
        return;
      }
      const pathSplit = window.location.pathname.split(anchor);
      let appliedRoute = route;
      const pathEndsWithSlash = (pathSplit[0].indexOf('/') === (pathSplit[0].length - 1));
      const routeStartsWithSlash = (route.indexOf('/') === 0);
      if (pathEndsWithSlash && routeStartsWithSlash) {
        appliedRoute = appliedRoute.slice(1, appliedRoute.length);
      } else if (!pathEndsWithSlash && !routeStartsWithSlash) {
        appliedRoute = '/' + appliedRoute;
      }
      window.location.href = pathSplit[0] + appliedRoute;
    } catch (e) {
      console.error(e);
    }
  },
};

window.addEventListener('load', function () {
  customize();
});
