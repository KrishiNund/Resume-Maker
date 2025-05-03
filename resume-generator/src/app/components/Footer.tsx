export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ResumeGen. All rights reserved.
          </p>
          <div className="mt-4">
            <a href="/privacy" className="text-sm hover:text-blue-400 mx-3">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:text-blue-400 mx-3">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    )
}  