// try block handler
exports.TryStatement = (node, anscestors, generator) => {
  generator.advance("try");
  // node.block will always be a BlockStatement
  generator.generate(node.block, anscestors);
  if (node.handler) { generator.generate(node.handler, anscestors); }
  if (node.finalizer) {
    generator.advance("finally");
    generator.generate(node.finalizer, anscestors);
  }
};

// catch (param) body
exports.CatchClause = (node, anscestors, generator) => {
  generator.advance("catch(");
  generator.generate(node.param, anscestors);
  generator.advance(")");
  // node.body will always be a BlockStatement
  generator.generate(node.body, anscestors);
};

// throw expression
exports.ThrowStatement = (node, anscestors, generator) => {
  generator.advance("throw ");
  generator.generate(node.argument, anscestors);
  generator.advance(";");
};
