// [...elements]
exports.ArrayExpression = function genArrayExpr (node, generator) {
  generator.advance("[");
  node.elements.forEach((elementNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(elementNode);
  });
  generator.advance("]");
};