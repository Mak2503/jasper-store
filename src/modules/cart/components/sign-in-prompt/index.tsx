import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white items-start justify-between">
      <div>
        <h2 className="text-lg">Already have an account?</h2>
        <p className="text-xs text-gray-700 my-2">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a>
            <Button variant="secondary">Sign in</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
