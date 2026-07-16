import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Loading } from './components/Loading';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Courses } from './components/Courses';
import { AITutor } from './components/AITutor';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { SubjectThemeProvider } from './theme/SubjectTheme';

export default function App() {
  useScrollAnimation();

  return (
    <SubjectThemeProvider>
      <Loading />
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <AITutor />
      <Testimonials />
      <FAQ />
      <Footer />
      <ChatWidget />
    </SubjectThemeProvider>
  );
}
