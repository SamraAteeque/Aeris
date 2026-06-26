import { useState } from 'react';
import LenisScroll from './components/ui/LenisScroll';
import Navigation from './components/ui/Navigation';
import ReservationModal from './components/ui/ReservationModal';
import CustomCursor from './components/ui/CustomCursor';

import HeroSection from './components/sections/HeroSection';
import StickyMedia from './components/sections/StickyMedia';
import EditorialText from './components/sections/EditorialText';
import ExperienceSection from './components/sections/ExperienceSection';
import ChefSection from './components/sections/ChefSection';
import MenuPreview from './components/sections/MenuPreview';
import AwardsSection from './components/sections/AwardsSection';
import GallerySection from './components/sections/GallerySection';
import ReservationSection from './components/sections/ReservationSection';
import Footer from './components/sections/Footer';

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);

  const openReservation  = () => setReservationOpen(true);
  const closeReservation = () => setReservationOpen(false);

  return (
    <LenisScroll>
      <CustomCursor />

      <Navigation onOpenReservation={openReservation} />

      <ReservationModal isOpen={reservationOpen} onClose={closeReservation} />

      <main className="bg-zinc-950 text-zinc-100 overflow-x-hidden">
        <HeroSection          onOpenReservation={openReservation} />
        <StickyMedia />
        <EditorialText />
        <ExperienceSection />
        <ChefSection />
        <MenuPreview />
        <AwardsSection />
        <GallerySection />
        <ReservationSection   onOpenReservation={openReservation} />
        <Footer               onOpenReservation={openReservation} />
      </main>
    </LenisScroll>
  );
}
