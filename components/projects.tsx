const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1.",
      technologies: ["React", "Node.js", "Express"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "A brief description of project 2.",
      technologies: ["Python", "Django", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "A brief description of project 3.",
      technologies: ["Vue.js", "Firebase"],
      link: "#",
    },
  ]

  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-surface rounded-lg shadow-md p-6 border border-color">
              <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
              <p className="text-secondary mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-accent text-surface text-sm py-1 px-2 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-block bg-primary text-surface py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
