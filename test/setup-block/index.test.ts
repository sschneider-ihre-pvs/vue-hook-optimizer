import * as fs from 'node:fs';
import path from 'node:path';

import { graph as graphRes } from './TestComponent.graph';
import { nodes as nodesRes } from './TestComponent.nodes';
import { analyzeSetupScript, analyzeTemplate, parse } from '@/index';

describe('test analyze', () => {
  const source = fs.readFileSync(path.resolve(__dirname, './TestComponent.vue'), 'utf-8');
  const sfc = parse(source);
  it('test analyze setup script', () => {
    const graph = analyzeSetupScript(
      sfc.descriptor.scriptSetup?.content || '',
      (sfc.descriptor.scriptSetup?.loc.start.line || 1) - 1,
    );
    expect(graph).toEqual(graphRes);
  });
  it('test analyze template', () => {
    const nodes = analyzeTemplate(sfc.descriptor.template!.content);
    expect(nodes).toEqual(nodesRes);
  });
});
