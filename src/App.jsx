import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-center space-x-4 p-4 bg-veeraBlue text-white">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("dna")}>Our DNA</button>
        <button onClick={() => setPage("contact")}>Contact</button>
        <button onClick={() => setPage("faqs")}>FAQs</button>
      </nav>

      {page === "home" && (
        <motion.section className="p-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold text-veeraBlue">Welcome to Veera Foundation</h1>
          <p className="mt-4 text-lg text-gray-700">
            This is the colorful alternate version of the site. Replace this placeholder with the full code from the canvas.
          </p>
        </motion.section>
      )}
    </div>
  );
}
