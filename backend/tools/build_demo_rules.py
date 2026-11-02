"""Generate readable, cross-record RTDB rules for the direct-client demo.

Run from repository root: python backend/tools/build_demo_rules.py
No live data is changed by this script.
"""
import json
from pathlib import Path

U = "root.child('users').child(auth.uid)"
SIGNED = 'auth != null'
ACTIVE = f"({SIGNED} && auth.token.email_verified === true && {U}.exists() && {U}.child('disabled').val() !== true)"
ADMIN = f"({ACTIVE} && root.child('config/adminUid').val() === auth.uid && {U}.child('role').val() === 'admin')"
TRANSPORTS = ['Nh\u1edd giao h\u1ed9', 'T\u1ef1 \u0111\u1ebfn l\u1ea5y']
def role(name):
    return f"({ACTIVE} && {U}.child('role').val() === '{name}' && {U}.child('verificationStatus').val() === 'approved')"
def c(node, key):
    return f"{node}.child('{key}')"
def v(node, key):
    return c(node, key) + '.val()'
def one(value, options):
    return '(' + ' || '.join(f"{value} === '{x}'" for x in options) + ')'
def same(keys):
    return ' && '.join(f"{v('newData',k)} === {v('data',k)}" for k in keys)
def string(maximum=2000):
    return {'.validate': f'newData.isString() && newData.val().length <= {maximum}'}
def immutable():
    return {'.validate': '!data.exists() || newData.val() === data.val()'}
def fields(rule, required=(), strings=()):
    rule['.validate'] = f"newData.hasChildren({json.dumps(list(required))})" + (' && (' + rule['.validate'] + ')' if '.validate' in rule else '')
    for name in strings: rule.setdefault(name, string())
    rule['$other'] = {'.validate': False}
    return rule

rules = {'.read': False, '.write': False}
rules['config'] = {
    'adminUid': {'.read': SIGNED, '.write': f"{ACTIVE} && !data.exists() && {U}.child('role').val() === 'admin' && newData.val() === auth.uid"},
    'public': {'.read': SIGNED, '.write': ADMIN},
}
user = {
    '.read': 'auth != null && auth.uid === $uid',
    '.write': f"auth != null && newData.exists() && ((auth.uid === $uid && (!data.exists() || data.child('disabled').val() !== true)) || ({ADMIN} && data.child('role').val() !== 'admin' && $uid !== auth.uid))",
    '.validate': "newData.child('uid').val() === $uid && ((!data.exists() && newData.child('role').val() === '' && newData.child('verificationStatus').val() === 'draft' && newData.child('disabled').val() === false && newData.child('email').val() === auth.token.email) || data.exists())",
    'uid': immutable(), 'email': immutable(), 'createdAt': immutable(),
    'name': string(100), 'phone': string(100), 'address': string(500),
    'disabled': {'.validate': f"newData.isBoolean() && (!data.exists() && newData.val() === false || newData.val() === data.val() || {ADMIN})"},
    'role': {'.validate': f"newData.val() === data.val() || (!data.exists() && newData.val() === '') || (auth.uid === $uid && data.val() === '' && {one('newData.val()', ['donor','charity','volunteer'])}) || ({ADMIN} && {one('newData.val()', ['donor','charity','volunteer'])})"},
    'verificationStatus': {'.validate': f"newData.val() === data.val() || (!data.exists() && newData.val() === 'draft') || ({ADMIN} && {one('newData.val()', ['approved','rejected','supplement'])}) || ({ACTIVE} && auth.uid === $uid && newData.val() === 'pending' && root.child('users').child($uid).child('role').val() !== 'admin' && newData.parent().parent().parent().child('demo/applications').child(newData.parent().child('applicationId').val()).child('uid').val() === $uid && newData.parent().parent().parent().child('demo/applications').child(newData.parent().child('applicationId').val()).child('status').val() === 'pending')"},
    'applicationId': {'.validate': f"newData.val() === data.val() || ({ACTIVE} && auth.uid === $uid && newData.parent().child('verificationStatus').val() === 'pending' && newData.parent().parent().parent().child('demo/applications').child(newData.val()).child('uid').val() === $uid)"},
}
rules['users'] = {'.read': ADMIN, '$uid': fields(user, ['uid','email','name','role','verificationStatus','disabled','createdAt'])}

demo = {}
rules['demo'] = demo
app = {
    '.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && newData.child('uid').val() === auth.uid && {U}.child('role').val() !== 'admin') || ({ADMIN} && data.child('status').val() === 'pending'))",
    '.validate': "newData.child('id').val() === $id && ((!data.exists() && newData.child('status').val() === 'pending') || data.exists())",
    'id': immutable(), 'uid': immutable(), 'name': immutable(), 'role': {'.validate': f"{one('newData.val()', ['donor','charity','volunteer'])} && (!data.exists() || newData.val() === data.val())"},
    'createdAt': immutable(), 'details': {'.validate': 'newData.isString() && newData.val().length > 0 && newData.val().length <= 8000 && (!data.exists() || newData.val() === data.val())'},
    'documents': {'.validate': "newData.hasChildren(['0']) && !newData.child('10').exists()", '$n': {'.validate': "newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/') && (!data.exists() || newData.val() === data.val())"}},
    'status': {'.validate': f"(!data.exists() && newData.val() === 'pending') || ({ADMIN} && {one('newData.val()', ['approved','rejected','supplement'])})"},
    'note': string(), 'reviewedAt': string(100), 'reviewedBy': {'.validate': 'newData.val() === auth.uid'},
}
demo['applications'] = {'$id': fields(app, ['id','uid','name','role','details','documents','status','createdAt'])}

