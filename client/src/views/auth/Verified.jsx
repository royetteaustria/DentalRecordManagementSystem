import announce from '../../assets/img/auth/Email campaign-amico.png'

const Verified = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-xl font-bold text-primary">Check your Email</h2>
          <p className="mb-2 text-lg text-black">We’ve sent you a verification link to your email address <span className="font-medium text-primary">****@gmail.com</span>.</p>
          <img src={announce} alt="Email Logo"/>
        </div>
      </div>
  )
}

export default Verified