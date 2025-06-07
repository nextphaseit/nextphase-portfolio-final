interface SkillProps {
  name: string
  description: string
}

function SkillItem({ name, description }: SkillProps) {
  return (
    <div className="bg-surface rounded-lg p-6 border border-color hover:border-primary/40 transition-colors shadow-md">
      <h3 className="text-lg font-semibold text-primary mb-3">{name}</h3>
      <p className="text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export function Skills() {
  const skills = [
    {
      name: "Cloud Solutions Deployment",
      description:
        "Expertise in Microsoft 365, SharePoint, and Azure migrations for scalable, secure business environments.",
    },
    {
      name: "Custom Web Development",
      description:
        "Building responsive, SEO-optimized websites tailored to client needs using modern frameworks and hosting platforms.",
    },
    {
      name: "IT Systems Integration",
      description:
        "Connecting business applications, services, and automation workflows to improve efficiency and data flow.",
    },
    {
      name: "Cybersecurity & Compliance",
      description:
        "Implementing secure access controls, data protection strategies, and compliance solutions (HIPAA, GDPR, etc.).",
    },
    {
      name: "Workflow Automation",
      description:
        "Designing Power Automate flows and Power Apps to streamline operations like onboarding, service requests, and approvals.",
    },
    {
      name: "Technical Support & Training",
      description:
        "Providing end-user support, documentation, and training to help businesses confidently adopt new technologies.",
    },
  ]

  return (
    <section className="py-16 bg-background" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">Skills</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Comprehensive technical expertise focused on helping small businesses leverage modern technology solutions
            for growth, security, and operational efficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillItem key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