owner = "data.child('donorId').val() === auth.uid"
food_edit = f"({role('donor')} && {owner} && data.child('reserved').val() === 0 && newData.child('reserved').val() === 0 && newData.child('status').val() === 'pending')"
old_o = "root.child('demo/orders').child(newData.child('lastStockOrderId').val())"
# Stock is a single-food transaction, separate from the order transaction.
# A scalar append-only journal is deliberate: RTDB skips child .validate on
# deletion, so a mutable map of operation markers would permit marker removal.
journal = "(data.child('stockJournal').exists() ? data.child('stockJournal').val() : '')"
hold_token = "'|' + newData.child('lastStockOrderId').val() + ':H|'"
release_token = "'|' + newData.child('lastStockOrderId').val() + ':R|'"
stock_actor = f"({old_o}.child('donorId').val() === auth.uid || {old_o}.child('organizationId').val() === auth.uid || {ADMIN})"
hold_stock = f"({role('donor')} && {owner} && data.child('status').val() === 'open' && data.child('expiresAtMs').val() > now && {old_o}.child('status').val() === 'awaiting' && {old_o}.child('stockState').val() === 'reserving' && !{journal}.contains({hold_token}) && !{journal}.contains({release_token}) && newData.child('stockJournal').val() === {journal} + {hold_token} && newData.child('reserved').val() === data.child('reserved').val() + {old_o}.child('quantity').val())"
release_amount = f"(({journal}.contains({hold_token}) || {old_o}.child('cancelHadStock').val() === true) ? {old_o}.child('quantity').val() : 0)"
release_stock = f"({stock_actor} && {old_o}.child('status').val() === 'cancelled' && {old_o}.child('stockState').val() === 'releasePending' && !{journal}.contains({release_token}) && newData.child('stockJournal').val() === {journal} + {release_token} && newData.child('reserved').val() === data.child('reserved').val() - {release_amount})"
stock = f"(newData.child('lastStockOrderId').isString() && newData.child('lastStockOrderId').val().matches(/^[A-Za-z0-9_-]+$/) && {old_o}.child('foodId').val() === $id && {old_o}.child('quantity').isNumber() && ({hold_stock} || {release_stock}))"
food = {
    '.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('donor')} && newData.child('donorId').val() === auth.uid) || (data.exists() && ({owner} || {ADMIN} || {stock})))",
    '.validate': f"newData.child('id').val() === $id && newData.child('quantity').isNumber() && newData.child('quantity').val() > 0 && newData.child('quantity').val() <= 100000 && newData.child('reserved').isNumber() && newData.child('reserved').val() >= 0 && newData.child('reserved').val() <= newData.child('quantity').val() && ((!data.exists() && newData.child('status').val() === 'pending' && newData.child('reserved').val() === 0 && newData.child('expiresAtMs').val() > now) || (data.exists() && ({food_edit} || ({ADMIN} && data.child('status').val() === 'pending' && {one(v('newData','status'), ['open','rejected'])}) || ({owner} && newData.child('status').val() === 'closed' && newData.child('reserved').val() === data.child('reserved').val()) || (newData.child('status').val() === data.child('status').val() && {stock}))))",
    'id': immutable(), 'donorId': immutable(), 'donor': immutable(), 'createdAt': immutable(),
    'quantity': {'.validate': f'!data.exists() || newData.val() === data.val() || {food_edit.replace("newData.", "newData.parent().").replace("data.", "data.parent().")}'},
    'reserved': {'.validate': 'newData.isNumber()'}, 'status': string(40), 'updatedAt': string(100),
    'reviewNote': {'.validate': f"newData.val() === data.val() || {ADMIN} || newData.val() === ''"}, 'reviewedAt': string(100), 'reviewedBy': {'.validate': f'newData.val() === data.val() || {ADMIN}'},
    'lastStockOrderId': string(200),
    'stockJournal': {'.validate': 'newData.isString()'},
}
# Neither editing/reviewing/closing a food nor a replay may erase the journal
# or change its counter. Only a validated append changes stock.
food['.validate'] += f" && ((!data.exists() && !newData.child('stockJournal').exists()) || (data.exists() && (({same(['stockJournal','reserved','lastStockOrderId'])}) || {stock})))"
# At child depth, use the row snapshots for the edit predicate.
child_edit = food_edit.replace('newData.', 'NEW.').replace('data.', 'OLD.').replace('NEW.', 'newData.parent().').replace('OLD.', 'data.parent().')
food['quantity']['.validate'] = f'!data.exists() || newData.val() === data.val() || {child_edit}'
for key in ['name','category','storage','address','pickup','note','photo','expiresAt','expiresAtMs','safe','allergens','latitude','longitude']:
    food[key] = {'.validate': f'!data.exists() || newData.val() === data.val() || {child_edit}'}
