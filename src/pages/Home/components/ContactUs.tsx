export default function ContactUs() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto grid items-center justify-center gap-8 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
              Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="p-4">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200 min-h-[150px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  