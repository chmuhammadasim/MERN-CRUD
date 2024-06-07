import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem , logout } from '../services/api';
import './items.css'; // Import CSS file

const Items = ({ token }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ productName: '', productBrand: '', quantity: 0, price: 0 });
  const [updatedItem, setUpdatedItem] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems(token);
      setItems(Array.isArray(response.data) ? response.data : []); // Ensuring data is an array
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const addedItem = await addItem(newItem, token);
      setItems([...items, addedItem]);
      setNewItem({ productName: '', productBrand: '', quantity: 0, price: 0 });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateInputChange = (e, itemId, fieldName) => {
    setUpdatedItem({ ...updatedItem, [itemId]: { ...updatedItem[itemId], [fieldName]: e.target.value } });
  };

  const handleUpdateItem = async (id) => {
    try {
      const item = await updateItem(id, updatedItem[id], token);
      setItems(items.map(i => (i._id === id ? item : i)));
      setUpdatedItem({ ...updatedItem, [id]: {} });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id, token);
      setItems(items.filter(i => i._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleLogout = async() => {
    await logout(token);
    window.location.href = '/';
  };

  return (
    <div className="items-container">
      <h1>Item List</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem.productName}
          onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
          placeholder="Item name"
        />
        <input
          type="text"
          value={newItem.productBrand}
          onChange={(e) => setNewItem({ ...newItem, productBrand: e.target.value })}
          placeholder="Product brand"
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          placeholder="Item quantity"
        />
        <input
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
          placeholder="Item price"
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <input
              type="text"
              value={updatedItem[item._id]?.productName || item.productName}
              onChange={(e) => handleUpdateInputChange(e, item._id, 'productName')}
            />
            <input
              type="text"
              value={updatedItem[item._id]?.productBrand || item.productBrand}
              onChange={(e) => handleUpdateInputChange(e, item._id, 'productBrand')}
            />
            <input
              type="number"
              value={updatedItem[item._id]?.quantity || item.quantity}
              onChange={(e) => handleUpdateInputChange(e, item._id, 'quantity')}
            />
            <input
              type="number"
              value={updatedItem[item._id]?.price || item.price}
              onChange={(e) => handleUpdateInputChange(e, item._id, 'price')}
            />
            <button onClick={() => handleUpdateItem(item._id)}>Update</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
