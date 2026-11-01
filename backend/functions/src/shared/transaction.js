'use strict';
/**
 * Keep a complete server view attached throughout the transaction. A one-shot
 * read can release its cache while child reads leave only partial root data;
 * validating that partial first callback would reject valid existing users.
 */
async function transact(ref, update) {
  const keepAlive = () => {};
  ref.on('value', keepAlive);
  try {
    await ref.once('value');
    return await ref.transaction(update);
  } finally { ref.off('value', keepAlive); }
}
module.exports = {transact};
