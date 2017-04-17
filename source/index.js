/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
var rfx = function rfx (signature) {
  var sig = signature.toString();

  return function (subject) {
    return Object.assign(subject, {
      rfx: Object.assign(function rfx () {
        /* eslint-disable no-console */
        console.log(sig);
      }, {
        signature: sig
      })
    });
  };
};

rfx = rfx(
  '/*\n' +
  '  Take an rtype type description and a subject (curried), and return \n' +
  '  the function augmented with supplied documentation. \n' +
  '*/\n' +
  'rfx(signature) => (subject: s) => s & {\n' +
  '  rfx(), effects(log signature to console)\n' +
  '} & {\n' +
  '  signature: string\n' +
  '}'
)(rfx);

module.exports = rfx;
module.exports.default = rfx;
