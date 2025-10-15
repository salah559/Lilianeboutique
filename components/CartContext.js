import { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export function CartProvider({children}) {
  const [items, setItems] = useState([]);
  useEffect(()=> {
    const raw = localStorage.getItem('cart');
    if(raw) setItems(JSON.parse(raw));
  },[]);
  useEffect(()=> localStorage.setItem('cart', JSON.stringify(items)), [items]);
  function addItem(item){
    setItems(prev=>{
      const same = prev.find(i=> i.productId===item.productId && i.size===item.size && i.color===item.color);
      if(same) return prev.map(i=> i===same ? {...i, qty: i.qty + item.qty} : i);
      return [...prev, item];
    });
  }
  function removeItem(index){ setItems(prev=> prev.filter((_,i)=>i!==index)); }
  function clearCart(){ setItems([]); }
  const total = items.reduce((s,i)=> s + i.price*i.qty, 0);
  return <CartContext.Provider value={{items, addItem, removeItem, clearCart, total}}>{children}</CartContext.Provider>
}
export const useCart = ()=> useContext(CartContext);