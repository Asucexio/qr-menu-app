import { SignInForm } from '@/components/auth/SigninForm'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'

export default function SignInPage() {
  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to manage menus, QR codes, and restaurant insights."
    >
      <SignInForm />
    </AuthSplitLayout>
  )
}