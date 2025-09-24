import React, { useState, useEffect, useRef } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import CommanHeader from "../../components/CommanHeader";
import TableSkeleton from "./Skeleton";
import Swal from "sweetalert2";

const PurchaseRequisition = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requisitionId, setRequisitionId] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [requirement, setRequirement] = useState("");
  const [details, setDetails] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEnable, setIsEnable] = useState(true);
  const [editingRequisition, setEditingRequisition] = useState(null);
  const [errors, setErrors] = useState({}); // New state for field-specific errors
  const sliderRef = useRef(null);

  // Static data
  const staticData = [
    {
      _id: "1",
      requisitionId: "REQ001",
      date: "2025-09-01",
      department: "IT",
      employee: "John Doe",
      requirement: "Laptops",
      details: "High-performance laptops for development team",
      items: [{ name: "Dell XPS 15", qty: 5 }],
      category: "Electronics",
      quantity: 5,
      isEnable: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      requisitionId: "REQ002",
      date: "2025-09-15",
      department: "HR",
      employee: "Jane Smith",
      requirement: "Office Supplies",
      details: "Stationery for new hires",
      items: [{ name: "Pens", qty: 50 }, { name: "Notebooks", qty: 50 }],
      category: "Stationery",
      quantity: 100,
      isEnable: false,
      createdAt: new Date().toISOString(),
    },
  ];

  // Format date for display
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};


  // Load static data on mount
  useEffect(() => {
    setLoading(true);
    setRequisitions(staticData);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Reset form fields
  const resetForm = () => {
    setRequisitionId("");
    setDate("");
    setDepartment("");
    setEmployee("");
    setRequirement("");
    setDetails("");
    setItemsList([]);
    setItemName("");
    setItemQuantity("");
    setCategory("");
    setQuantity("");
    setIsEnable(true);
    setEditingRequisition(null);
    setErrors({});
    setIsSliderOpen(false);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const trimmedRequisitionId = requisitionId.trim();
    const trimmedDepartment = department.trim();
    const trimmedEmployee = employee.trim();
    const trimmedRequirement = requirement.trim();
    const trimmedDetails = details.trim();
    const trimmedCategory = category.trim();
    const parsedQuantity = parseInt(quantity, 10);

    if (!trimmedRequisitionId) newErrors.requisitionId = "Requisition ID is required";
    if (!date) newErrors.date = "Date is required";
    if (!trimmedDepartment) newErrors.department = "Department is required";
    if (!trimmedEmployee) newErrors.employee = "Employee is required";
    if (!trimmedRequirement) newErrors.requirement = "Requirement is required";
    if (!trimmedDetails) newErrors.details = "Details are required";
    if (!trimmedCategory) newErrors.category = "Category is required";
    if (itemsList.length === 0) newErrors.itemsList = "At least one item is required";
    if (!quantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      newErrors.quantity = "Total quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleAddClick = () => {
    resetForm();
    setIsSliderOpen(true);
  };

  const handleEditClick = (requisition) => {
    setEditingRequisition(requisition);
    setRequisitionId(requisition.requisitionId);
    setDate(formatDate(requisition.date));
    setDepartment(requisition.department);
    setEmployee(requisition.employee);
    setRequirement(requisition.requirement);
    setDetails(requisition.details || "");
    setItemsList(requisition.items);
    setItemName("");
    setItemQuantity("");
    setCategory(requisition.category);
    setQuantity(requisition.quantity);
    setIsEnable(requisition.isEnable);
    setErrors({});
    setIsSliderOpen(true);
  };

  const handleAddItem = () => {
    const trimmedItemName = itemName.trim();
    const parsedItemQuantity = parseInt(itemQuantity, 10);

    if (!trimmedItemName || !itemQuantity || isNaN(parsedItemQuantity) || parsedItemQuantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Item",
        text: "Please enter a valid item name and a positive quantity.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setItemsList([...itemsList, { name: trimmedItemName, qty: parsedItemQuantity }]);
    setItemName("");
    setItemQuantity("");
    setErrors((prev) => ({ ...prev, itemsList: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Missing or Invalid Fields",
        html: `Please correct the following errors:<br/><ul class='list-disc pl-5'>${Object.values(errors)
          .map((err) => `<li>${err}</li>`)
          .join("")}</ul>`,
        confirmButtonColor: "#d33",
      });
      return;
    }

    const newRequisition = {
      _id: editingRequisition ? editingRequisition._id : Date.now().toString(),
      requisitionId: requisitionId.trim(),
      date,
      department: department.trim(),
      employee: employee.trim(),
      requirement: requirement.trim(),
      details: details.trim(),
      items: itemsList,
      category: category.trim(),
      quantity: parseInt(quantity, 10),
      isEnable,
      createdAt: new Date().toISOString(),
    };

    if (editingRequisition) {
      setRequisitions(
        requisitions.map((r) =>
          r._id === editingRequisition._id ? newRequisition : r
        )
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Requisition updated successfully.",
        confirmButtonColor: "#3085d6",
      });
    } else {
      setRequisitions([...requisitions, newRequisition]);
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Requisition added successfully.",
        confirmButtonColor: "#3085d6",
      });
    }

    resetForm();
  };

  const handleToggleEnable = (requisition) => {
    setRequisitions(
      requisitions.map((r) =>
        r._id === requisition._id ? { ...r, isEnable: !r.isEnable } : r
      )
    );
    Swal.fire({
      icon: "success",
      title: `Requisition ${!requisition.isEnable ? "enabled" : "disabled"}.`,
      confirmButtonColor: "#3085d6",
    });
  };

  const handleDelete = (id) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        actions: "space-x-2",
        confirmButton:
          "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300",
        cancelButton:
          "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300",
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setRequisitions(requisitions.filter((r) => r._id !== id));
          swalWithTailwindButtons.fire(
            "Deleted!",
            "Requisition deleted successfully.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire(
            "Cancelled",
            "Requisition is safe 🙂",
            "error"
          );
        }
      });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <CommanHeader />
      <div className="px-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-newPrimary">
              Purchase Requisition Details
            </h1>
          </div>
          <button
            className="bg-newPrimary text-white px-4 py-2 rounded-lg hover:bg-newPrimary/80"
            onClick={handleAddClick}
          >
            + Add Requisition
          </button>
        </div>

        <div className="rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="inline-block min-w-[1200px] w-full align-middle">
                <div className="hidden lg:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_3fr_1fr_1fr] gap-6 bg-gray-100 py-3 px-6 text-xs font-semibold text-gray-600 uppercase sticky top-0 z-10 border-b border-gray-200">
                  <div>Requisition ID</div>
                  <div>Department</div>
                  <div>Employee</div>
                  <div>Requirement</div>
                  <div>Category</div>
                  <div>Items</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>

                <div className="flex flex-col divide-y divide-gray-100">
                  {loading ? (
                    <TableSkeleton
                      rows={3}
                      cols={10}
                      className="lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_3fr_1fr_auto]"
                    />
                  ) : requisitions.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 bg-white">
                      No requisitions found.
                    </div>
                  ) : (
                    requisitions.map((requisition) => (
                      <div
                        key={requisition._id}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_3fr_1fr_1fr] items-center gap-6 px-6 py-4 text-sm bg-white hover:bg-gray-50 transition"
                      >
                        <div className="font-medium text-gray-900">
                          {requisition.requisitionId}
                        </div>
                        <div className="text-gray-600">{requisition.department}</div>
                        <div className="text-gray-600">{requisition.employee}</div>
                        <div className="text-gray-600">{requisition.requirement}</div>
                        <div className="text-gray-600">{requisition.category}</div>
                        <div className="text-gray-600">
                          <div className="flex flex-wrap gap-2">
                            {requisition.items.map((item, idx) => (
                              <div key={idx} className="flex gap-2">
                                <span
                                  className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    backgroundColor: `hsl(${(idx * 70) % 360}, 80%, 85%)`,
                                    color: `hsl(${(idx * 70) % 360}, 40%, 25%)`,
                                  }}
                                >
                                  {item.name}
                                </span>
                                <span
                                  className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    backgroundColor: `hsl(${(idx * 70 + 35) % 360}, 80%, 85%)`,
                                    color: `hsl(${(idx * 70 + 35) % 360}, 40%, 25%)`,
                                  }}
                                >
                                  Qty: {item.qty}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-gray-500">{formatDate(requisition.date)}</div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(requisition)}
                            className="px-3 py-1 text-sm rounded text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <SquarePen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(requisition._id)}
                            className="px-3 py-1 text-sm rounded text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSliderOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end z-50">
            <div
              ref={sliderRef}
              className="w-full max-w-md bg-white p-4 h-full overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-newPrimary">
                  {editingRequisition ? "Update Requisition" : "Add a New Requisition"}
                </h2>
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700"
                  onClick={resetForm}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Requisition ID <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={requisitionId}
                    onChange={(e) => setRequisitionId(e.target.value)}
                    readOnly={!!editingRequisition}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.requisitionId
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    placeholder="Enter requisition ID"
                    required
                  />
                  {errors.requisitionId && (
                    <p className="text-red-500 text-xs mt-1">{errors.requisitionId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    required
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.department
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Procurement">Procurement</option>
                    <option value="IT">IT</option>
                    <option value="Admin">Admin</option>
                    <option value="Operations">Operations</option>
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.employee
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    required
                  >
                    <option value="">Select Employee</option>
                    <option value="Ali">Ali</option>
                    <option value="Ayesha">Ayesha</option>
                    <option value="Ahmed">Ahmed</option>
                    <option value="Fatima">Fatima</option>
                    <option value="Usman">Usman</option>
                  </select>
                  {errors.employee && (
                    <p className="text-red-500 text-xs mt-1">{errors.employee}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Requirement <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.requirement
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    required
                  >
                    <option value="">Select Requirement</option>
                    <option value="Regular Purchase">Regular Purchase</option>
                    <option value="Emergency Purchase">Emergency Purchase</option>
                    <option value="One-time Purchase">One-time Purchase</option>
                    <option value="Bulk Purchase">Bulk Purchase</option>
                  </select>
                  {errors.requirement && (
                    <p className="text-red-500 text-xs mt-1">{errors.requirement}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.details
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    placeholder="Enter requisition details"
                    rows="3"
                    required
                  />
                  {errors.details && (
                    <p className="text-red-500 text-xs mt-1">{errors.details}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.category
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Stationery">Stationery</option>
                    <option value="IT Equipment">IT Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Total Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.quantity
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-newPrimary"
                    }`}
                    placeholder="Enter total quantity"
                    min="1"
                    required
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-2">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newPrimary"
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-2">
                        Item Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newPrimary"
                        placeholder="Enter item quantity"
                        min="1"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="w-16 h-12 bg-newPrimary text-white rounded-lg hover:bg-newPrimary/80 transition"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                  {errors.itemsList && (
                    <p className="text-red-500 text-xs mt-1">{errors.itemsList}</p>
                  )}

                  {itemsList.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                          <tr>
                            <th className="px-4 py-2 border-b">Sr #</th>
                            <th className="px-4 py-2 border-b">Item Name</th>
                            <th className="px-4 py-2 border-b">Quantity</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                          {itemsList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border-b text-center">{idx + 1}</td>
                              <td className="px-4 py-2 border-b">{item.name}</td>
                              <td className="px-4 py-2 border-b text-center">{item.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">Status</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEnable(!isEnable)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        isEnable ? "bg-newPrimary/80" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isEnable ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${
                        isEnable ? "text-newPrimary" : "text-gray-500"
                      }`}
                    >
                      {isEnable ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-newPrimary text-white px-4 py-3 rounded-lg hover:bg-newPrimary/80 transition-colors disabled:bg-blue-300"
                >
                  {loading
                    ? "Saving..."
                    : editingRequisition
                    ? "Update Requisition"
                    : "Save Requisition"}
                </button>
              </form>
            </div>
          </div>
        )}

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #edf2f7;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #a0aec0;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #718096;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PurchaseRequisition;