food['safe']['.validate'] += ' && newData.val() === true'
food['photo']['.validate'] = f"({food['photo']['.validate']}) && newData.isString() && (newData.val() === '' || newData.val().beginsWith('https://res.cloudinary.com/toanvip/'))"
# RTDB val() returns a sentinel for child data, not a deep value. Compare the
# bounded scalar entries, including absent entries so deletion cannot bypass
# child validation during a stock transaction.
def same_list(key, count):
    prefix = key + '/' if key else ''
    return ' && '.join(f"newData.child('{prefix}{i}').val() === data.child('{prefix}{i}').val()" for i in range(count))

photo_same = same_list('photos', 6)
allergen_same = same_list('allergens', 10)
food['.validate'] += f" && ((!data.exists()) || ({food_edit}) || (({photo_same}) && ({allergen_same})))"
food['photos'] = {
    '.validate': f"newData.hasChildren(['0']) && !newData.child('6').exists() && (!data.exists() || ({same_list('', 6)}) || {child_edit})",
    '$n': {'.validate': "$n.matches(/^[0-5]$/) && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/')"},
}
food['allergens'] = {
    '.validate': f"!newData.child('10').exists() && (!data.exists() || ({same_list('', 10)}) || {child_edit})",
    '$n': {'.validate': "$n.matches(/^[0-9]$/) && newData.isString() && newData.val().length <= 100"},
}

demo['foods'] = {'$id': fields(food, ['id','donorId','donor','name','quantity','reserved','category','storage','address','pickup','expiresAt','expiresAtMs','status','createdAt','safe'])}

O = "root.child('demo/orders').child($id)"
F = "root.child('demo/foods').child(newData.child('foodId').val())"
NF = "newData.parent().parent().child('foods').child(newData.child('foodId').val())"
INV = "root.child('demo/inventory').child(auth.uid)"
NINV = "newData.parent().parent().child('inventory').child(auth.uid)"
members = "(data.child('donorId').val() === auth.uid || data.child('organizationId').val() === auth.uid || data.child('volunteerId').val() === auth.uid)"
claim = f"({role('volunteer')} && data.child('status').val() === 'accepted' && data.child('transport').val() === 'Nh\u1edd giao h\u1ed9' && !data.child('volunteerId').exists() && newData.child('volunteerId').val() === auth.uid)"
pickup_verifier = "((data.child('volunteerId').val() === auth.uid && data.child('status').val() === 'assigned') || (data.child('organizationId').val() === auth.uid && data.child('transport').val() === 'T\u1ef1 \u0111\u1ebfn l\u1ea5y' && data.child('status').val() === 'accepted'))"
pickup_code = "root.child('handover').child($id).child('pickup')"
receipt_code = "root.child('handover').child($id).child('receipt')"
order_journal = f"({F}.child('stockJournal').exists() ? {F}.child('stockJournal').val() : '')"
held = f"({order_journal}.contains('|' + $id + ':H|') && !{order_journal}.contains('|' + $id + ':R|'))"
released = f"{order_journal}.contains('|' + $id + ':R|')"
accept = f"({role('donor')} && data.child('donorId').val() === auth.uid && data.child('status').val() === 'awaiting' && data.child('stockState').val() === 'reserving' && newData.child('status').val() === 'accepted' && newData.child('stockState').val() === 'held' && newData.child('stockReserved').val() === true && {held})"
cancel_actor = f"(data.child('donorId').val() === auth.uid || data.child('organizationId').val() === auth.uid || {ADMIN})"
cancel = f"({cancel_actor} && {one(v('data','status'), ['awaiting','accepted','assigned'])} && newData.child('status').val() === 'cancelled' && newData.child('cancelledBy').val() === auth.uid && newData.child('cancelReason').isString() && newData.child('cancelReason').val().length > 0 && newData.child('cancelReason').val().length <= 2000 && newData.child('cancelledAt').isString() && newData.child('cancelHadStock').val() === ({one(v('data','status'), ['accepted','assigned'])}) && newData.child('cancelledVolunteerId').val() === data.child('volunteerId').val() && !newData.child('volunteerId').exists() && newData.child('driver').val() === '' && newData.child('stockState').val() === 'releasePending' && newData.child('stockReleased').val() === false)"
begin_hold = f"(newData.child('stockState').val() === 'reserving' && (!data.child('stockState').exists() || {one(v('data','stockState'), ['idle','reserving'])}))"
rollback_hold = f"(data.child('stockState').val() === 'reserving' && newData.child('stockState').val() === 'idle' && !{held})"
reserve_intent = f"({role('donor')} && data.child('donorId').val() === auth.uid && data.child('status').val() === 'awaiting' && newData.child('status').val() === 'awaiting' && ({begin_hold} || {rollback_hold}))"
finish_cancel = f"({cancel_actor} && data.child('status').val() === 'cancelled' && newData.child('status').val() === 'cancelled' && data.child('stockState').val() === 'releasePending' && newData.child('stockState').val() === 'released' && newData.child('stockReleased').val() === true && {released})"
# E: persist an immutable receipt intent, credit one inventory node, then finish.
requested = "(data.child('qtyRequested').exists() ? data.child('qtyRequested').val() : data.child('quantity').val())"
picked = "(data.child('qtyPickedUp').exists() ? data.child('qtyPickedUp').val() : data.child('quantity').val())"
receipt_fields = ['receiptState','inventoryAdded','qtyReceived','received','hasDiscrepancy','discrepancyNote','discrepancyTicketId','receiptRequestedAt','receiptPhoto']
discrepancy = f"(newData.child('qtyReceived').val() !== {requested} || newData.child('qtyReceived').val() !== {picked})"
ticket = "root.child('demo/tickets').child('receipt_' + $id)"
ticket_ready = f"(data.child('hasDiscrepancy').val() !== true || ({ticket}.child('type').val() === 'quantityDiscrepancy' && {ticket}.child('orderId').val() === $id && {ticket}.child('uid').val() === data.child('organizationId').val() && {ticket}.child('detail').val() === data.child('discrepancyNote').val()))"
receipt_intent = f"({role('charity')} && data.child('organizationId').val() === auth.uid && data.child('status').val() === 'pickedUp' && newData.child('status').val() === 'pickedUp' && !data.child('receiptState').exists() && (data.child('transport').val() === 'Tự đến lấy' || data.child('deliveryConfirmed').val() === true) && newData.child('receiptState').val() === 'pending' && newData.child('inventoryAdded').val() === false && newData.child('qtyRequested').val() === {requested} && newData.child('qtyPickedUp').val() === {picked} && newData.child('qtyReceived').isNumber() && newData.child('qtyReceived').val() % 1 === 0 && newData.child('qtyReceived').val() >= 0 && newData.child('qtyReceived').val() <= {requested} && newData.child('received').val() === newData.child('qtyReceived').val() && newData.child('hasDiscrepancy').val() === {discrepancy} && newData.child('discrepancyNote').isString() && newData.child('discrepancyNote').val().length <= 2000 && (!{discrepancy} || (newData.child('discrepancyNote').val().matches(/.*[^ \\t\\r\\n].*/) && newData.child('discrepancyTicketId').val() === 'receipt_' + $id)) && ({discrepancy} || !newData.child('discrepancyTicketId').exists()) && newData.child('receiptRequestedAt').isString())"
def valid_receipt_photo(node):
    return f"({node}.isString() && {node}.val().beginsWith('https://res.cloudinary.com/toanvip/image/upload/') && {node}.val().matches(/.*[.](png|jpg|jpeg)$/))"

