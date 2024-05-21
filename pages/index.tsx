import React, { useState, useEffect, Suspense } from 'react';
import { Box, VStack, Heading, Text, Divider, Flex } from '@chakra-ui/react';
import localFont from 'next/font/local'



import { Cinzel } from 'next/font/google'
import { Old_Standard_TT } from 'next/font/google'

const cinzel = Cinzel({ subsets: ['latin'] })
const old = Old_Standard_TT({ subsets: ['latin'], weight: "400" })

import Image from 'next/image';
import { ddin } from '@/components/ddin';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startY, setStartY] = useState(0);
  const numberOfSlides = 7;

  const handleWheel = (e) => {
    if (isScrolling) return; // Ignore if already scrolling
    setIsScrolling(true);

    if (e.deltaY > 0) {
      setCurrentSlide(prev => (prev < numberOfSlides - 1 ? prev + 1 : prev));
    } else {
      setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
    }

    setTimeout(() => setIsScrolling(false), 1000); // Adjust timeout for scroll sensitivity
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isScrolling) return; // Ignore if already handling a swipe
    const endY = e.touches[0].clientY;
    if (startY > endY + 5) { // Swipe up
      setIsScrolling(true);
      setCurrentSlide(prev => (prev < numberOfSlides - 1 ? prev + 1 : prev));
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (startY < endY - 5) { // Swipe down
      setIsScrolling(true);
      setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    const debouncedHandleWheel = e => {
      e.preventDefault();
      handleWheel(e);
    };

    window.addEventListener('wheel', debouncedHandleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', debouncedHandleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrolling, startY]);

  useEffect(() => {
    window.scrollTo(0, currentSlide * window.innerHeight);
  }, [currentSlide]);

  return (
    <Box position="relative" w="100vw" h={`${100 * numberOfSlides}vh`}>
      <Slide justifyContent="space-between" background="url(/pillars.jpeg) #000000bf">
        <Heading color="white" fontFamily={cinzel.style.fontFamily} fontSize={70} fontWeight={300}>
          You have something<br />
          that belongs in,<br />
          <b>The Museum</b>
        </Heading>
        <Heading color="white" as="h2" fontWeight={100} fontFamily={cinzel.style.fontFamily} fontStyle='italic'>
          A piece of history probably in your wallet.
        </Heading>
      </Slide>
      <Slide justifyContent="space-between">
        <Flex direction='row' h="100%" justifyContent='space-between' alignItems='center'>
          <Flex direction='column' w="40%" justifyContent='flex-start' h="100%">
            <Heading fontSize="20px" color="white" fontFamily={cinzel.style.fontFamily} fontWeight={100} h="100%" pt='100px'>
              This is an Egyptian Cylinder, an identifier in the 3400 BC.
            </Heading>
          </Flex>
          <Flex direction='column' w="40%" alignItems='center' justifyContent='space-around' h="100%">
            <Image src="/cuneiform.png" height={300} width={300} alt="cuneiform" />
            <Image src="/cylinder_seal.jpg" height={300} width={300} alt="cylinder_seal" />
          </Flex>
          <Flex direction='column' w="40%" justifyContent='flex-end' h="100%">
            <Heading fontSize="20px" color="white" fontFamily={cinzel.style.fontFamily} fontWeight={100} pb='70px'>
              This is a Sumerian Clay Tablet used for identification in 1711 BC.
            </Heading>
          </Flex>
        </Flex>
      </Slide>
      <Slide justifyContent="space-between" alignItems="center">
        <Flex direction="column">
          <Heading color="white" fontSize="45px" fontFamily={ddin.style.fontFamily} fontWeight={500}>
            This is Your Identity
          </Heading>
          <Divider orientation='horizontal' borderWidth='2px' borderColor='white' w="400px" my={3} />
          <Heading color="white" fontFamily={ddin.style.fontFamily} fontSize="20px">
            Not Much has changed, maybe the language.
          </Heading>
        </Flex>
        <Image src="/pan.webp" height={400} width={400} alt="pan" />
      </Slide>
      <Slide justifyContent="space-between" background="url(/city.jpeg) #000000bf" alignItems='center'>
        <Heading color="white" fontSize="30px" fontFamily={old.style.fontFamily}>Are you just these basic nouns on a plastic card?</Heading>
        <Heading color="white" fontSize="50px" fontFamily={cinzel.style.fontFamily} textAlign='end'>
          In the Globalized<br />
          Digitalized<br />
          21<sup>st</sup> Century.
        </Heading>
        <Heading color="white" fontSize="30px" fontFamily={old.style.fontFamily}>You will soon be more than that.</Heading>
      </Slide>
      <Slide justifyContent="space-between" alignItems='center'>
        <Heading color="white" fontSize="40px" fontFamily={cinzel.style.fontFamily}>If we could, <br />we would rather not talk<br /> but the ID for 21<sup>st</sup> Century is a<br /> couple of decades late <br />& under construction.</Heading>
        <Heading color="white" fontSize="40px" fontFamily={cinzel.style.fontFamily}>So, <br />here is the boring way to demonstrate.</Heading>
      </Slide>
      <Slide justifyContent="space-between">
        <Heading color="white" fontSize="50px">The Identity of today needs to solve todays problems:-</Heading>
        <Flex direction='column'>
          <Heading as="h2" fontSize='20px'>Universal Trust: <p>Put a man on the Internet</p></Heading>
          <Heading as="h2" fontSize='20px'>Universal ID: <p>Humans, Limitless mode.</p></Heading>
          <Heading as="h2" fontSize='20px'>Universal Showcase: <p>O<i>w</i>nline</p></Heading>
          <Heading as="h2" fontSize='20px'>Universal Connect: <p>Don't Stop Dreaming.</p></Heading>
        </Flex>
      </Slide>
      <Slide justifyContent="space-between">
        <Heading color="white" fontSize="50px">If this seems interesting to you, Find us here.</Heading>
      </Slide>
    </Box >
  );
};


const Slide = ({ children, background, justifyContent, alignItems }: { children: React.ReactNode, background?: string, justifyContent?: string, alignItems?: string }) => {
  return (
    <VStack
      h="100vh"
      w="100vw"
      justifyContent={justifyContent || "flex-start"}
      alignItems={alignItems || "baseline"}
      background={background || "black"}
      backgroundSize="cover"
      backgroundBlendMode='darken'
      padding={{ base: '20px', md: '200px' }}
    >
      {children}
    </VStack>
  )
}

export default App;