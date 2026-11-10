import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-10 relative">
      <div className="w-full max-w-3xl">
        {/* Header & Back Button */}
        <div className="w-full max-w-[380px] mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#facc15] transition-all text-sm"
          >
            <span>←</span> Back
          </Link>
        </div>

        <div className="relative w-fit mb-12">
          <div className="absolute top-3.5 left-3.5 w-full h-full bg-yellow-400" />
          <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-8 pr-16">
            <div className="w-14 h-14 rounded-full border-[3px] border-neutral-100 flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 stroke-neutral-100"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h1 className="font-bold text-3xl tracking-tight text-neutral-100 mb-1">
              Contact Me
            </h1>
            <p className="text-sm font-medium text-neutral-400">
              Contact me through this section
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative w-full">
          <div className="absolute top-3.5 left-3.5 w-full h-full bg-yellow-400" />
          <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-8">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Input Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-black border-[3px] border-neutral-700 p-3 text-neutral-100 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                  placeholder="Input your name"
                />
              </div>

              {/* Input Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-black border-[3px] border-neutral-700 p-3 text-neutral-100 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                  placeholder="address@email.com"
                />
              </div>

              {/* Input Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Note
                </label>
                <textarea
                  rows="5"
                  className="bg-black border-[3px] border-neutral-700 p-3 text-neutral-100 focus:outline-none focus:border-yellow-400 transition-colors font-medium resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 mt-2 border-[3px] border-neutral-100 bg-neutral-900 text-neutral-100 font-bold text-lg uppercase tracking-widest hover:bg-yellow-400 hover:text-black hover:border-black transition-colors"
              >
                Send
              </button>
            </form>

            <hr className="border-t-2 border-neutral-800 my-8" />

            {/* Social Links & Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  Location
                </span>
                <span className="font-bold text-neutral-100">
                  Medan, Indonesia
                </span>
              </div>

              <div className="flex flex-col gap-1 md:text-right">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  GitHub
                </span>
                <a
                  href="https://github.com/LilFloppa69"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-yellow-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  github.com/LilFloppa69
                  <span className="text-lg leading-none mb-[2px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