receipt_intent += f" && {valid_receipt_photo(c('newData','receiptPhoto'))}"
attach_receipt_photo = f"({role('charity')} && data.child('organizationId').val() === auth.uid && data.child('status').val() === 'pickedUp' && newData.child('status').val() === 'pickedUp' && data.child('receiptState').val() === 'pending' && !{valid_receipt_photo(c('data','receiptPhoto'))} && {valid_receipt_photo(c('newData','receiptPhoto'))} && {same([k for k in receipt_fields if k != 'receiptPhoto'])})"
complete = f"({role('charity')} && data.child('organizationId').val() === auth.uid && data.child('status').val() === 'pickedUp' && data.child('receiptState').val() === 'pending' && newData.child('status').val() === 'completed' && newData.child('receiptState').val() === 'completed' && newData.child('inventoryAdded').val() === true && {INV}.child('receiptJournal').val().contains('|' + $id + ':I|') && {ticket_ready} && {same([k for k in receipt_fields if k not in ['receiptState','inventoryAdded']])} && {valid_receipt_photo(c('newData','receiptPhoto'))})"
transition = f"({same(['status'])} || {accept} || {cancel} || {complete} || (data.child('status').val() === 'awaiting' && data.child('stockState').val() !== 'reserving' && newData.child('status').val() === 'rejected' && data.child('donorId').val() === auth.uid) || (newData.child('status').val() === 'assigned' && ({claim} || ({ADMIN} && data.child('status').val() === 'accepted'))) || (newData.child('status').val() === 'pickedUp' && {pickup_verifier} && {pickup_code}.child('used').val() === true && {pickup_code}.child('verifierId').val() === auth.uid))"
order = {
    '.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('charity')} && newData.child('organizationId').val() === auth.uid) || (data.exists() && ({members} || {claim} || {ADMIN})))",
    '.validate': f"newData.child('id').val() === $id && newData.child('quantity').isNumber() && newData.child('quantity').val() > 0 && ((!data.exists() && newData.child('status').val() === 'awaiting' && newData.child('donorId').val() === {F}.child('donorId').val() && {F}.child('status').val() === 'open' && {F}.child('expiresAtMs').val() > now && newData.child('quantity').val() <= {F}.child('quantity').val() - {F}.child('reserved').val() && newData.child('received').val() === 0 && !newData.child('volunteerId').exists() && !newData.child('deliveryConfirmed').exists() && !newData.child('proof').exists() && !newData.child('thanks').exists()) || (data.exists() && {transition} && (!data.child('volunteerId').exists() || newData.child('volunteerId').exists() || {cancel}) && (!data.child('deliveryConfirmed').exists() || newData.child('deliveryConfirmed').exists())))",
}
protocol_keys = ['stockState','stockReserved','stockReleased','cancelledBy','cancelReason','cancelledAt','cancelHadStock','cancelledVolunteerId']
cancel_keys = ['cancelledBy','cancelReason','cancelledAt','cancelHadStock','cancelledVolunteerId']
order['.validate'] += f" && ((!data.exists() && !newData.hasChild('stockState') && !newData.hasChild('stockReserved') && !newData.hasChild('stockReleased') && !newData.hasChild('cancelledBy') && !newData.hasChild('cancelReason') && !newData.hasChild('cancelledAt') && !newData.hasChild('cancelHadStock') && !newData.hasChild('cancelledVolunteerId')) || (data.exists() && (({same(protocol_keys)}) || ({reserve_intent} && {same(['stockReserved','stockReleased'] + cancel_keys)}) || ({accept} && {same(['stockReleased'] + cancel_keys)}) || ({cancel} && {same(['stockReserved'])}) || ({finish_cancel} && {same(['stockReserved'] + cancel_keys)})))) && (newData.child('status').val() !== 'cancelled' || (!newData.child('volunteerId').exists() && newData.child('driver').val() === ''))"
order['.validate'] += f" && ((!data.exists() && !newData.child('receiptState').exists() && !newData.child('inventoryAdded').exists() && !newData.child('qtyPickedUp').exists() && !newData.child('qtyReceived').exists() && !newData.child('hasDiscrepancy').exists() && !newData.child('discrepancyTicketId').exists() && !newData.child('receiptPhoto').exists() && !newData.child('receiptRequestedAt').exists() && !newData.child('discrepancyNote').exists()) || (data.exists() && (({same(receipt_fields)}) || {receipt_intent} || {attach_receipt_photo} || {complete}))) && (!newData.child('qtyRequested').exists() || newData.child('qtyRequested').val() === newData.child('quantity').val()) && (!data.child('qtyRequested').exists() || newData.child('qtyRequested').exists()) && (!data.child('qtyPickedUp').exists() || newData.child('qtyPickedUp').exists())"
for key in receipt_fields + ['qtyRequested','qtyPickedUp']:
    order[key] = {'.validate': True}
