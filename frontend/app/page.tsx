import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 items-center">
      <div className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm">
          ABC INTERNATIONAL HOTEL • Internal ops
        </p>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Run bookings and rooms smoothly.
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl">
            Employee portal for ABC INTERNATIONAL HOTEL Stays to check availability, manage inventory, and keep guests moving through check-in without friction.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:brightness-110"
          >
            Go to Rooms
          </Link>
          <Link
            href="/booking-summary"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm sm:text-base font-semibold text-white/90 bg-white/5 transition hover:bg-white/10"
          >
            Booking Summary
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <InfoCard title="Live status" description="See occupancy, arrivals, and holds at a glance." />
          <InfoCard title="Fast actions" description="Confirm bookings, update rooms, and notify guests quickly." />
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 bg-gradient-to-r from-purple-700/30 to-pink-600/20 blur-3xl" aria-hidden />
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Ops overview</p>
              <p className="text-xl font-semibold text-white">What the team needs</p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">Live</span>
          </div>

          <ul className="space-y-3 text-white/80 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
              <div>
                <p className="font-semibold text-white">Inventory stays in sync</p>
                <p className="text-white/70">Rooms, rates, and holds update in real time.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-400" aria-hidden />
              <div>
                <p className="font-semibold text-white">Clear handoffs</p>
                <p className="text-white/70">Notes, arrivals, and payments visible to the desk team.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
              <div>
                <p className="font-semibold text-white">Reliable reporting</p>
                <p className="text-white/70">Keep an eye on occupancy, ADR, and pacing.</p>
              </div>
            </li>
          </ul>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 text-sm">
            <p className="font-semibold text-white">Questions?</p>
            <p>For urgent guest issues, contact the front desk manager directly .</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
};

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <p className="text-2xl font-bold text-white">{title}</p>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}
