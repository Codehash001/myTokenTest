import { useForm, ValidationError } from "@formspree/react";


export default function Contact(){

const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);
    return(

      <div className="hidden md:flex md:flex-row flex-col items-center" id="contact">
        <h1 className="md:mt-0 mt-6 mx-4 md:text-4xl text-[22px] font-Archivo font-medium text-black dark:text-white">
          <span className="text-[32px] bg-gradient-to-r from-pink-500 via-red-600 to-red-800 bg-clip-text text-transparent">Tell us a bit about youself...</span>
          <br/><span>We will get in touch as soon as possible</span>
        </h1>

        <div class="p-6 rounded-lg shadow-lg bg-white/40 backdrop-blur-md filter w-[600px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500"
        >
          <h1 className="text-2xl font-bold dark:text-gray-50">
            Send a message
          </h1>

          <label
            htmlFor="fullname"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Full name<span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          />
         

          <label
            htmlFor="email"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
          >
            E-mail<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
           
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          

          <label
            htmlFor="subject"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
          >
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          />
         
          <label
            htmlFor="message"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
          >
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          
          <div className="flex flex-row items-center justify-start">
            <button
              type="submit"
              className="px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
              disabled={state.submitting}
              >
              Submit
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-cyan-500 ml-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div className="my-2 text-sm text-gray-400">{state.succeeded ? "Thanks for your submission!": ''}</div>
            <ValidationError errors={state.errors} />

          </div>
        </form>
      </div>
      </div>


     
    )
}
