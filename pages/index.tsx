import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Box, VStack, Heading, Text, Button, Flex, useDisclosure, Textarea, Input } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link'
import subject from '../public/subject.png'
import { OmnidIcon } from '@/components/Icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emailButtonText, setEmailButtonText] = useState('Send');
  const emailText = useRef<HTMLTextAreaElement | null>(null);
  const emailEmail = useRef<HTMLInputElement | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  const post = async () => {
    setSending(true);
    const value = emailText.current?.value;
    const email = emailEmail.current?.value;
    if (value && email) {
      let res = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({
          text: value.trim(),
          userEmail: email.trim()
        })
      });
      let resp = await res.json();
      console.log(resp);

      if (resp['success'] == true) {
        setEmailButtonText('Sent!');
      }

      setSending(false);
    }
    else {
      setSending(false);
    }
  }

  return (
    <Flex w="100%" justifyContent='center' alignItems='center' >
      <Flex w={{ base: '90%', md: '70%', lg: '60%' }} direction='column' justifyContent='center' alignItems='center' >

        <Flex justifyContent='center' alignItems='center' direction='column'
          mt={{ base: '5vw', md: '30px' }}
        >
          <Flex
            style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '-40px' }}
            w={{ base: '50%', md: '60%', lg: '70%' }}
            maxWidth='400px'
            zIndex={0}
            filter="brightness(0.4)"
          >
            <Image src={subject} style={{
              width: '100%',
              height: 'auto',
            }} alt="subject" />
          </Flex>
          <Flex mt="40px" direction='column' alignItems='center'>
            <OmnidIcon boxSize={24} zIndex={2} />
            <Heading
              mt="20px"
              fontSize='xxx-large'
              fontWeight={100}
              letterSpacing='5px'
              zIndex={2}
            >
              OMNID
            </Heading>
          </Flex>
        </Flex>

        <Flex marginTop={{ base: '30vw', md: '350px' }}> </Flex>

        <Text mt={4} lineHeight='30px'>The biggest limitation of being human is that we are born clueless. As toddlers, we put filth in our mouths unless stopped. We depend on those who surround us to learn about the world. We are born into a family, a religion, a region, none of which we choose. Our dreams and aspirations are shaped by our reality; can we then dream what we haven't seen?</Text>
        <Text mt={4} lineHeight='30px'>We can't, just as we can't talk in a language we haven't heard; we can't dream of things we haven't known.<br />However, we can see more, learn more, hear more, and know more because of the internet. Ten percent of the most successful companies today were started by those who came from humble backgrounds, which would not have been possible a hundred years ago. The more we connect, the more we know, and the more opportunities we create.</Text>
        <Text mt={4} lineHeight='30px'>We, the people behind this project, come from where dreams were supposed to be forgotten at the ring of the alarm. We are the living proof of how the internet can not only help you see bigger dreams but also turn them into reality.</Text>
        <Text mt={4} lineHeight='30px'>Our goal with Project Omnid is to create an identity that makes the impact of the internet more profound and quantifiable. The problems we face as humankind are global, and so should their solutions be. Global collaboration and coordination are the needs of the hour; we are building the infrastructure to make that happen.</Text>



        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reach out to us</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input ref={emailEmail} placeholder='Your Email' type="email" />
              <br />
              <br />
              <Textarea noOfLines={20} ref={emailText} height={200} />
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' loadingText="Sending" isLoading={sending} onClick={post}>{emailButtonText}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex direction='row' justifyContent='space-between' mt="100px" w="100%">
          <Flex><Link href="https://x.com/ProjectOmnid" target="_blank" style={{ textDecoration: 'underline' }}>Follow</Link></Flex>
          <Flex><Text onClick={onOpen} cursor='pointer'>Reach out to us</Text></Flex>
          <Flex>
            <Link href="https://manvi.eth.limo" target="_blank" style={{ textDecoration: 'underline' }}>Read</Link>
          </Flex>
        </Flex>

        <Flex direction='row' justifyContent='center' mt="100px" w="100%">
          <Text>Join Waitlist for Beta</Text>
        </Flex>

        <Flex marginTop='300px'> </Flex>
      </Flex>
    </Flex >
  );
};

export default App;
