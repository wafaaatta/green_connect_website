import { Send } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BiEnvelope } from "react-icons/bi"
import { useAppDispatch } from "../../../hooks/hooks"
import { showNotification } from "../../../redux/stores/notification_store"
import axiosHttp from "../../../utils/axios_client"

const ContactSection = () => {
    const {t} = useTranslation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      name,
      email,
      message
    }
    
    try{
      await axiosHttp.post('/contact-submissions', data)
      dispatch(showNotification({ message: t('homePage.messageSentSuccess'), type: 'success'  }))
    }catch(error){
      console.error(error)
      dispatch(showNotification({ message: t('homePage.messageSentFail'), type: 'error' }))
    }
  }

  return (
    <section className="w-full py-12 bg-gray-100">
        <div className=" mx-auto flex items-center max-md:flex-col justify-center gap-4 px-4 md:px-6">
          <div className="space-y-3 text-center flex flex-col items-center justify-start">
            <BiEnvelope className="h-28 max-md:h-20 w-28 max-md:w-20 text-green-800" />
            <h2 className="text-4xl font-bold tracking-tight md:text-4xl">{t('homePage.getInTouch')}</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
                {t('homePage.contactDescription')}
              </p>
          </div>
          <div className="w-full max-w-3xl mx-auto bg-green-100 rounded shadow border">
            <div className="p-4">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t('homePage.yourName')}
                  </label>
                  <input
                    aria-label="Name"
                    id="name"
                    placeholder={t('homePage.enterYourName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t('homePage.email')}
                  </label>
                  <input
                    aria-label="Email"
                    id="email"
                    type="email"
                    placeholder={t('homePage.enterYourEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    {t('homePage.message')}
                  </label>
                  <textarea
                    aria-label="Message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('homePage.tellUsHowWeCanHelp')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-200 min-h-[150px]"
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    aria-label="Submit"
                    type="submit"
                    className="flex justify-between items-center px-6 py-2 font-medium text-white bg-green-700 transition duration-300 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    <span>{t('homePage.submit')}</span>
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ContactSection