import React from 'react';
import { Hero } from '../components/home/Hero';
import { StorySection } from '../components/story/StorySection';
import { ProgrammeSection } from '../components/programme/ProgrammeSection';
import { TeamSection } from '../components/team/TeamSection';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { LinksSection } from '../components/links/LinksSection';
import { SubscribeSection } from '../components/subscribe/SubscribeSection';

const HomePage: React.FC = () => (
  <main>
    <Hero />
    <StorySection />
    <ProgrammeSection />
    <TeamSection />
    <PhotoGallery />
    <LinksSection />
    <SubscribeSection />
  </main>
);

export default HomePage;
