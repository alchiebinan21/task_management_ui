<template>
  <div class="flex flex-col gap-12 max-w-3xl mx-auto" :class="textColor">
    <section id="about-me" class="scroll-mt-8 space-y-4">
      <h1 class="text-center text-2xl font-bold">About Me</h1>
      <p class="text-base leading-relaxed">
        Hi, I'm Alchie, a full-stack web developer passionate about building modern web applications,
        exploring artificial intelligence, and creating tools that make technology more accessible and useful.
      </p>
      <p class="text-base leading-relaxed">
        With years of experience in web development, I enjoy working with backend systems, APIs, databases,
        cloud infrastructure, and modern frontend frameworks. I am always looking for ways to combine software
        engineering with emerging AI technologies to create smarter and more intuitive user experiences.
      </p>
    </section>

    <section id="about-website" class="scroll-mt-8 space-y-4">
      <h2 class="text-center text-2xl font-bold">About This Website</h2>
      <p class="text-base leading-relaxed">
        I created this website to showcase my work and share my knowledge with the world. This project is both
        a personal playground and a learning platform where I can experiment with new technologies, particularly
        AI, while applying my web development skills.
      </p>
      <p class="text-base leading-relaxed">
        The website serves as a demonstration of how modern web applications and AI systems can work together
        to create more natural and interactive user experiences.
      </p>
    </section>

    <section id="idea" class="scroll-mt-8 space-y-6">
      <h2 class="text-center text-2xl font-bold">My Idea</h2>

      <div class="space-y-3">
        <h3 class="text-lg font-bold">AI Agent</h3>
        <p class="text-base leading-relaxed">
          One of the main ideas behind this website is an AI Agent that allows users to manage and interact
          with data simply by chatting with it.
        </p>
        <p class="text-base leading-relaxed">
          Instead of navigating through multiple menus, forms, and dashboards, users can communicate with the
          system using natural language and let the AI handle the actions behind the scenes.
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-bold">Model Context Protocol (MCP)</h3>
        <p class="text-base leading-relaxed">
          To make this possible, I implemented the Model Context Protocol (MCP), which allows the AI Agent
          to communicate with backend services, databases, and API endpoints securely and efficiently.
        </p>
        <p class="text-base leading-relaxed">
          This enables the AI to perform real actions rather than simply answering questions.
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-bold">The Goal</h3>
        <p class="text-base leading-relaxed">
          My long-term goal is to create an AI-powered website where users can interact with the entire
          platform through conversation.
        </p>
        <p class="text-base leading-relaxed">The AI Agent should be able to:</p>
        <ul class="list-disc list-inside space-y-1 text-base leading-relaxed">
          <li>Navigate the website on behalf of the user</li>
          <li>Change layouts and interface preferences</li>
          <li>Access and manage data</li>
          <li>Execute actions through backend APIs</li>
          <li>Provide a more natural and personalized user experience</li>
        </ul>
        <p class="text-base leading-relaxed">
          Ultimately, I want the website itself to become an intelligent assistant rather than just a
          collection of pages and forms.
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold">Commands Available</h3>
        <p class="text-base leading-relaxed">The AI Agent can perform actions such as:</p>

        <div class="space-y-2">
          <h4 class="font-semibold">Navigation</h4>
          <ul class="list-disc list-inside space-y-1 text-base leading-relaxed">
            <li>Go to the About Me page</li>
            <li>Open the Technology Stack page</li>
            <li>Navigate between different sections of the website</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">Interface Controls</h4>
          <ul class="list-disc list-inside space-y-1 text-base leading-relaxed">
            <li>Switch between Dark Mode and Light Mode</li>
            <li>Modify layout preferences</li>
            <li>Personalize the user experience</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">Data Management</h4>
          <ul class="list-disc list-inside space-y-1 text-base leading-relaxed">
            <li>Add new tasks</li>
            <li>Edit existing tasks</li>
            <li>Delete tasks</li>
            <li>Retrieve and display stored data</li>
          </ul>
        </div>
      </div>
    </section>

    <p class="text-base leading-relaxed text-center text-slate-600 dark:text-slate-400">
      This project is continuously evolving as I explore new possibilities with AI, automation, and modern
      web technologies.
    </p>
    <p class="text-base leading-relaxed text-center font-medium">
      Thank you for visiting and following my journey.
    </p>
  </div>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()
</script>
