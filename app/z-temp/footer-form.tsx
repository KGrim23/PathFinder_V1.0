'use client'

import { useState } from 'react'

const FooterForm = () => {
  const [result, setResult] = useState('')
  const [stage, setStage] = useState(0)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    setResult('Sending....')
    setStage(1)
    const formData = new FormData(event.target)

    formData.append('access_key', process.env.NEXT_PUBLIC_WEB_3_FORMS_API_KEY!)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      setResult('Form Submitted Successfully')
      setStage(2)
      event.target.reset()
      setTimeout(() => {
        setResult('')
        setStage(0)
      }, 3000)
    } else {
      console.log('Error', data)
      setResult(data.message)
      setStage(3)
    }
  }

  const getResult = (stage: number) => {
    switch (stage) {
      case 0:
        return 'gray'
      case 1:
        return 'blue'
      case 2:
        return 'green'
      case 3:
        return 'red'
      default:
        return 'gray'
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="flex flex-col items-start gap-3 md:justify-center">
            <div className="w-full">
              <label className="block text-sm sr-only" htmlFor="email">
                Enter your email
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-white form-input text-primary text-xs placeholder:text-primary placeholder:text-left placeholder:font-normal px-3 py-2.5 md:px-5 font-medium border-solid rounded-lg hover:bg-primary  hover:text-white hover:border-white"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white form-input text-primary px-3 py-1 md:px-5 font-medium text-sm border-solid rounded-lg hover:bg-primary  hover:text-white hover:border-white"
              aria-label="Get notified"
            >
              Suscribe now!
            </button>
          </div>
          {/* Form response message */}
          <p className={`mt-2 text-${getResult(stage)}-600 text-sm`}>
            {result}
          </p>
        </div>
      </div>
    </form>
  )
}

export default FooterForm
