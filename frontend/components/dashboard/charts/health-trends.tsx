"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HealthRecord {
  id: number;
  user_id: number;
  sleep_hours: number | null;
  cycle_day: number | null;
  tracking_date: string;
  mood: number | null;
  activity_level: string | null;
}

interface HealthTrendsProps {
  records: HealthRecord[];
}

export function HealthTrends({
  records,
}: HealthTrendsProps) {
  /*
   * Backend returns newest → oldest.
   *
   * Charts should display:
   * oldest → newest
   */
  const chartData = [...records]
    .reverse()
    .map((record) => ({
      date: new Date(
        record.tracking_date
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),

      mood: record.mood,

      sleep:
        record.sleep_hours !== null
          ? Number(record.sleep_hours)
          : null,
    }));

  if (records.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#332532]">
          Health Trends
        </h2>

        <div className="mt-6 rounded-xl bg-[#fff8fb] p-8 text-center">
          <p className="font-medium text-[#4d3a4a]">
            No health history yet
          </p>

          <p className="mt-2 text-sm text-[#76566f]">
            Start recording your mood and sleep to
            see your health trends here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-[#332532]">
        Health Trends
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ==============================
            MOOD TREND
        ============================== */}

        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div>
            <h3 className="text-lg font-semibold text-[#332532]">
              Mood Trend
            </h3>

            <p className="mt-1 text-sm text-[#76566f]">
              Your recorded mood over time
            </p>
          </div>

          <div className="mt-6 h-[280px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  strokeWidth={3}
                  connectNulls
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          <p className="mt-3 text-xs text-[#8b7285]">
            Mood is recorded on a scale from 1 to 5.
          </p>

        </div>


        {/* ==============================
            SLEEP TREND
        ============================== */}

        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div>
            <h3 className="text-lg font-semibold text-[#332532]">
              Sleep Trend
            </h3>

            <p className="mt-1 text-sm text-[#76566f]">
              Your recorded sleep duration
            </p>
          </div>

          <div className="mt-6 h-[280px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep"
                  strokeWidth={3}
                  connectNulls
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          <p className="mt-3 text-xs text-[#8b7285]">
            Sleep duration is shown in hours.
          </p>

        </div>

      </div>
    </section>
  );
}