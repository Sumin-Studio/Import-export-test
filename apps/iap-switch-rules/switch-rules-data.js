/**
 * Switch Rules data model and types.
 * Future-proof structure for conditions, actions, scope, and validation.
 *
 * @typedef {'negative'} ConditionTypeNegative
 * @typedef {{ type: 'above_threshold'; threshold: number }} ConditionAboveThreshold
 * @typedef {{ type: 'below_threshold'; threshold: number }} ConditionBelowThreshold
 * @typedef {ConditionTypeNegative | ConditionAboveThreshold | ConditionBelowThreshold} SwitchRuleCondition
 *
 * @typedef {{ kind: 'move_group'; destinationGroupId: string }} ActionMoveGroup
 * @typedef {{ kind: 'change_report_code'; reportCodeId: string }} ActionChangeReportCode
 * @typedef {{ kind: 'presentation_override'; mode: 'hide_when_zero' | 'collapse' }} ActionPresentationOverride
 * @typedef {ActionMoveGroup | ActionChangeReportCode | ActionPresentationOverride} SwitchRuleAction
 *
 * @typedef {'client' | 'practice'} SwitchRuleScope
 * @typedef {'valid' | 'needs_review'} SwitchRuleStatus
 *
 * @typedef {{
 *   id: string;
 *   name: string;
 *   scope: SwitchRuleScope;
 *   condition: SwitchRuleCondition;
 *   actions: SwitchRuleAction[];
 *   status: SwitchRuleStatus;
 * }} SwitchRule
 */

