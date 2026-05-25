import { SignUpForm } from '@/components/auth/SignUpForm'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'

export default function SignUpPage() {
  return (
    <AuthSplitLayout
      title="Create your account"
      subtitle="Start building a premium digital menu experience in minutes."
    >
      <SignUpForm />
    </AuthSplitLayout>
  )
}