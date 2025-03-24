import { useState } from "react";
import { addMachine } from "../api/machinesApi";
import useMachineStore from "../store/useMachineStore";

const MachineForm = () => {
  const { fetchAllMachines } = useMachineStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    lastMaintenance: "",
    nextMaintenance: "",
    status: "",
    photoUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMachine(formData);
      fetchAllMachines();
      alert("Machine added successfully!");
      setFormData({
        name: "",
        description: "",
        location: "",
        lastMaintenance: "",
        nextMaintenance: "",
        status: "",
        photoUrl: "",
      });
    } catch (error) {
      console.error("Error adding machine:", error);
      alert("Failed to add machine.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[5px]-lg mx-auto w-full space-y-6 bg-white p-6 dark:bg-[#212121]"
      autoComplete="off"
    >
      {/* <h2 className="text-center text-xl font-semibold">Add New Machine</h2> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="">
          <label className="block font-medium">Machine Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter machine name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Enter image URL"
            value={formData.photoUrl}
            onChange={handleChange}
            className="w-full rounded border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="block font-medium">Last Maintenance</label>
          <input
            type="date"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
            className="w-full rounded border-none bg-[#a1abae] p-2 text-black text-opacity-50 transition-all duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Next Maintenance</label>
          <input
            type="date"
            name="nextMaintenance"
            value={formData.nextMaintenance}
            onChange={handleChange}
            className="w-full rounded border-none bg-[#a1abae] p-2 text-black text-opacity-50 transition-all duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-[11px] text-black text-opacity-50 transition-all duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-[5px] border-none bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
      >
        Add Machine
      </button>
    </form>
  );
};

export default MachineForm;