(function (global) {
  'use strict';

  var REPORT_CODE_GROUPS = {
    'stocks': [{ id: 'stocks-rc', label: '100 - Stocks' }],
    'debtors': [{ id: 'debtors-rc', label: '101 - Debtors' }],
    'investments': [{ id: 'investments-rc', label: '102 - Investments' }],
    'cash-at-bank': [
      { id: '602', label: '602 - ASS.CUR.BAN Cash at bank' },
      { id: '603', label: '603 - ASS.CUR.BAN.CAS Cash in hand' },
      { id: '812', label: '812 - LIA.CUR.LOA.SEC Bank loans and overdraft (secured)' }
    ],
    'convertible-loans': [{ id: 'convertible-rc', label: '200 - Convertible loans' }],
    'debentures': [{ id: 'debentures-rc', label: '201 - Debentures in issue' }],
    'bank-loans': [
      { id: '602', label: '602 - ASS.CUR.BAN Cash at bank' },
      { id: '603', label: '603 - ASS.CUR.BAN.CAS Cash in hand' },
      { id: '812', label: '812 - LIA.CUR.LOA.SEC Bank loans and overdraft (secured)' },
      { id: '813', label: '813 - LIA.CUR.LOA.UNS Bank loans and overdraft (unsecured)' }
    ],
    'trade-creditors': [{ id: 'trade-rc', label: '202 - Trade creditors' }],
    'bills-payable': [{ id: 'bills-rc', label: '203 - Bills of exchange payable' }]
  };

  var GROUPS = [
    { id: 'stocks', section: 'Current assets', label: 'Stocks' },
    { id: 'debtors', section: 'Current assets', label: 'Debtors' },
    { id: 'investments', section: 'Current assets', label: 'Investments' },
    { id: 'cash-at-bank', section: 'Current assets', label: 'Cash at bank and in hand' },
    { id: 'convertible-loans', section: 'Creditors: amounts falling due within one year', label: 'Convertible loans' },
    { id: 'debentures', section: 'Creditors: amounts falling due within one year', label: 'Debentures in issue' },
    { id: 'bank-loans', section: 'Creditors: amounts falling due within one year', label: 'Bank loans and overdrafts' },
    { id: 'trade-creditors', section: 'Creditors: amounts falling due within one year', label: 'Trade creditors' },
    { id: 'bills-payable', section: 'Creditors: amounts falling due within one year', label: 'Bills of exchange payable' }
  ];

  var CONDITION_TYPES = [
    { id: 'negative', label: 'become negative' },
    { id: 'above_threshold', label: 'exceed' },
    { id: 'below_threshold', label: 'are below' },
    { id: 'of_type', label: 'are of type' }
  ];

  var ACCOUNT_TYPES = [
    { id: 'asset', label: 'Asset' },
    { id: 'liability', label: 'Liability' },
    { id: 'equity', label: 'Equity' },
    { id: 'income', label: 'Income' },
    { id: 'expense', label: 'Expense' }
  ];

  function getReportCodes(groupId) {
    var codes = REPORT_CODE_GROUPS[groupId];
    if (codes && codes.length > 0) return codes;
    var g = GROUPS.find(function (x) { return x.id === groupId; });
    var label = g ? g.label : groupId;
    return [{ id: groupId + '-default', label: '100 - ' + label }];
  }

  function getGroupLabel(groupId) {
    var g = GROUPS.find(function (x) { return x.id === groupId; });
    return g ? g.section + ' › ' + g.label : groupId;
  }

  function getGroupLabelShort(groupId) {
    var g = GROUPS.find(function (x) { return x.id === groupId; });
    return g ? g.label : groupId;
  }

  function generateRuleName(sourceGroupId, destGroupId, reportCodeId) {
    var src = getGroupLabelShort(sourceGroupId);
    var dest = getGroupLabelShort(destGroupId);
    var codes = getReportCodes(destGroupId);
    var rc = codes.find(function (c) { return c.id === reportCodeId; });
    if (rc && codes.length > 1) return src + ' → ' + dest + ' › ' + rc.label;
    return src + ' → ' + dest;
  }

  function createSwitchRule(opts) {
    var id = opts.id || 'rule-' + Date.now();
    var sourceGroupId = opts.sourceGroupId;
    var destinationGroupId = opts.destinationGroupId;
    var reportCodeId = opts.reportCodeId || null;
    var name = opts.name || generateRuleName(sourceGroupId, destinationGroupId, reportCodeId);
    var scope = opts.scope || 'client';
    var status = opts.status || 'valid';
    var conditionType = opts.conditionType || 'negative';
    var condition = { type: conditionType };
    if (conditionType === 'above_threshold' && opts.threshold != null) condition.threshold = opts.threshold;
    if (conditionType === 'below_threshold' && opts.threshold != null) condition.threshold = opts.threshold;
    if (conditionType === 'of_type' && opts.accountType) condition.accountType = opts.accountType;

    var codes = getReportCodes(destinationGroupId);
    if (codes.length === 1 && !reportCodeId) reportCodeId = codes[0].id;
    if (codes.length > 1 && !reportCodeId) reportCodeId = codes[0].id;

    return {
      id: id,
      name: name,
      sourceGroupId: sourceGroupId,
      scope: scope,
      condition: condition,
      actions: [
        { kind: 'move_group', destinationGroupId: destinationGroupId },
        { kind: 'change_report_code', reportCodeId: reportCodeId }
      ],
      status: status
    };
  }

  function getDestinationGroupId(rule) {
    var a = rule.actions && rule.actions.find(function (x) { return x.kind === 'move_group'; });
    return a ? a.destinationGroupId : null;
  }

  function getReportCodeId(rule) {
    var a = rule.actions && rule.actions.find(function (x) { return x.kind === 'change_report_code'; });
    return a ? a.reportCodeId : null;
  }

  global.SwitchRulesData = {
    GROUPS: GROUPS,
    REPORT_CODE_GROUPS: REPORT_CODE_GROUPS,
    CONDITION_TYPES: CONDITION_TYPES,
    ACCOUNT_TYPES: ACCOUNT_TYPES,
    getReportCodes: getReportCodes,
    getGroupLabel: getGroupLabel,
    getGroupLabelShort: getGroupLabelShort,
    generateRuleName: generateRuleName,
    createSwitchRule: createSwitchRule,
    getDestinationGroupId: getDestinationGroupId,
    getReportCodeId: getReportCodeId
  };
})(typeof window !== 'undefined' ? window : this);
