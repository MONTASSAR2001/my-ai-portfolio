import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Autonomous Navigation System',
    description: 'Real-time SLAM and pathfinding algorithm for mobile robots in complex environments',
    tags: ['ROS', 'Python', 'Computer Vision', 'SLAM'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="80" fill="none" stroke="%2385c5ff" stroke-width="2" opacity="0.3"/%3E%3Cpath d="M 150 150 L 250 150 M 200 100 L 200 200" stroke="%2385c5ff" stroke-width="2" opacity="0.5"/%3E%3C/svg%3E)',
  },
  {
    title: 'Embedded AI Accelerator',
    description: 'FPGA-based neural network accelerator for real-time inference on edge devices',
    tags: ['FPGA', 'HLS', 'C++', 'TensorFlow'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Crect x="80" y="80" width="240" height="140" fill="none" stroke="%2385c5ff" stroke-width="2" opacity="0.4"/%3E%3Ccircle cx="150" cy="110" r="8" fill="%2385c5ff" opacity="0.6"/%3E%3Ccircle cx="250" cy="110" r="8" fill="%2385c5ff" opacity="0.6"/%3E%3C/svg%3E)',
  },
  {
    title: 'Robotic Arm Control',
    description: 'Inverse kinematics solver and trajectory planning for 6-DOF robotic manipulators',
    tags: ['Robotics', 'C++', 'ROS', 'Control Theory'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Cpolyline points="100,200 150,150 200,100 250,130 280,80" fill="none" stroke="%2385c5ff" stroke-width="2.5" opacity="0.5"/%3E%3Ccircle cx="100" cy="200" r="6" fill="%2385c5ff"/%3E%3Ccircle cx="150" cy="150" r="6" fill="%2385c5ff"/%3E%3Ccircle cx="200" cy="100" r="6" fill="%2385c5ff"/%3E%3C/svg%3E)',
  },
  {
    title: 'Computer Vision Pipeline',
    description: 'High-performance object detection and tracking using state-of-the-art deep learning models',
    tags: ['Python', 'OpenCV', 'PyTorch', 'CUDA'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Crect x="100" y="80" width="200" height="140" fill="none" stroke="%2385c5ff" stroke-width="2" opacity="0.3"/%3E%3Crect x="130" y="110" width="60" height="80" fill="none" stroke="%2385c5ff" stroke-width="2" opacity="0.6"/%3E%3Crect x="210" y="110" width="60" height="80" fill="none" stroke="%2385c5ff" stroke-width="2" opacity="0.6"/%3E%3C/svg%3E)',
  },
  {
    title: 'Sensor Fusion Engine',
    description: 'Multi-sensor integration using Kalman filters for robust state estimation',
    tags: ['Sensor Fusion', 'C++', 'ROS', 'Kalman Filter'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Ccircle cx="200" cy="150" r="5" fill="%2385c5ff" opacity="0.8"/%3E%3Cline x1="100" y1="100" x2="200" y2="150" stroke="%2385c5ff" stroke-width="1.5" opacity="0.4"/%3E%3Cline x1="300" y1="100" x2="200" y2="150" stroke="%2385c5ff" stroke-width="1.5" opacity="0.4"/%3E%3Cline x1="100" y1="200" x2="200" y2="150" stroke="%2385c5ff" stroke-width="1.5" opacity="0.4"/%3E%3Cline x1="300" y1="200" x2="200" y2="150" stroke="%2385c5ff" stroke-width="1.5" opacity="0.4"/%3E%3C/svg%3E)',
  },
  {
    title: 'Deep Learning Models',
    description: 'Custom neural network architectures for robotics applications and autonomous decision-making',
    tags: ['Deep Learning', 'PyTorch', 'Research', 'AI'],
    image: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23000a14" width="400" height="300"/%3E%3Ccircle cx="80" cy="150" r="8" fill="%2385c5ff" opacity="0.4"/%3E%3Ccircle cx="200" cy="100" r="8" fill="%2385c5ff" opacity="0.6"/%3E%3Ccircle cx="200" cy="150" r="8" fill="%2385c5ff" opacity="0.6"/%3E%3Ccircle cx="200" cy="200" r="8" fill="%2385c5ff" opacity="0.6"/%3E%3Ccircle cx="320" cy="150" r="8" fill="%2385c5ff" opacity="0.4"/%3E%3Cline x1="88" y1="150" x2="192" y2="108" stroke="%2385c5ff" stroke-width="1" opacity="0.2"/%3E%3Cline x1="88" y1="150" x2="192" y2="150" stroke="%2385c5ff" stroke-width="1" opacity="0.2"/%3E%3Cline x1="88" y1="150" x2="192" y2="192" stroke="%2385c5ff" stroke-width="1" opacity="0.2"/%3E%3C/svg%3E)',
  },
]

export default function ProjectsGrid() {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of complex technical projects showcasing expertise in embedded systems, autonomous navigation, and AI implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border/50 rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:glow-accent-subtle"
            >
              {/* Project Image */}
              <div
                className="h-40 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: project.image }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card opacity-40"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent/20 to-transparent transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-secondary/50 text-muted-foreground rounded border border-border/30 group-hover:border-accent/30 group-hover:text-accent/80 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