for key in protocol_keys:
    order[key] = {'.validate': True}  # Validated together at the order root.
for key in ['id','foodId','donorId','organizationId','organization','quantity','transport','createdAt']:
    order[key] = immutable()
order['transport'] = {'.validate': f"{one('newData.val()', TRANSPORTS)} && (!data.exists() || newData.val() === data.val())"}
order['status'] = string(40)
order['volunteerId'] = {'.validate': f"newData.val() === data.val() || ({ADMIN} && root.child('users').child(newData.val()).child('role').val() === 'volunteer' && root.child('users').child(newData.val()).child('verificationStatus').val() === 'approved' && root.child('users').child(newData.val()).child('disabled').val() !== true) || ({role('volunteer')} && !data.exists() && newData.val() === auth.uid && data.parent().child('status').val() === 'accepted' && newData.parent().child('status').val() === 'assigned')"}
order['driver'] = {'.validate': f"newData.val() === data.val() || (!data.exists() && newData.val() === '') || {ADMIN} || (newData.val() === '' && newData.parent().child('status').val() === 'cancelled') || ({role('volunteer')} && newData.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'accepted')"}
order['receiver'] = {'.validate': "newData.isString() && newData.val().length <= 100 && (!data.exists() || newData.val() === data.val())"}
for key in ['time','note']:
    order[key] = {'.validate': f"!data.exists() || newData.val() === data.val() || (data.parent().child('donorId').val() === auth.uid && {one(v('data.parent()','status'), ['accepted','assigned'])})"}
pickup_transition = f"({pickup_verifier} && data.child('status').val() !== 'pickedUp' && newData.child('status').val() === 'pickedUp' && {pickup_code}.child('used').val() === true && {pickup_code}.child('verifierId').val() === auth.uid && newData.child('qtyRequested').val() === data.child('quantity').val() && newData.child('qtyPickedUp').isNumber() && newData.child('qtyPickedUp').val() % 1 === 0 && newData.child('qtyPickedUp').val() > 0 && newData.child('qtyPickedUp').val() <= data.child('quantity').val() && newData.child('qtyPickedUp').val() === ({pickup_code}.child('qtyPickedUp').exists() ? {pickup_code}.child('qtyPickedUp').val() : data.child('quantity').val()))"
order['.validate'] += f" && (({same(['qtyPickedUp'])}) || {pickup_transition} || ({receipt_intent} && !data.child('qtyPickedUp').exists() && newData.child('qtyPickedUp').val() === data.child('quantity').val())) && (data.child('status').val() === newData.child('status').val() || newData.child('status').val() !== 'pickedUp' || {pickup_transition})"
order['deliveryConfirmed'] = {'.validate': f"newData.val() === data.val() || (data.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'pickedUp' && newData.val() === true && {receipt_code}.child('used').val() === true && {receipt_code}.child('verifierId').val() === auth.uid)"}
for key in ['proof','proofAt']:
    order[key] = {'.validate': "newData.val() === data.val() || (data.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'pickedUp')"}
