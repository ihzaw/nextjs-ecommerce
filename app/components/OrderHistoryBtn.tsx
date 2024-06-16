"use client"

import { useContext } from "react"
import { LoginContext } from "../providers/LoginProvider"
import Link from "next/link"

const OrderHistoryBtn = () => {
  const { isLoggedIn } = useContext(LoginContext)

  if (!isLoggedIn) {
    return
  }

  return (
    <Link href="/history" className="btn btn-secondary btn-sm text-white font-normal">Order History</Link>
  )
}

export default OrderHistoryBtn