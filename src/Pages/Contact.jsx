import { useState } from "react";

import toast from "react-hot-toast";

import AxiosInstance from "../config/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
import { isEmail } from "../Utils/regexMatcher";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      toast.error("All fields are required!");
      return;
    }
    if (!isEmail(contactData.email)) {
      toast.error("Invalid email address!");
      return;
    }
    const formData = new FormData();
    formData.append("name", contactData.name);
    formData.append("email", contactData.email);
    formData.append("message", contactData.message);
    try {
      const response = await AxiosInstance.post("/contact", formData);
      if (response?.data?.success) {
        toast.success("Message sent successfully!");
        setContactData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-full w-full">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Contact Us</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-xl">
              Name
            </label>
            <input
              value={contactData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name!"
              type="text"
              id="name"
              name="name"
              className="bg-transparent px-2 py-1 border w-full border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-xl">
              Email
            </label>
            <input
              value={contactData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email!"
              type="text"
              id="email"
              name="email"
              className="bg-transparent px-2 py-1 border w-full  border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-semibold text-xl">
              Message
            </label>
            <textarea
              value={contactData.message}
              onChange={handleInputChange}
              placeholder="Enter Your Message!"
              id="message"
              name="message"
              className="bg-transparent px-2 py-1 border w-full h-40 resize-none border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-1 bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 ease-in-out cursor-pointer rounded py-2 font-semibold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};
export default Contact;