order['proof']['.validate'] += " && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/')"
order['thanks'] = {'.validate': "newData.val() === data.val() || (data.parent().child('organizationId').val() === auth.uid && data.parent().child('status').val() === 'completed' && newData.isString() && newData.val().length <= 2000)"}
order['receiptPhoto'] = {'.validate': valid_receipt_photo('newData')}
order['thanksPhoto'] = {'.validate': "newData.val() === data.val() || (data.parent().child('organizationId').val() === auth.uid && data.parent().child('status').val() === 'completed' && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/'))"}
order['updatedAt'] = string(100)
order['completedAt'] = {'.validate': "newData.val() === data.val() || (data.parent().child('status').val() === 'pickedUp' && newData.parent().child('status').val() === 'completed' && data.parent().child('organizationId').val() === auth.uid)"}
demo['orders'] = {'$id': fields(order, ['id','foodId','donorId','organizationId','organization','quantity','transport','createdAt','status','received','driver','time'])}

need = {'.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('charity')} && newData.child('uid').val() === auth.uid && newData.child('status').val() === 'pending') || ({ADMIN} && data.child('status').val() === 'pending' && {one(v('newData','status'), ['open','rejected'])}))", 'status': string(40), 'reviewNote': string(), 'reviewedAt': string(100), 'reviewedBy': {'.validate': 'newData.val() === auth.uid'}}
need['.write'] = f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('charity')} && newData.child('uid').val() === auth.uid && newData.child('status').val() === 'pending') || (data.child('uid').val() === auth.uid && {role('charity')} && {one(v('newData','status'), ['pending','closed'])}) || ({ADMIN} && data.child('status').val() === 'pending' && {one(v('newData','status'), ['open','rejected'])}))"
for key in ['id','uid','category','priority','createdAt']: need[key] = immutable()
for key in ['title','quantity']:
    need[key] = {'.validate': f"(!data.exists() || newData.val() === data.val() || (data.parent().child('uid').val() === auth.uid && newData.parent().child('status').val() === 'pending'))"}
need['title']['.validate'] += ' && newData.isString() && newData.val().length > 0 && newData.val().length <= 200'
need['updatedAt'] = string(100)
need['reviewedBy'] = {'.validate': f'newData.val() === data.val() || {ADMIN}'}
need['quantity']['.validate'] += ' && newData.isNumber() && newData.val() > 0 && newData.val() <= 100000'
demo['needs'] = {'$id': fields(need, ['id','uid','title','quantity','category','status','createdAt'])}

# E: one inventory-node transaction with an append-only receipt marker.
old_order = "root.child('demo/orders').child(newData.child('lastReceivedOrderId').val())"
dist = "newData.parent().parent().child('distributions').child(newData.child('lastDistributionId').val())"
received_old = "(data.child('received').exists() ? data.child('received').val() : 0)"
distributed_old = "(data.child('distributed').exists() ? data.child('distributed').val() : 0)"
inv_journal = "(data.child('receiptJournal').exists() ? data.child('receiptJournal').val() : '')"
inv_token = "'|' + newData.child('lastReceivedOrderId').val() + ':I|'"
inv_ticket = "root.child('demo/tickets').child('receipt_' + newData.child('lastReceivedOrderId').val())"
inv_ticket_ready = f"({old_order}.child('hasDiscrepancy').val() !== true || ({inv_ticket}.child('type').val() === 'quantityDiscrepancy' && {inv_ticket}.child('uid').val() === $uid && {inv_ticket}.child('orderId').val() === newData.child('lastReceivedOrderId').val() && {inv_ticket}.child('detail').val() === {old_order}.child('discrepancyNote').val()))"
receive_change = f"({old_order}.child('status').val() === 'pickedUp' && {old_order}.child('receiptState').val() === 'pending' && {old_order}.child('organizationId').val() === $uid && newData.child('lastReceivedOrderId').isString() && newData.child('lastReceivedOrderId').val().matches(/^[A-Za-z0-9_-]+$/) && !{inv_journal}.contains({inv_token}) && newData.child('receiptJournal').val() === {inv_journal} + {inv_token} && newData.child('received').val() === {received_old} + {old_order}.child('qtyReceived').val() && newData.child('distributed').val() === {distributed_old} && newData.child('lastDistributionId').val() === data.child('lastDistributionId').val() && {inv_ticket_ready})"
receive_change += f" && {valid_receipt_photo(c(old_order,'receiptPhoto'))}"
distribute_change = f"(newData.child('received').val() === {received_old} && {dist}.child('uid').val() === $uid && !root.child('demo/distributions').child(newData.child('lastDistributionId').val()).exists() && newData.child('distributed').val() === {distributed_old} + {dist}.child('quantity').val() && {same(['receiptJournal','lastReceivedOrderId'])})"
inv = {'.write': f"{role('charity')} && auth.uid === $uid && newData.exists()", '.validate': f"newData.child('received').isNumber() && newData.child('distributed').isNumber() && newData.child('distributed').val() >= 0 && newData.child('received').val() >= newData.child('distributed').val() && ({receive_change} || {distribute_change})", 'received': {'.validate': True}, 'distributed': {'.validate': True}, 'lastReceivedOrderId': string(200), 'lastDistributionId': string(200), 'receiptJournal': string(10000000)}
demo['inventory'] = {'$uid': fields(inv, ['received','distributed'])}
d = {'.write': f"{role('charity')} && !data.exists() && newData.child('uid').val() === auth.uid", '.validate': "newData.child('id').val() === $id && newData.child('quantity').isNumber() && newData.child('quantity').val() > 0 && newData.parent().parent().child('inventory').child(auth.uid).child('lastDistributionId').val() === $id", 'id': string(200), 'uid': string(200), 'quantity': {'.validate': True}, 'createdAt': string(100)}
demo['distributions'] = {'$id': fields(d, ['id','uid','quantity','createdAt'])}

