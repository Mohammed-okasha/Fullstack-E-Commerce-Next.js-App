export function getDiscountAmount(price, percentage) {
  let discountAmount = null;

  if (percentage) {
    discountAmount = (price * percentage) / 100;
    return discountAmount.toFixed(2);
  }

  return discountAmount;
}

export function getNewPrice(price, discount) {
  return (price - discount).toFixed(2);
}

export function redirectRoute(replace, path) {
  setTimeout(() => {
    replace(path);
  }, 1500);
}
//* User Cart ===========================================================
export function userCartUpdateLogic(cartItems, sentItem) {
  let updatedUserItems;

  // Check if The sent Product Exists in User Cart Items
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === sentItem.id
  );

  const existingItem = cartItems[existingItemIndex];

  if (!existingItem) {
    updatedUserItems = [sentItem, ...cartItems];
  } else {
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + sentItem.quantity,
    };

    updatedUserItems = cartItems.slice();
    updatedUserItems[existingItemIndex] = updatedItem;
  }

  return updatedUserItems;
}
//* LocalStorage ===========================================================
export function saveData(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function removeData(key) {
  localStorage.removeItem(key);
}
