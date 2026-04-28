import test from "node:test";
import assert from "node:assert/strict";
import {
  buildDmptJql,
  DEFAULT_GRAPH_STATUS_LIST,
  jqlEscapeString,
  parseGraphStatuses,
} from "./graph-query";

test("jqlEscapeString escapes quotes and backslashes", () => {
  assert.equal(jqlEscapeString(`a"b\\c`), `a\\"b\\\\c`);
});

test("parseGraphStatuses uses defaults when env empty", () => {
  assert.deepEqual(parseGraphStatuses(undefined), [...DEFAULT_GRAPH_STATUS_LIST]);
  assert.deepEqual(parseGraphStatuses("   "), [...DEFAULT_GRAPH_STATUS_LIST]);
});

test("parseGraphStatuses splits comma-separated list", () => {
  assert.deepEqual(parseGraphStatuses("A, B ,C"), ["A", "B", "C"]);
});

test("buildDmptJql matches status in (no order by)", () => {
  const jql = buildDmptJql({
    projectKey: "DMPT",
    statuses: ["Escalation process", "Raise Dependency"],
  });
  assert.equal(
    jql,
    'project = DMPT AND status in ("Escalation process", "Raise Dependency")',
  );
});

test("buildDmptJql escapes status names", () => {
  const jql = buildDmptJql({
    projectKey: "X",
    statuses: ['Ready "go"', "Done"],
  });
  assert.equal(jql, 'project = X AND status in ("Ready \\"go\\"", "Done")');
});
