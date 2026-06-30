import Header from '@/components/Header';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Alex Chen | Full-Stack Developer & System Architect',
  description: 'High-end developer portfolio showcasing expertise in full-stack development, cloud architecture, and scalable systems.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <TechStack />
      <Timeline />
      <About />
      <Footer />
    </main>
  );
}
