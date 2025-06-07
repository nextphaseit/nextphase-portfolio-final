import type React from "react"

interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-surface rounded-lg shadow-md p-6 border border-color">
      <div className="flex items-center mb-4">
        <div className="mr-4">{icon}</div>
        <h3 className="text-secondary text-sm font-semibold">{label}</h3>
      </div>
      <p className="text-primary text-2xl font-bold">{value}</p>
    </div>
  )
}

interface StatsProps {
  data: {
    label: string
    value: string
    icon: React.ReactNode
  }[]
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <StatCard key={index} label={item.label} value={item.value} icon={item.icon} />
      ))}
    </div>
  )
}

export default Stats
