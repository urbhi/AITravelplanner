import React from "react";

function Footer() {
    const currentDate = new Date(); // Create a new Date object
    const year = currentDate.getFullYear(); // Get the current year
    const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <footer className="bg-gray-800 text-white py-6">
      

     
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm text-gray-400">
      Today is {day}, © {year}AI Trip Planner. Created By Surbhi Singh.
      </div>
    </footer>
  );
}

export default Footer;
