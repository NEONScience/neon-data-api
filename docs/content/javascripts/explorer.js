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
  var swagger = document.querySelector('#swagger-frame')
  if (swagger) {
    swagger.style.display = 'block';
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

window.addEventListener('load', function () {
  customize();
});
// Custom event listener for mkdocs-material "instant" feature.
// See:
// https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/instant/index.ts
window.document.addEventListener('DOMContentSwitch', function () {
  customize();
});
