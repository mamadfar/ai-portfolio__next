import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
        <nav className="max-w-3xl mx-auto flex gap-3 p-3">
            <Link href="/privacy">Privacy</Link>
        </nav>
    </footer>
  )
}

export default Footer