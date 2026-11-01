// Repeatable structural audit. This is NOT a substitute for interaction tests.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '../..');
const screens = require(path.join(root, 'docs/figma/screen_map.json'));
const controls = require(path.join(root, 'docs/frontend/control_audit.json'));
const reviewed = new Set(['6:2711','6:2754','6:2805','6:2232','65:1427','6:2504','6:4055','6:2904','64:880','64:933','64:1314','6:3798','77:1321','77:1384','6:370','6:416','6:473','6:560','6:609','6:1023','6:1064','6:1525','6:1801','6:1890','6:1944','6:1971','6:661','6:2064','62:994']);
const report = screens.map(screen => {
  const tree = JSON.parse(fs.readFileSync(path.join(root, 'docs/figma/layout', screen.frameId.replace(':','_')+'.json'), 'utf8'));
  const nodes = [];
  function walk(n) { nodes.push(n); (n.children || []).forEach(walk); }
  walk(tree);
  const text = nodes.filter(n => n.text);
  const spec = controls.find(c => c.frameId === screen.frameId);
  return {
    frameId: screen.frameId, route: screen.route, sourceCharacters: text.reduce((sum,n) => sum + n.text.length, 0),
    sourceTextAreaRatio: Math.round(text.reduce((sum,n) => sum + n.width*n.height, 0) / (402*874)*100)/100,
    sourceRasterImages: nodes.filter(n => /\.(png|jpe?g|webp)(?:\?|$)/i.test(n.src || '')).length,
    nativePanels: spec.controls.filter(c => ['licenseFields','facilityPhotos','safetyCommitments','volunteerCalendar','shiftRegistration','profileSummary','verificationHero','packagingStep','profilePage','deliveryJobsPage','requestMatchingPanel','listingSummary','listingRequestsPrompt','publishSummary','foodSafetyHero','pickupDetails','mealMap','deliveryJobDetails','courierContact','pickupContact','deliveryAcceptanceSummary','handoverTimeline'].includes(c.kind)).map(c => c.kind),
    guardedActions: spec.controls.filter(c => c.kind === 'action' && (c.enabledWhen || c.requiredChecks)).map(c => ({label:c.label,condition:c.enabledWhen,checks:c.requiredChecks})),
    unhandledNamedButtons: spec.unhandled,
    reviewedInThisPass: reviewed.has(screen.frameId),
  };
});
const payload = {
  scope: '104 imported source screens + separate native donor Impact route. Source text counts exclude native replacements and dynamic data.',
  warning: 'No unhandled named Button nodes does not prove every icon, state or backend function works. Use Flutter tests and on-device checks.',
  screens: report,
  textReviewCandidates: report.filter(s => s.sourceCharacters >= 420).sort((a,b) => b.sourceCharacters-a.sourceCharacters).map(s => ({route:s.route,sourceCharacters:s.sourceCharacters,reviewed:s.reviewedInThisPass})),
};
fs.writeFileSync(path.join(root,'docs/frontend/review_audit.json'), JSON.stringify(payload,null,2));
console.log(JSON.stringify({screens:report.length,unhandledNamedButtons:report.reduce((n,s)=>n+s.unhandledNamedButtons.length,0),guardedActions:report.reduce((n,s)=>n+s.guardedActions.length,0),nativePanelScreens:report.filter(s=>s.nativePanels.length).length}));
