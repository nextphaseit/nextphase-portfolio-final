const skillsData = [
  { name: "JavaScript", percentage: 90 },
  { name: "React", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "HTML", percentage: 95 },
  { name: "CSS", percentage: 90 },
  { name: "Python", percentage: 75 },
]

const Skills = () => {
  return (
    <section id="skills" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <div key={index} className="bg-surface rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium mb-2 text-primary">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
              </div>
              <p className="text-sm text-secondary text-right">{skill.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
