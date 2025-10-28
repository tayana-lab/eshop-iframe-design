import Link from "next/link"
import { CreditCard, Smartphone, Wifi, FileText } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">eShop Services</h1>
          <p className="mt-3 text-lg text-muted-foreground">Select a service to get started</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Airtime Purchase Card */}
          <Link
            href="/airtime"
            className="group overflow-hidden rounded-3xl bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary transition-transform group-hover:scale-110">
              <CreditCard className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="mb-3 text-center text-2xl font-bold text-card-foreground">Airtime Purchase</h2>
            <p className="text-center text-muted-foreground">
              Recharge your mobile with credit, local talktime, or jumbo booster packages
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all group-hover:shadow-md">
                Get Started →
              </span>
            </div>
          </Link>

          {/* Mobile Booster Card */}
          <Link
            href="/mobile-booster"
            className="group overflow-hidden rounded-3xl bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary transition-transform group-hover:scale-110">
              <Smartphone className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="mb-3 text-center text-2xl font-bold text-card-foreground">Mobile Booster</h2>
            <p className="text-center text-muted-foreground">
              Boost your mobile with data or voice packages for enhanced connectivity
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all group-hover:shadow-md">
                Get Started →
              </span>
            </div>
          </Link>

          {/* Broadband Card */}
          <Link
            href="/broadband"
            className="group overflow-hidden rounded-3xl bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary transition-transform group-hover:scale-110">
              <Wifi className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="mb-3 text-center text-2xl font-bold text-card-foreground">Broadband</h2>
            <p className="text-center text-muted-foreground">
              Purchase giga booster packages for your broadband connection
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all group-hover:shadow-md">
                Get Started →
              </span>
            </div>
          </Link>

          {/* Bill Pay Card */}
          <Link
            href="/bill-pay"
            className="group overflow-hidden rounded-3xl bg-card p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary transition-transform group-hover:scale-110">
              <FileText className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="mb-3 text-center text-2xl font-bold text-card-foreground">Bill Pay</h2>
            <p className="text-center text-muted-foreground">
              Pay your bills quickly and securely with your account number
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all group-hover:shadow-md">
                Get Started →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
