import { useState } from "react";
import { addMachine } from "../../api/machinesApi";
import useMachineStore from "../../store/useMachineStore";

const MachineForm = () => {
  const { fetchAllMachines } = useMachineStore();
  const [formData, setFormData] = useState({
    // name: "",
    description: "",
    location: "",
    lastMaintenanceDateTime: "",
    nextMaintenanceDateTime: "",
    status: "",
    // photoUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      lastMaintenanceDateTime: formData.lastMaintenanceDateTime
        ? new Date(formData.lastMaintenanceDateTime).toISOString()
        : null,
      nextMaintenanceDateTime: formData.nextMaintenanceDateTime
        ? new Date(formData.nextMaintenanceDateTime).toISOString()
        : null,
    };
    console.log("🔍 Sending object to backend:", formattedData);
    try {
      await addMachine(formattedData);
      fetchAllMachines();
      setFormData({
        // name: "",
        description: "",
        location: "",
        lastMaintenanceDateTime: "",
        nextMaintenanceDateTime: "",
        status: "",
        // photoUrl: "",
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
        {/* <div className=""> */}
        {/*   <label className="block font-medium">Machine Name</label> */}
        {/*   <input */}
        {/*     type="text" */}
        {/*     name="name" */}
        {/*     placeholder="Enter machine name" */}
        {/*     value={formData.name} */}
        {/*     onChange={handleChange} */}
        {/*     required */}
        {/*     className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]" */}
        {/*   /> */}
        {/* </div> */}
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
        {/* <div> */}
        {/*   <label className="block font-medium">Photo URL</label> */}
        {/*   <input */}
        {/*     type="text" */}
        {/*     name="photoUrl" */}
        {/*     placeholder="Enter image URL" */}
        {/*     value={formData.photoUrl} */}
        {/*     onChange={handleChange} */}
        {/*     className="w-full rounded border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]" */}
        {/*   /> */}
        {/* </div> */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="block font-medium">Last Maintenance</label>
          <input
            type="date"
            name="lastMaintenanceDateTime"
            value={formData.lastMaintenanceDateTime}
            onChange={handleChange}
            className="w-full rounded border-none bg-[#a1abae] p-2 text-black text-opacity-50 transition-all duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Next Maintenance</label>
          <input
            type="date"
            name="nextMaintenanceDateTime"
            value={formData.nextMaintenanceDateTime}
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
            <option value="OPERATIONAL">Operational</option>
            <option value="UNDER_MAINTENANCE">Under Maintenance</option>
            <option value="OUT_OF_SERVICE">Out of Service</option>
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
