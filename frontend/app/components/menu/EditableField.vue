<script setup lang="ts">
const props = defineProps<{
  inputValue: string;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const editValue = ref<boolean>(false);

const toggleEdit = () => {
  editValue.value = !editValue.value;
};

const handleChange = async () => {
  try {
    editValue.value = false;
    emit("update");
  } catch (error: any) {
    console.log(error);
  }
};
</script>
<template>
  <div class="flex items-center gap-2">
    <p>{{ props.inputValue }}</p>
    <button>E</button>
  </div>
</template>
