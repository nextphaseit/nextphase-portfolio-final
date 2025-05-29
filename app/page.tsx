import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="py-20">
        <h1>Welcome to My Portfolio</h1>
        <p>A showcase of my work and skills.</p>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <h2>About Me</h2>
        <p>Learn more about my background and experience.</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <h2>Projects</h2>
        {/* Project cards or list will go here */}
      </section>

      {/* Add this section after the projects section */}
      <section id="testimonials" className="py-16">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <h2>Contact Me</h2>
        {/* Contact form or information will go here */}
      </section>
    </main>
  )
}