def order_member(node):
    return f"({node}.child('donorId').val() === auth.uid || {node}.child('organizationId').val() === auth.uid || {node}.child('volunteerId').val() === auth.uid || {ADMIN})"
ref_order = "root.child('demo/orders').child(newData.child('orderId').val())"
msg = {'.write': f"{ACTIVE} && !data.exists() && newData.child('uid').val() === auth.uid && {order_member(ref_order)}", 'uid': string(200), 'id': string(200), 'orderId': string(200), 'name': string(100), 'text': string(), 'time': string(100)}
demo['messages'] = {'$id': fields(msg, ['uid','id','orderId','name','text','time'])}
t = {'.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && newData.child('uid').val() === auth.uid && newData.child('status').val() === 'open' && (newData.child('orderId').val() === '' || {order_member(ref_order)})) || ({ADMIN} && {one(v('data','status'), ['open','investigating'])} && {one(v('newData','status'), ['investigating','resolved','rejected'])}))", 'status': string(40), 'resolution': string(), 'resolvedBy': {'.validate': 'newData.val() === auth.uid'}}
for key in ['id','uid','name','orderId','reason','detail','photo','createdAt','type']: t[key] = immutable()
t['.write'] += f" && (newData.child('type').val() !== 'quantityDiscrepancy' || ($id === 'receipt_' + newData.child('orderId').val() && {ref_order}.child('organizationId').val() === newData.child('uid').val() && {ref_order}.child('hasDiscrepancy').val() === true && {ref_order}.child('discrepancyNote').val() === newData.child('detail').val()))"
demo['tickets'] = {'$id': fields(t, ['id','uid','orderId','detail','status','createdAt'])}
r = {'.write': f"{ACTIVE} && newData.exists() && newData.child('uid').val() === auth.uid && (data.child('uid').val() === auth.uid || !data.exists()) && {ref_order}.child('status').val() === 'completed' && ({ref_order}.child('donorId').val() === auth.uid || {ref_order}.child('organizationId').val() === auth.uid)", '.validate': "newData.child('rating').isNumber() && newData.child('rating').val() >= 1 && newData.child('rating').val() <= 5 && $id === newData.child('orderId').val() + '_' + auth.uid", 'orderId': immutable(), 'uid': immutable(), 'rating': {'.validate': True}, 'note': string(), 'createdAt': string(100)}
demo['reviews'] = {'$id': fields(r, ['orderId','uid','rating','note','createdAt'])}
n = {'.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && newData.child('senderId').val() === auth.uid && newData.child('read').val() === false) || (data.child('uid').val() === auth.uid && newData.child('read').val() === true))", 'read': {'.validate': 'newData.isBoolean()'}}
for key in ['uid','senderId','title','body','createdAt']: n[key] = immutable()
demo['notifications'] = {'$id': fields(n, ['uid','senderId','title','body','createdAt','read'])}
demo['shifts'] = {'$id': {'.write': f"{role('volunteer')} && ((!newData.exists() && data.child('uid').val() === auth.uid) || (newData.child('uid').val() === auth.uid && $id === auth.uid + '_' + newData.child('date').val()))", '.validate': "newData.hasChildren(['id','uid','date']) && newData.child('date').isString() && newData.child('date').val().length === 10", 'id': string(200), 'uid': string(200), 'date': string(10), '$other': {'.validate': False}}}

# Codes live outside the demo read tree and are limited to participants.
handover_order = "root.child('demo/orders').child($order)"
creator = f"(($stage === 'pickup' && {handover_order}.child('donorId').val() === auth.uid && {one(v(handover_order,'status'), ['accepted','assigned'])}) || ($stage === 'receipt' && {handover_order}.child('organizationId').val() === auth.uid && {handover_order}.child('status').val() === 'pickedUp'))"
verifier = f"(($stage === 'pickup' && (({handover_order}.child('volunteerId').val() === auth.uid && {handover_order}.child('status').val() === 'assigned') || ({handover_order}.child('organizationId').val() === auth.uid && {handover_order}.child('transport').val() === 'T\u1ef1 \u0111\u1ebfn l\u1ea5y' && {handover_order}.child('status').val() === 'accepted'))) || ($stage === 'receipt' && {handover_order}.child('volunteerId').val() === auth.uid && {handover_order}.child('status').val() === 'pickedUp'))"
code = {'.read': f'{ACTIVE} && ({creator} || {verifier} || {ADMIN})', '.write': f"{ACTIVE} && newData.exists() && ({creator} || {verifier})", '.validate': f"newData.hasChildren(['pin','creatorId','expiresAt','attempts','used']) && (({creator} && newData.child('creatorId').val() === auth.uid && newData.child('pin').isString() && newData.child('pin').val().matches(/^[0-9]{{6}}$/) && newData.child('expiresAt').val() > now && newData.child('expiresAt').val() <= now + 610000 && newData.child('attempts').val() === 0 && newData.child('used').val() === false) || ({verifier} && data.exists() && data.child('used').val() === false && data.child('attempts').val() < 5 && data.child('expiresAt').val() > now && {same(['pin','creatorId','expiresAt'])} && newData.child('attempts').val() === data.child('attempts').val() + 1 && newData.child('verifierId').val() === auth.uid && newData.child('used').val() === (newData.child('enteredPin').val() === data.child('pin').val())))"}
# A verifier can resume a consumed code after the order write/acknowledgement
# was lost. This grants read only; the used code still cannot be consumed again.
code['.read'] += f" || ({ACTIVE} && data.child('used').val() === true && data.child('verifierId').val() === auth.uid && {order_member(handover_order)})"
code['.validate'] += f" && (newData.child('used').val() !== true || $stage !== 'pickup' || (newData.child('qtyPickedUp').isNumber() && newData.child('qtyPickedUp').val() % 1 === 0 && newData.child('qtyPickedUp').val() > 0 && newData.child('qtyPickedUp').val() <= {handover_order}.child('quantity').val()))"
rules['handover'] = {'$order': {'$stage': code}}

# Collection reads must be authorized queries. Never grant /demo read access:
# applications, documents, messages and tickets are private to their owners.
for table in ['applications','tickets','notifications','shifts','distributions']:
    demo[table]['.read'] = f"{ADMIN} || ({ACTIVE} && query.orderByChild === 'uid' && query.equalTo === auth.uid)"
    demo[table]['.indexOn'] = ['uid']
    demo[table]['$id']['.read'] = f"{ADMIN} || ({ACTIVE} && data.child('uid').val() === auth.uid)"
demo['tickets']['$id']['.read'] += f" || ({ACTIVE} && !data.exists())"
demo['inventory']['$uid']['.read'] = f"{ADMIN} || ({ACTIVE} && auth.uid === $uid)"
for table, owner_key in [('foods','donorId'),('needs','uid')]:
    demo[table]['.read'] = f"{ADMIN} || ({ACTIVE} && ((query.orderByChild === 'status' && query.equalTo === 'open') || (query.orderByChild === '{owner_key}' && query.equalTo === auth.uid)))"
    demo[table]['.indexOn'] = [owner_key,'status']
    # An explicit order participant can read the referenced food, even closed.
    # The order ID is maintained on the food when stock is reserved.
    participant_food = "root.child('demo/orders').child(data.child('lastStockOrderId').val())"
    extra = " || root.child('foodAccess').child($id).child(auth.uid).exists()" if table == 'foods' else ''
    demo[table]['$id']['.read'] = f"{ADMIN} || ({ACTIVE} && (data.child('{owner_key}').val() === auth.uid || data.child('status').val() === 'open'{extra}))"
demo['orders']['.read'] = f"{ADMIN} || ({ACTIVE} && (((query.orderByChild === 'donorId' || query.orderByChild === 'organizationId' || query.orderByChild === 'volunteerId') && query.equalTo === auth.uid) || ({role('volunteer')} && query.orderByChild === 'status' && query.equalTo === 'accepted')))"
demo['orders']['.indexOn'] = ['donorId','organizationId','volunteerId','status']
demo['orders']['$id']['.read'] = f"{ACTIVE} && ({order_member('data')} || ({role('volunteer')} && data.child('status').val() === 'accepted'))"
for table in ['messages','reviews']:
    queried_order = "root.child('demo/orders').child(query.equalTo)"
    stored_order = "root.child('demo/orders').child(data.child('orderId').val())"
    demo[table]['.read'] = f"{ADMIN} || ({ACTIVE} && query.orderByChild === 'orderId' && query.equalTo !== null && {order_member(queried_order)})"
    demo[table]['.indexOn'] = ['orderId']
    demo[table]['$id']['.read'] = f"{ACTIVE} && {order_member(stored_order)}"

access_order = "newData.parent().parent().parent().child('demo/orders').child(newData.child('orderId').val())"
rules['foodAccess'] = {'$food': {'$uid': {
    '.read': f"{ACTIVE} && (auth.uid === $uid || {ADMIN})",
    '.write': f"{ACTIVE} && newData.exists() && {access_order}.child('foodId').val() === $food && ((auth.uid === $uid && ({access_order}.child('organizationId').val() === auth.uid || {access_order}.child('volunteerId').val() === auth.uid)) || ({ADMIN} && {access_order}.child('volunteerId').val() === $uid))",
    '.validate': "newData.hasChildren(['orderId'])",
}}}

target = Path(__file__).resolve().parents[1] / 'firebase/database/database.rules.json'
target.write_text(json.dumps({'rules': rules}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Generated {target.name}: {target.stat().st_size} bytes')
