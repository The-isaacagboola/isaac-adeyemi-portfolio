"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Zap,
  Users,
  ChevronDown,
  Star,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import emailjs from "emailjs-com";
import Link from "next/link";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Portfolio() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const titles = [
    "Frontend Developer",
    "UI Engineer",
    "React Specialist",
    "Performance Optimizer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "TripTailor",
      subtitle:
        "Soon to launch Trip Creation, Group Travel & Real-Time Messaging App",
      description:
        "A comprehensive travel planning platform with real-time collaboration features, allowing groups to plan trips together with live chat, itinerary sharing, and expense tracking.",
      image: "/images/triptailor-hero.png",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "WebSocket",
        "Pusher",
        "Tailwind",
        "Node.js",
      ],
      github: "https://github.com/The-isaacagboola/trips-app",
      live: "https://triptailor.co",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "MatchMe - A FullStack Dating App Project",
      subtitle: "Fullstack Dating App Personal Project",
      description:
        "A modern dating platform built with Next.js, offering intelligent matchmaking, user profiles, real-time messaging, and swipe-based interactions. Designed to connect people based on preferences, location, and compatibility",
      image: "/images/dating-app.jpg",
      tech: [
        "React",
        "TypeScript",
        "Monaco Editor",
        "Node.js",
        "Pusher",
        "WebSocket",
        "Express",
      ],
      github: "https://github.com/The-isaacagboola/fullstack-dating-app",
      live: "https://match-me-eta.vercel.app/",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "ReactJS VS Code Clone",
      subtitle: "In Progress: Open-source Developer Productivity Tool",
      description:
        "An in-browser code editor inspired by Visual Studio Code, built with React and TypeScript. It features tabbed editing, file navigation, syntax highlighting, and theme switching. Designed to boost developer productivity with a lightweight, accessible environment for writing and testing code directly in the browser.",
      image: "/images/vscode-clone.png",
      tech: [
        "React",
        "TypeScript",
        "Tailwind",
        "Monaco Editor",
        "Vite",
        "zustand",
        "Prism.js",
      ],
      github: "https://github.com/The-isaacagboola/vscode-react-clone",
      live: "https://vscode-react-clone.vercel.app",
      color: "from-sky-600 to-indigo-700",
    },
  ];

  const skills = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Next.js", icon: "▲", category: "Framework" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "Redux", icon: "🔄", category: "State" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Express", icon: "🚀", category: "Backend" },
    { name: "Vite", icon: "⚡", category: "Build Tool" },
    { name: "Framer Motion", icon: "🎭", category: "Animation" },
    { name: "Git", icon: "📝", category: "Version Control" },
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_kockioc", // replace with your actual service ID
        "template_qr96z0i", // replace with your actual template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "FpQocKZZbRlE8tiLa" // replace with your actual public key
      );

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            Message Sent!
          </h2>
          <p className="text-gray-600">
            Thanks for reaching out! We&apos;ll get back to you in less than 24
            hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ y, opacity }}
      >
        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-gray-400 text-sm">Kaduna, Nigeria</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-gray-100 via-orange-200 to-emerald-200 bg-clip-text text-transparent">
              Isaac Adeyemi
            </h1>
          </motion.div>

          <motion.div
            className="h-16 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-light text-gray-300"
              >
                {titles[currentTitle]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting beautiful and performant web experiences with modern
            technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-black px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-orange-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 px-4 relative bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full blur-lg opacity-40 scale-110"></div>
                <img
                  src="/main.webp"
                  alt="Isaac Adeyemi"
                  className="relative w-64 h-64 rounded-full object-cover border-4 border-gray-700 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent"></div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate frontend developer with expertise in React
                ecosystem and modern web technologies. I specialize in creating
                clean, responsive user interfaces with a focus on performance
                optimization and component reusability.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Code className="w-6 h-6 text-orange-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      Clean Code Advocate
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Writing maintainable, scalable solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      Performance Focused
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Optimizing for speed and user experience
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      Team Player
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Mentoring and collaborating effectively
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                <h3 className="text-xl font-semibold mb-6 text-gray-100">
                  Tech Stack
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700/30"
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <div>
                        <div className="font-medium text-sm text-gray-100">
                          {skill.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {skill.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work, demonstrating expertise in modern
              web development
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 overflow-hidden h-full shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-gray-600/50">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    />
                  </div>
                  <CardContent className="p-6 bg-gradient-to-t from-gray-900/90 to-transparent h-full">
                    <h3 className="text-2xl font-bold mb-2 text-gray-100">
                      {project.title}
                    </h3>
                    <p className="text-orange-300 text-sm mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-xs border border-gray-700/50 hover:border-orange-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link href={project.github}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100 bg-transparent"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </Link>
                      <Link href={project.live}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 px-4 relative bg-gradient-to-b from-black to-gray-900">
        {/* Add subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,146,60,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.05),transparent_50%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </motion.div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-100">
              Tech Stack
            </h3>

            {/* Frontend Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-orange-300 mb-3 uppercase tracking-wider">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) =>
                    ["Frontend", "Framework", "Styling", "Animation"].includes(
                      skill.category
                    )
                  )
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300"
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-100">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-emerald-300 mb-3 uppercase tracking-wider">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === "Backend")
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300"
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-100">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div>
              <h4 className="text-sm font-medium text-blue-300 mb-3 uppercase tracking-wider">
                Tools & Others
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) =>
                    [
                      "Build Tool",
                      "State",
                      "Language",
                      "Version Control",
                    ].includes(skill.category)
                  )
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300"
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-100">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              What People Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Oluwatobi Bamidele",
                role: "Co-Founder & CTO",
                company: "Mavapay",
                content:
                  "Working with Isaac is a pleasure. He not only delivers high-quality code but also has an excellent relationship with the team",
                rating: 5,
              },
              {
                name: "Mobolaji Oginni",
                role: "Engineering Lead",
                company: "Tobams Group",
                content:
                  "Isaac delivered exceptional work on our React application. His attention to detail and performance optimization skills are outstanding.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-2xl">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-orange-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-100">
                        {testimonial.name}
                      </div>
                      <div className="text-orange-300 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 relative bg-gradient-to-b from-black to-gray-900"
      >
        {/* Add subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.05),transparent_50%)]"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next
              project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Name
                      </label>
                      <Input
                        className="bg-gray-800/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm"
                        placeholder="Your name"
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-gray-100 placeholder-gray-400 min-h-[120px] focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="flex justify-center items-center gap-2 text-gray-200">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <span>isaacadeyemi9@gmail.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                Isaac Adeyemi
              </h3>
              <p className="text-gray-400">
                Frontend Developer • Kaduna, Nigeria
              </p>
            </div>

            <div className="flex gap-6">
              <motion.a
                href="https://github.com/The-isaacagboola"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/isaac-adeyemi-4308a1259/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:isaacadeyemi9@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Isaac Adeyemi. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
