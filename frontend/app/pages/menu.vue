<script setup lang="ts"></script>

<template>
  <div
    class="w-full min-h-screen flex flex-col items-center gap-8 bg-neutral-50"
  >
    <button
      class="py-1 px-2 rounded-md text-gray-900 border bg-white border-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
    >
      + Add new menu
    </button>

    <Tabs
      value="0"
      class="flex flex-col w-full max-w-4xl p-6 rounded-md border border-gray-300"
    >
      <TabList>
        <Tab value="0">All</Tab>
        <Tab value="1">Beer</Tab>
        <Tab value="2">Wine</Tab>
        <Tab value="3">Drinks</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p>Hello</p>
        </TabPanel>
        <TabPanel value="1">
          <p>Hi</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
