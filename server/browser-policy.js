var trusted = [
  '*.astronomer.io',
  '*.idometeor.com',
  'fonts.googleapis.com',
  'localhost:*',
];
_.each(trusted, function(origin) {
  BrowserPolicy.content.allowConnectOrigin(origin);
});
_.each(trusted, function(origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowDataUrlForAll();
BrowserPolicy.content.allowSameOriginForAll();
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();
