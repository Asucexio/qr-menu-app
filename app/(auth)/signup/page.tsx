import { SignUpForm } from '../../../components/auth/SignUpForm'
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <SignUpForm />
      </div>
    </div>
  )
}
