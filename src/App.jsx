import { useState, useEffect } from "react";
import { CartItem, CartSummary, Header } from "./components";
import { initialCartItems } from "./data";
import { toast } from "sonner";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 4.0; // just a random value for shipping
  const [totalWithTax, setTotalWithTax] = useState(0);

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    calculatePrices();
  }, [cartItems]);

  const initDB = () => {
    const request = indexedDB.open("ShoppingCartDB", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const cartStore = db.createObjectStore("cart", { keyPath: "id" });
      cartStore.transaction.oncomplete = () => {
        const transaction = db.transaction(["cart"], "readwrite");
        const objectStore = transaction.objectStore("cart");
        initialCartItems.forEach((item) => {
          objectStore.add(item);
        });
      };
      db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      fetchCartItems(db);
    };
  };

  const fetchCartItems = (db) => {
    const transaction = db.transaction(["cart"], "readonly");
    const objectStore = transaction.objectStore("cart");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      setCartItems(event.target.result);
    };
  };

  const calculatePrices = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    const total = subtotal + shipping;
    const totalWithTax = total * 1.1; // Assuming a 10% tax rate

    setSubtotal(subtotal);
    setTotalWithTax(totalWithTax);
  };

  const handleCheckout = () => {
    const dbRequest = indexedDB.open("ShoppingCartDB", 1);
    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["orders"], "readwrite");
      const objectStore = transaction.objectStore("orders");
      const order = {
        items: cartItems,
        subtotal,
        shipping,
        total: totalWithTax,
      };
      const request = objectStore.add(order);
      request.onsuccess = () => {
        toast.success("Order saved successfully!");
      };
      request.onerror = () => {
        toast.error("Failed to save order.");
      };
    };
  };

  const incrementItemQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItemQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8 w-full justify-between pl-4 pr-3 lg:pl-8 lg:pr-8 py-8">
      <div className="w-full">
        <Header />
        <div className="flex-1 py-4">
          <h1 className="text-lg font-medium mb-2 font-[poppins] text-[#1E1E1E]">
            Shopping Cart
          </h1>
          <div className="mb-4 text-[#1E1E1E] font-[Nunito] font-medium text-[14px]">
            <p>You have {cartItems.length} item(s) in your cart</p>
          </div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increment={incrementItemQuantity}
              decrement={decrementItemQuantity}
              remove={removeCartItem}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full lg:w-[388px] xl:w-1/3">
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          totalWithTax={totalWithTax}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default App;
