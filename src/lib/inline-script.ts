import ts from 'typescript';

const compiledScripts = new Map<string, string>();

/** Compile parser-blocking scripts once while keeping their source type checked. */
export function inlineTypeScript(source: string): string {
  const cached = compiledScripts.get(source);
  if (cached !== undefined) return cached;
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  compiledScripts.set(source, outputText);
  return outputText;
}
