import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import axios from 'axios';

interface Registration {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  registrationDate: string;
}


const MOCK_ORDERS = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: 'EDU001',
    items: [{ name: "Chef's Special Biryani", quantity: 2 }],
    total: 360,
    status: 'pending',
    orderTime: '2024-03-15 14:30',
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    studentId: 'EDU002',
    items: [{ name: 'Grilled Chicken Platter', quantity: 1 }],
    total: 220,
    status: 'preparing',
    orderTime: '2024-03-15 14:25',
  },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'registrations' | 'orders' | 'menu'>('registrations');

  const [applications, setApplications] = useState<Registration[]>([]);

  const approveUser = async (userId: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/approve-user", {
        userId: userId
      })

      const data = res?.data;

      if (data?.success) {
        const filteredArray = applications.filter((user) => user._id !== userId);
        setApplications(filteredArray);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const rejectUser = async (userId: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/reject-user", {
        userId: userId
      })

      const data = res?.data;

      if (data?.success) {
        const filteredArray = applications.filter((user) => user._id !== userId);
        setApplications(filteredArray);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleApprove = (userId: string) => {
    if (confirm('Are you sure you want to approve this user?')) {
      approveUser(userId)
    }
  };

  const handleReject = (userId: string) => {
    if (confirm('Are you sure you want to reject this user?')) {
      rejectUser(userId);
    }
  };

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        // const response = await fetch("http://localhost:5000/api/users/get-pending-users", {method: 'GET', headers: {'Content-Type': 'application/json'}}).then((res)=>res.json());
        const res = await axios.get("http://localhost:5000/api/users/get-pending-users");
        console.log("data : ", res?.data);
        if (res?.data?.success) {
          setApplications(res?.data?.users);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPendingApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg">
        <nav className="flex border-b">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'registrations'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Pending Registrations
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'orders'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'menu'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Menu Management
          </button>
        </nav>

        <div className="p-6">
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Pending Registrations</h2>
              {applications.map((registration) => (
                <div
                  key={registration._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{registration.name}</p>
                    <p className="text-sm text-gray-600">{registration.email}</p>
                    <p className="text-sm text-gray-600">
                      Student ID: {registration.studentId}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => handleApprove(registration?._id)} size="sm" variant="primary">
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(registration?._id)} size="sm" variant="outline">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Active Orders</h2>
              {MOCK_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        Order #{order.id} - {order.studentName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Student ID: {order.studentId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {order.orderTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">৳{order.total}</p>
                      <p className="text-sm capitalize text-indigo-600">
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm">
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm">Update Status</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu Items</h2>
                <Button>Add New Item</Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-center text-gray-600">
                  Menu management interface will be implemented here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}