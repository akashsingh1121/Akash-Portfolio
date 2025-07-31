"use client"

import { useState } from "react"
import { ImLocation2 } from "react-icons/im"
import { MdEmail } from "react-icons/md"
import { IoCallSharp } from "react-icons/io5"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Reset status when user starts typing
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus((prev) => ({ ...prev, submitting: true }))

    try {
      const response = await fetch("https://formspree.io/f/xrblzvzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Thank you! Your message has been sent successfully." },
        })
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Sorry, there was an error sending your message. Please try again." },
      })
    }
  }

  return (
    <footer className="bg-black min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12" id="contact">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h3 className="text-lime-500 font-bold tracking-widest text-xl sm:text-2xl cursor-pointer">CONTACT</h3>
          <h4 className="text-white font-semibold tracking-widest text-lg sm:text-xl mt-2 cursor-pointer">
            I'd Love To Hear From You.
          </h4>
          <p className="text-lime-500 text-base sm:text-lg mt-8 cursor-pointer">Feel free to Contact Me:</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none focus:border-white py-3 text-lg"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none focus:border-white py-3 text-lg"
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none focus:border-white py-3 text-lg"
            />
          </div>
          <div>
            <textarea
              rows={5}
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full bg-black text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none focus:border-white py-3 text-lg resize-none"
            />
          </div>

          {/* Status Messages */}
          {status.info.msg && (
            <div className={`text-center py-2 ${status.info.error ? "text-red-400" : "text-green-400"}`}>
              {status.info.msg}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={status.submitting}
              className={`w-full font-bold text-lg sm:text-xl tracking-widest px-6 py-3 transition-colors duration-300 ${
                status.submitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : status.submitted
                    ? "bg-green-500 text-white"
                    : " bg-lime-500 text-black hover:bg-white"
              }`}
            >
              {status.submitting ? "SENDING..." : status.submitted ? "SENT!" : "SUBMIT"}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-white text-center cursor-pointer">
            <ImLocation2 size={44} className="mx-auto mb-4" />
            <h4 className="text-lime-500 font-bold tracking-widest mb-2 ">WHERE TO FIND ME</h4>
            <p>
              Ahmedabad Gujarat <br />
              India
            </p>
          </div>
          <div className="text-white text-center cursor-pointer">
            <MdEmail size={44} className="mx-auto mb-4" />
            <h4 className="text-lime-500 font-bold tracking-widest mb-2">EMAIL ME AT</h4>
            <p>akashsingh4g4h@gmail.com</p>
          </div>
          <div className="text-white text-center cursor-pointer">
            <IoCallSharp size={44} className="mx-auto mb-4" />
            <h4 className="text-lime-500 font-bold tracking-widest mb-2">CALL ME AT</h4>
            <p>Phone: (+91 6251577079)</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ContactForm
