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
new_o = "newData.parent().parent().child('orders').child(newData.child('lastStockOrderId').val())"
stock = f"({old_o}.child('foodId').val() === $id && {old_o}.child('quantity').isNumber() && (({role('donor')} && {owner} && {old_o}.child('status').val() === 'awaiting' && {new_o}.child('status').val() === 'accepted' && newData.child('reserved').val() === data.child('reserved').val() + {old_o}.child('quantity').val()) || (({old_o}.child('donorId').val() === auth.uid || {old_o}.child('organizationId').val() === auth.uid) && {one(v(old_o,'status'), ['accepted','assigned'])} && {new_o}.child('status').val() === 'cancelled' && newData.child('reserved').val() === data.child('reserved').val() - {old_o}.child('quantity').val())))"
food = {
    '.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('donor')} && newData.child('donorId').val() === auth.uid) || (data.exists() && ({owner} || {ADMIN} || {stock})))",
    '.validate': f"newData.child('id').val() === $id && newData.child('quantity').isNumber() && newData.child('quantity').val() > 0 && newData.child('quantity').val() <= 100000 && newData.child('reserved').isNumber() && newData.child('reserved').val() >= 0 && newData.child('reserved').val() <= newData.child('quantity').val() && ((!data.exists() && newData.child('status').val() === 'pending' && newData.child('reserved').val() === 0 && newData.child('expiresAtMs').val() > now) || (data.exists() && ({food_edit} || ({ADMIN} && data.child('status').val() === 'pending' && {one(v('newData','status'), ['open','rejected'])}) || ({owner} && newData.child('status').val() === 'closed' && newData.child('reserved').val() === data.child('reserved').val()) || (newData.child('status').val() === data.child('status').val() && {stock}))))",
    'id': immutable(), 'donorId': immutable(), 'donor': immutable(), 'createdAt': immutable(),
    'quantity': {'.validate': f'!data.exists() || newData.val() === data.val() || {food_edit.replace("newData.", "newData.parent().").replace("data.", "data.parent().")}'},
    'reserved': {'.validate': 'newData.isNumber()'}, 'status': string(40), 'updatedAt': string(100),
    'reviewNote': {'.validate': f"newData.val() === data.val() || {ADMIN} || newData.val() === ''"}, 'reviewedAt': string(100), 'reviewedBy': {'.validate': f'newData.val() === data.val() || {ADMIN}'},
    'lastStockOrderId': string(200),
}
# At child depth, use the row snapshots for the edit predicate.
child_edit = food_edit.replace('newData.', 'NEW.').replace('data.', 'OLD.').replace('NEW.', 'newData.parent().').replace('OLD.', 'data.parent().')
food['quantity']['.validate'] = f'!data.exists() || newData.val() === data.val() || {child_edit}'
for key in ['name','category','storage','address','pickup','note','photo','expiresAt','expiresAtMs','safe','allergens','latitude','longitude']:
    food[key] = {'.validate': f'!data.exists() || newData.val() === data.val() || {child_edit}'}
