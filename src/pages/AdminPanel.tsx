import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import axios from 'axios';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Registration {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  registrationDate: string;
}

// import {AddNewMenuItemModal} from "../components/ui/AddNewMenuItemModal"

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
  const [menus, setMenus] = useState([]);
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
                {/* <Button>Add New Item</Button> */}
                <AddNewMenuItemModal menus={menus} setMenus={setMenus} />
              </div>

              {
                menus?.length === 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-center text-gray-600">
                      Menu management interface will be implemented here
                    </p>
                  </div>
                )
              }

              {
                menus?.length > 0 && (
                  <div className='flex flex-col items-center gap-x-2 gap-y-2'>
                    {
                      menus?.map((item: any, i) => (
                        <div key={i} className='w-full grid grid-cols-4 gap-x-3 bg-gray-500/10 px-10 py-2'>
                          <p className='text-lg font-semibold'>Name: {item?.name}</p>
                          <p>Category: {item?.category}</p>
                          <p>BDT{item?.price}</p>
                          <p>Availability: {item?.available ? "In Stock" : "Out of Stock"}</p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export const AddNewMenuItemModal = ({ menus, setMenus }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [category, setCategory] = useState<String>("");
  const [image, setImage] = useState<String>("");
  const [dietaryInfo, setDietaryInfo] = useState<String>("");
  const [spiceLevel, setSpiceLevel] = useState<String>("");
  const [ingredients, setIngredients] = useState<String>("");
  const [price, setPrice] = useState<Number>(0);
  const [popularity, setPopularity] = useState<Number>(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setOpen(false);
    console.log({
      name, description, price, popularity, category, image, dietaryInfo, spiceLevel, ingredients, available: true
    })

    try {
      const res = await axios.post("/api/menu/create-new-menu", {
        name, description, price, popularity, category, image, dietaryInfo, spiceLevel, ingredients, available: true
      })

      const data = res?.data;

      if (data?.success) {
        setMenus([data?.data, ...menus])
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <React.Fragment>
        <button onClick={handleClickOpen} className='bg-[#4F46E7] text-white rounded-lg px-6 py-2'>
          Add New Item
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add New Menu Item"}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText> */}

            <form onSubmit={handleSubmit} className='w-[400px] lg:w-[500px] min-h-[250px]'>
              <div className='w-full flex flex-col gap-y-3'>
                <input
                  type='text'
                  placeholder='Item Name' className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setName(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Description'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setDescription(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Category'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setCategory(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Image'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setImage(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Dietery Info'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setDietaryInfo(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Spice Level'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setSpiceLevel(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Item Ingredients'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setIngredients(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Item Price in BDT'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setPrice(Number(e.target.value))}
                />
                <input
                  type='number'
                  placeholder='Item Popularity'
                  className='w-full py-2 px-2 rounded-md focus:outline focus:outline-[#4F46E7]  border-2 focus:border-[#4F46E7] border-neutral-500'
                  onChange={e => setPopularity(Number(e.target.value))}
                />
              </div>
              <div className='w-full flex items-center justify-end mt-2'>
                <button type='submit' className='bg-[#4F46E7] px-4 py-2 text-white rounded-md w-full'>Submit</button>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  )
}