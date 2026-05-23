import { SignInForm } from '@/components/auth/SigninForm'
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <SignInForm />
      </div>
    </div>
  )
}
