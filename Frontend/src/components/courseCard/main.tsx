import React from "react";
import './main.css';
import { Box, Flex, Link, chakra } from "@chakra-ui/react";

import { AiOutlineLink } from "react-icons/ai";



export function CourseCard({courseName, courseDescription, courseCode , courseLink} : {courseName: string , courseDescription: string , courseCode: string , courseLink: string}) { 
    return (
        <Flex
          bg="#edf3f8"
          _dark={{ bg: "#3e3e3e" }}
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w="full"
            maxW="sm"
            mx="auto"
            px={4}
            py={3}
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="md"
            rounded="md"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span
                fontSize="sm"
                color="gray.800"
                _dark={{ color: "gray.400" }}
              >
                RPI 2023
              </chakra.span>
              <chakra.span
                color="brand.800"
                _dark={{ color: "brand.900" }}
                px={3}
                py={1}
                rounded="full"
                textTransform="uppercase"
                fontSize="xs"
              >
                {courseName}
              </chakra.span>
            </Flex>
    
            <Box>
              <chakra.h1
                fontSize="lg"
                fontWeight="bold"
                mt={2}
                color="gray.800"
                _dark={{ color: "white" }}
              >
                {courseName}-{courseCode}
              </chakra.h1>
              <chakra.p
                fontSize="sm"
                mt={2}
                color="gray.600"
                _dark={{ color: "gray.300" }}
              >
                {courseDescription}
              </chakra.p>
            </Box>
    
            <Box>
              <Flex
                alignItems="center"
                mt={2}
                color="gray.700"
                _dark={{ color: "gray.200" }}
              >
                <span> {courseLink} </span>
                
              </Flex>
    
              <Flex alignItems="center" justifyContent="center" mt={4}>    
                <Link
                  mr={2}
                  color="gray.800"
                  _dark={{ color: "gray.400" }}
                  _hover={{ color: "gray.700", _dark: { color: "gray.300" } }}
                  cursor="pointer"
                >
                  <AiOutlineLink />
                </Link>
              </Flex>
            </Box>
          </Box>
        </Flex>
      );

}