food['safe']['.validate'] += ' && newData.val() === true'
food['photo']['.validate'] = f"({food['photo']['.validate']}) && newData.isString() && (newData.val() === '' || newData.val().beginsWith('https://res.cloudinary.com/toanvip/'))"
food['photos'] = {
    '.validate': f"newData.hasChildren(['0']) && !newData.child('6').exists() && (!data.exists() || newData.val() === data.val() || {child_edit})",
    '$n': {'.validate': "$n.matches(/^[0-5]$/) && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/')"},
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
accept = f"({role('donor')} && data.child('donorId').val() === auth.uid && data.child('status').val() === 'awaiting' && newData.child('status').val() === 'accepted' && {F}.child('status').val() === 'open' && {F}.child('expiresAtMs').val() > now && {NF}.child('lastStockOrderId').val() === $id && {NF}.child('reserved').val() === {F}.child('reserved').val() + data.child('quantity').val())"
cancel = f"((data.child('donorId').val() === auth.uid || data.child('organizationId').val() === auth.uid) && newData.child('status').val() === 'cancelled' && (data.child('status').val() === 'awaiting' || ({one(v('data','status'), ['accepted','assigned'])} && {NF}.child('lastStockOrderId').val() === $id && {NF}.child('reserved').val() === {F}.child('reserved').val() - data.child('quantity').val())))"
complete = f"({role('charity')} && data.child('organizationId').val() === auth.uid && data.child('status').val() === 'pickedUp' && newData.child('status').val() === 'completed' && (data.child('transport').val() === 'T\u1ef1 \u0111\u1ebfn l\u1ea5y' || data.child('deliveryConfirmed').val() === true) && newData.child('received').val() > 0 && newData.child('received').val() <= data.child('quantity').val() && {NINV}.child('lastReceivedOrderId').val() === $id && {NINV}.child('received').val() === ({INV}.child('received').exists() ? {INV}.child('received').val() : 0) + newData.child('received').val())"
transition = f"({same(['status'])} || {accept} || {cancel} || {complete} || (data.child('status').val() === 'awaiting' && newData.child('status').val() === 'rejected' && data.child('donorId').val() === auth.uid) || (newData.child('status').val() === 'assigned' && ({claim} || ({ADMIN} && data.child('status').val() === 'accepted'))) || (newData.child('status').val() === 'pickedUp' && {pickup_verifier} && {pickup_code}.child('used').val() === true && {pickup_code}.child('verifierId').val() === auth.uid))"
order = {
    '.write': f"{ACTIVE} && newData.exists() && ((!data.exists() && {role('charity')} && newData.child('organizationId').val() === auth.uid) || (data.exists() && ({members} || {claim} || {ADMIN})))",
    '.validate': f"newData.child('id').val() === $id && newData.child('quantity').isNumber() && newData.child('quantity').val() > 0 && ((!data.exists() && newData.child('status').val() === 'awaiting' && newData.child('donorId').val() === {F}.child('donorId').val() && {F}.child('status').val() === 'open' && {F}.child('expiresAtMs').val() > now && newData.child('quantity').val() <= {F}.child('quantity').val() - {F}.child('reserved').val() && newData.child('received').val() === 0 && !newData.child('volunteerId').exists() && !newData.child('deliveryConfirmed').exists() && !newData.child('proof').exists() && !newData.child('thanks').exists()) || (data.exists() && {transition} && (!data.child('volunteerId').exists() || newData.child('volunteerId').exists()) && (!data.child('deliveryConfirmed').exists() || newData.child('deliveryConfirmed').exists())))",
}
for key in ['id','foodId','donorId','organizationId','organization','quantity','transport','createdAt']:
    order[key] = immutable()
order['transport'] = {'.validate': f"{one('newData.val()', TRANSPORTS)} && (!data.exists() || newData.val() === data.val())"}
order['status'] = string(40)
order['volunteerId'] = {'.validate': f"newData.val() === data.val() || ({ADMIN} && root.child('users').child(newData.val()).child('role').val() === 'volunteer' && root.child('users').child(newData.val()).child('verificationStatus').val() === 'approved' && root.child('users').child(newData.val()).child('disabled').val() !== true) || ({role('volunteer')} && !data.exists() && newData.val() === auth.uid && data.parent().child('status').val() === 'accepted' && newData.parent().child('status').val() === 'assigned')"}
order['driver'] = {'.validate': f"newData.val() === data.val() || (!data.exists() && newData.val() === '') || {ADMIN} || ({role('volunteer')} && newData.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'accepted')"}
order['receiver'] = {'.validate': "newData.isString() && newData.val().length <= 100 && (!data.exists() || newData.val() === data.val())"}
for key in ['time','note']:
    order[key] = {'.validate': f"!data.exists() || newData.val() === data.val() || (data.parent().child('donorId').val() === auth.uid && {one(v('data.parent()','status'), ['accepted','assigned'])})"}
order['received'] = {'.validate': "(!data.exists() && newData.val() === 0) || newData.val() === data.val() || (data.parent().child('status').val() === 'pickedUp' && newData.parent().child('status').val() === 'completed' && data.parent().child('organizationId').val() === auth.uid)"}
order['deliveryConfirmed'] = {'.validate': f"newData.val() === data.val() || (data.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'pickedUp' && newData.val() === true && {receipt_code}.child('used').val() === true && {receipt_code}.child('verifierId').val() === auth.uid)"}
for key in ['proof','proofAt']:
    order[key] = {'.validate': "newData.val() === data.val() || (data.parent().child('volunteerId').val() === auth.uid && data.parent().child('status').val() === 'pickedUp')"}
order['proof']['.validate'] += " && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/')"
order['thanks'] = {'.validate': "newData.val() === data.val() || (data.parent().child('organizationId').val() === auth.uid && data.parent().child('status').val() === 'completed' && newData.isString() && newData.val().length <= 2000)"}
order['receiptPhoto'] = {'.validate': "newData.val() === data.val() || (data.parent().child('organizationId').val() === auth.uid && data.parent().child('status').val() === 'pickedUp' && newData.parent().child('status').val() === 'completed' && newData.isString() && newData.val().beginsWith('https://res.cloudinary.com/toanvip/'))"}
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

# Inventory counters are tied to a new completion or distribution in the SAME
# atomic update. Concurrent stale counter writes are rejected by these rules.
old_inv = "root.child('demo/inventory').child($uid)"
old_order = "root.child('demo/orders').child(newData.child('lastReceivedOrderId').val())"
new_order = "newData.parent().parent().child('orders').child(newData.child('lastReceivedOrderId').val())"
dist = "newData.parent().parent().child('distributions').child(newData.child('lastDistributionId').val())"
received_old = "(data.child('received').exists() ? data.child('received').val() : 0)"
distributed_old = "(data.child('distributed').exists() ? data.child('distributed').val() : 0)"
receive_change = f"({old_order}.child('status').val() === 'pickedUp' && {new_order}.child('status').val() === 'completed' && {old_order}.child('organizationId').val() === $uid && newData.child('received').val() === {received_old} + {new_order}.child('received').val() && newData.child('distributed').val() === {distributed_old})"
distribute_change = f"(newData.child('received').val() === {received_old} && {dist}.child('uid').val() === $uid && !root.child('demo/distributions').child(newData.child('lastDistributionId').val()).exists() && newData.child('distributed').val() === {distributed_old} + {dist}.child('quantity').val())"
inv = {'.write': f"{role('charity')} && auth.uid === $uid && newData.exists()", '.validate': f"newData.child('received').isNumber() && newData.child('distributed').isNumber() && newData.child('distributed').val() >= 0 && newData.child('received').val() >= newData.child('distributed').val() && ({receive_change} || {distribute_change})", 'received': {'.validate': True}, 'distributed': {'.validate': True}, 'lastReceivedOrderId': string(200), 'lastDistributionId': string(200)}
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
rules['handover'] = {'$order': {'$stage': code}}

# Collection reads must be authorized queries. Never grant /demo read access:
# applications, documents, messages and tickets are private to their owners.
for table in ['applications','tickets','notifications','shifts','distributions']:
    demo[table]['.read'] = f"{ADMIN} || ({ACTIVE} && query.orderByChild === 'uid' && query.equalTo === auth.uid)"
    demo[table]['.indexOn'] = ['uid']
    demo[table]['$id']['.read'] = f"{ADMIN} || ({ACTIVE} && data.child('uid').val() === auth.uid)"
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
