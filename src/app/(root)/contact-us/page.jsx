"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
// import MapComponent from "@/components/MapComponent";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <Header />
      <section className="header-height">
        <div className="wrapper section-py !pt-20 space-y-4">
          <h1 className="text2 text-center font-semibold">Contact Us</h1>
          <div className="pt-4 space-y-6">
            <div className="space-y-2">
              <h2 className="text3 font-bold">Leave a Message</h2>
              <div className="h-2 w-full max-w-md bg-white relative rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-primary w-[70%]" />
              </div>
            </div>
            <p className="text-lg">
              If you have any questions please send us a message using the
              adjacent form and we will get back to you as soon as possible.
            </p>
            <form className="grid grid-cols-1 gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    className="bg-white text-black p-3 outline-none rounded-2xl w-full"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="bg-white text-black p-3 outline-none rounded-2xl w-full"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="email"
                    className="bg-white text-black p-3 outline-none rounded-2xl w-full"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    className="bg-white text-black p-3 outline-none rounded-2xl w-full"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div>
                <textarea
                  rows="5"
                  className="bg-white text-black p-3 outline-none rounded-2xl w-full"
                  placeholder="Phone Number"
                />
              </div>
              <button
                type="submit"
                className="primary-btn !rounded-full w-[10rem]"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="py-8">
            <MapComponent />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
