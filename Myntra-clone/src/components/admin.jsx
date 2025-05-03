import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]); 
  const [newItem, setNewItem] = useState({
    id: '',
    image: '',
    company: '',
    item_name: '',
    original_price: 0,
    current_price: 0,
    discount_percentage: 0,
    return_period: 0,
    delivery_date: '',
    rating: { stars: 0, count: 0 },
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/api/m1/items')
      .then((response) => {
        setItems(response.data.items || []);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    setLoading(true);
    axios
      .get('http://localhost:8080/api/m1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Fetched users:', response.data.users);
        setUsers(response.data.users || []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:8080/api/m1/items', newItem);
      setItems([...items, newItem]);
      setNewItem({
        id: '',
        image: '',
        company: '',
        item_name: '',
        original_price: 0,
        current_price: 0,
        discount_percentage: 0,
        return_period: 0,
        delivery_date: '',
        rating: { stars: 0, count: 0 },
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/m1/items/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateItem = async (itemId) => {
    try {
      const updatedItem = { ...newItem, id: itemId };
      await axios.put(`http://localhost:8080/api/m1/items/${itemId}`, updatedItem);
      setItems(items.map((item) => (item._id === itemId ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleBlockUnblockUser = async (userId, currentStatus) => {
    if (!token) {
      alert('Unauthorized');
      return;
    }

    const endpoint =
      currentStatus === 'blocked'
        ? `http://localhost:8080/api/m1/users/${userId}/unblock`
        : `http://localhost:8080/api/m1/users/${userId}/block`;

    try {
      await axios.patch(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map((user) =>
        user._id === userId
          ? { ...user, status: currentStatus === 'blocked' ? 'active' : 'blocked' }
          : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Add New Product Section */}
      <h3>Add New Product</h3>
      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item ID"
          value={newItem.id}
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.item_name}
          onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
        />
        {/* Add more inputs as needed */}
        <button onClick={handleAddItem} className="add-button">Add Item</button>
      </div>

      {/* Product List Section */}
      <h3>Product List</h3>
      {loading ? <p>Loading...</p> : (
        <ul className="product-list">
          {items.map((item) => (
            <li key={item._id} className="product-item">
              <h4>{item.item_name}</h4>
              <p>Company: {item.company}</p>
              <p>Price: {item.current_price}</p>
              <div className="item-buttons">
                <button onClick={() => handleDeleteItem(item._id)} className="delete-button">Delete</button>
                <button onClick={() => handleUpdateItem(item._id)} className="update-button">Update</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* User Management Section */}
      <h3>User Management</h3>
      {loading ? <p>Loading users...</p> : (
        users.length === 0 ? <p>No users found.</p> : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <h4>{user.email}</h4>
                <p>Role: {user.role}</p>
                <p>Status: {user.status}</p>
                <button
                  onClick={() => handleBlockUnblockUser(user._id, user.status)}
                  className="block-unblock-button"
                >
                  {user.status === 'blocked' ? 'Unblock' : 'Block'}
                </button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default AdminPanel;
