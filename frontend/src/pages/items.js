import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../services/api';

const Items = ({ token }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems(token);
    setItems(data);
  };

  const handleAddItem = async () => {
    const addedItem = await addItem(newItem, token);
    setItems([...items, addedItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleUpdateItem = async (id, updatedItem) => {
    const item = await updateItem(id, updatedItem, token);
    setItems(items.map(i => (i._id === id ? item : i)));
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id, token);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Item name"
      />
      <input
        type="number"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
        placeholder="Item quantity"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleUpdateItem(item._id, { ...item, name: e.target.value })}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateItem(item._id, { ...item, quantity: parseInt(e.target.value) })}
            />
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
