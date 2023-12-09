import React from "react";
import WithSubnavigation from "../../components/navBar/main";
import CourseCard from "../../components/card/main";
import { SimpleGrid } from "@chakra-ui/react";



export function CoursesPage() {

  return(
    <>
    <WithSubnavigation></WithSubnavigation>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
    <CourseCard label="CSCI-4100" title="Machine Learning from Data" description="Introduction to the theory, algorithms, and applications of machine learning (supervised, reinforcement, and unsupervised) from data: What is learning? Is learning feasible? How can we do it? How can we do it well? The course offers a mix of theory, technique, and application with additional selected topics chosen from Pattern Recognition, Decision Trees, Neural Networks, RBF’s, Bayesian Learning, PAC Learning, Support Vector Machines, Gaussian processes, and Hidden Markov Models."></CourseCard>
    <CourseCard label="CSCI-2100" title="FOCS" description="Programming concepts: functions, parameter passing, pointers, arrays, strings, structs, classes, templates. Mathematical tools: sets, functions, and relations, order notation, complexity of algorithms, proof by induction. Data structures and their representations: data abstraction and internal representation, sequences, trees, binary search trees, associative structures. Algorithms: searching and sorting, generic algorithms, iterative and recursive algorithms. Methods of testing correctness and measuring performance."></CourseCard>
    <CourseCard label="CSCI-4600" title="Data Analytics" description="The world at-large is confronted with increasingly larger and complex sets of structured/unstructured information; from cyber and human sources. Traditional enterprises are moving toward analytics-driven approaches for core business functions. Data and information analytics extends analysis (descriptive models of data) by using data mining and machine learning methods, with optimization and validation, to recommend action or guide and communicate decision-making. Thus, analytics is an entire methodology rather than individual analyses or analysis steps."></CourseCard>
    {/* <CourseCard></CourseCard> */}
    </SimpleGrid>
    </>
  )
}

export default CoursesPage;