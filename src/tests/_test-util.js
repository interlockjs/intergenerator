const babylon = require("babylon");
const sourceMap = require("source-map");

const { Generator } = require("..");


const INPUT_FILE = "example.js";
const OUTPUT_FILE = "example.bundle.js";


exports.generate = (source, singleExpression = false) => {
  const getAst = src => {
    const rootAst = babylon.parse(src, {
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      sourceFilename: INPUT_FILE,
      plugins: [
        "jsx",
        "flow",
        "doExpressions",
        "objectRestSpread",
        "decorators",
        "classProperties",
        "exportExtensions",
        "asyncGenerators",
        "functionBind",
        "functionSent"
      ]
    });
    return singleExpression ? rootAst.program.body[0].expression : rootAst;
  }

  const ast = getAst(source);

  const generator = new Generator({ outputFilename: OUTPUT_FILE });
  generator.addSourceFile(INPUT_FILE, source);
  generator.generate(ast);

  const { code, map } = generator;

  const astIsEqual = () => {
    const astFromGeneratedCode = getAst(code);
    const astStrA = JSON.stringify(ast);
    const astStrB = JSON.stringify(astFromGeneratedCode);
    return astStrA === astStrB;
  };

  return {
    map: JSON.parse(map),
    code,
    ast,
    astIsEqual 
  };
};

exports.dedent = (by, str) => str
  .split("\n")
  .filter(line => line.length >= by)
  .map(line => line.slice(by))
  .join("\n");
