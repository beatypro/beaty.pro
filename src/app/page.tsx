import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </main>
  );
}
